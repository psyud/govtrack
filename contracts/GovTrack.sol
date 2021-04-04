// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

import "@chainlink/contracts/src/v0.6/interfaces/AggregatorV3Interface.sol";

contract GovTrack {
    AggregatorV3Interface internal priceFeed;
    uint256 priceFeedPrecision = 100000000; // 1e8
    uint256 weiPrecision = 1000000000000000000; // 1e18
    
    /**
     * Network: Kovan
     * Aggregator: ETH/USD
     * Address: 0x9326BFA02ADD2366b30bacB125260Af641031331
     */
    constructor() {
        priceFeed = AggregatorV3Interface(0x9326BFA02ADD2366b30bacB125260Af641031331);
    }
    
    struct Applicant {
        address id;
        string name;
        string phoneNumber;
        string emailAddress;
        string physicalAddress;
        bool isRegistered;
    }
    mapping(address => Applicant) public addressToApplicant;
    event NewApplicant(address id, string name);
    
    struct Project {
        address id;
        address owner;
        string name;
        string description;
        bool isRegistered;
    }
    mapping(address => Project) public addressToProject;
    event NewProject(address id, address owner, string name);
    
    struct Grantor {
        address id;
        string agencyName;
        string agencyCode;
        bool isRegistered;
    }
    mapping(address => Grantor) public addressToGrantor;
    event NewGrantor(address id, string name);
    
    struct Grant {
        uint256 id;
        address grantor;
        string name;
        string description;
        uint256 amountAvailable;
        GrantStatus status;
        bool isRegistered;
    }
    uint256 grantCounter;
    Grant[] grants;
    event NewGrant(uint256 id, address grantor, string name, uint256 amountAvailable);
    event UpdateGrant(uint256 id, uint256 amountAvailable, GrantStatus status);
    
    struct GrantRequest {
        uint256 id;
        address payable project;
        uint256 grantId;
        uint256 amountInUsd;
        RequestStatus status;
    }
    uint256 requestCounter;
    GrantRequest[] public requests;
    event NewGrantRequest(uint256 id, address project, uint256 grantId, uint256 amountInUsd);
    event UpdateGrantRequest(uint256 id, RequestStatus status);
            
    
    enum RequestStatus {
        Created,
        Approved,
        Denied
    }
    
    enum GrantStatus {
        Open,
        Closed
    }

    function getAllGrants() public view returns(Grant[] memory) {
        return grants;
    }

    function registerAsApplicant(string memory _name, string memory _phoneNumber, string memory _emailAddress, string memory _physicalAddress) public {
        require(!addressToApplicant[msg.sender].isRegistered, "You already registered as an applicant");
        
        Applicant memory newApplicant = Applicant({
            id: msg.sender,
            name: _name,
            phoneNumber: _phoneNumber,
            emailAddress: _emailAddress,
            physicalAddress: _physicalAddress,
            isRegistered: true
        });
        addressToApplicant[newApplicant.id] = newApplicant;
        emit NewApplicant(newApplicant.id, newApplicant.name);
    }
    
    function registerAsGrantor(string memory _agencyName, string memory _agencyCode) public {
        require(!addressToGrantor[msg.sender].isRegistered, "You already registered as a grantor");
        
        Grantor memory newGrantor = Grantor({
            id: msg.sender,
            agencyName: _agencyName,
            agencyCode: _agencyCode,
            isRegistered: true
        });
        addressToGrantor[newGrantor.id] = newGrantor;
        emit NewGrantor(newGrantor.id, newGrantor.agencyName);
    }

    function createProject(address payable _project, string memory _name, string memory _description) public {
        require(addressToApplicant[msg.sender].isRegistered, "You have not registered as an applicant");
        require(!addressToProject[_project].isRegistered, "Project has been registered");

        Project memory newProject = Project({
            id: _project,
            owner: msg.sender,
            name: _name,
            description: _description,
            isRegistered: true
        });
        addressToProject[_project] = newProject;
        emit NewProject(newProject.id, newProject.owner, newProject.name);
    }

    function createGrant(string memory _name, string memory _description, uint256 _amountInUsd) public payable {
        require(addressToGrantor[msg.sender].isRegistered, "You have not registered as a grantor");
        require(msg.value >= usdToWei(_amountInUsd), "Value does not match");
        
        Grant memory newGrant = Grant({
            id: grantCounter,
            grantor: msg.sender,
            name: _name,
            description: _description,
            amountAvailable: msg.value,
            status: GrantStatus.Open,
            isRegistered: true
        });
        grantCounter+=1;
        grants.push(newGrant);
        emit NewGrant(newGrant.id, newGrant.grantor, newGrant.name, newGrant.amountAvailable);
    }
    
    function requestGrant(address payable _project, uint256 _grantId, uint256 _amountInUsd) public {
        require(grants[_grantId].isRegistered, "Grant does not exist");
        require(addressToApplicant[msg.sender].isRegistered, "You have not registered as an applicant");
        require(addressToProject[_project].owner == msg.sender, "You do not own this project");
        
        GrantRequest memory newGrantRequest = GrantRequest({
            id: requestCounter,
            project: _project,
            grantId: _grantId,
            amountInUsd: _amountInUsd,
            status: RequestStatus.Created
        });
        requestCounter += 1;
        requests.push(newGrantRequest);
        emit NewGrantRequest(newGrantRequest.id, newGrantRequest.project, newGrantRequest.grantId, newGrantRequest.amountInUsd);
    }
    
    function resolveRequest(uint256 _requestId, bool isApproved) public {
        GrantRequest storage request = requests[_requestId];
        Grant storage grant = grants[requests[_requestId].grantId];

        require(request.status == RequestStatus.Created, "You cannot resolve an already resolved request");
        require(addressToGrantor[msg.sender].isRegistered, "You have not registered as a grantor");
        require(grant.grantor == msg.sender, "You do not own this grant");
       
        if (isApproved) {
            uint256 amountInWei = usdToWei(request.amountInUsd);
             
            request.project.transfer(amountInWei);
            request.status = RequestStatus.Approved;
            
            grant.amountAvailable -= amountInWei;
            
            emit UpdateGrantRequest(request.id, request.status);
            emit UpdateGrant(grant.id, grant.amountAvailable, grant.status);
        }else {
            request.status = RequestStatus.Denied;
        }
    }
    
    function closeGrant(uint256 _grantId) isGrantOwner(_grantId) public {
        Grant storage grant = grants[_grantId];
        grant.status = GrantStatus.Closed;
        
        emit UpdateGrant(grant.id, grant.amountAvailable, grant.status);
    }
    
    function getUsdPerEth() private view returns (uint256) {
        (, int price, , , ) = priceFeed.latestRoundData();
        return uint256(price);
    }

    function usdToWei(uint256 _amountInUsd) private view returns(uint256) {
        uint256 usdPerEth = getUsdPerEth();
        
        return _amountInUsd * priceFeedPrecision * weiPrecision / usdPerEth;
    }
    
    modifier isGrantOwner(uint256 _grantId) {
        Grant storage grant = grants[_grantId];
        require(grant.grantor == msg.sender, "You do not own this grant");
        _;
    }
}