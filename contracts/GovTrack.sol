// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

import "@chainlink/contracts/src/v0.6/interfaces/AggregatorV3Interface.sol";

contract GovTrack {
    AggregatorV3Interface internal priceFeed;
    uint256 priceFeedPrecision = 100000000; // 1e8
    uint256 weiPrecision = 1000000000000000000; // 1e18
    
    constructor(address oracleAddress) {
        priceFeed = AggregatorV3Interface(oracleAddress);
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
    event NewApplicant(address id, string name, string phoneNumber, string emailAddress, string physicalAddress);
    
    struct Project {
        address id;
        address owner;
        string name;
        string description;
        bool isRegistered;
    }
    mapping(address => Project) public addressToProject;
    event NewProject(address id, address owner, string name, string description);
    
    struct Grantor {
        address id;
        string agencyName;
        string agencyCode;
        bool isRegistered;
    }
    mapping(address => Grantor) public addressToGrantor;
    event NewGrantor(address id, string agencyName, string agencyCode);
    
    struct Grant {
        uint256 id;
        address grantor;
        string name;
        string description;
        uint256 amountInWei;
        uint createdAt;
        uint deadlineTimestamp;
        GrantStatus status;
        bool isRegistered;
    }
    uint256 grantCounter;
    Grant[] public grants;
    event NewGrant(uint256 id, address grantor, string name, string description, uint256 amountInWei, uint createdAt, uint deadlineTimeStamp, GrantStatus grantStatus);
    event UpdateGrant(uint256 id, GrantStatus status);
    
    struct GrantRequest {
        uint256 id;
        address payable project;
        uint256 grantId;
        RequestStatus status;
    }
    uint256 requestCounter;
    mapping(address => Grant) projectToGrant;
    GrantRequest[] public requests;

    event NewGrantRequest(uint256 id, address project, uint256 grantId, RequestStatus status);
    event UpdateGrantRequest(uint256 id, RequestStatus status);
            
    
    enum RequestStatus {
        Created,
        Approved
    }
    
    enum GrantStatus {
        Open,
        Closed
    }

    function registerAsApplicant(string memory _name, string memory _phoneNumber, string memory _emailAddress, string memory _physicalAddress) public addressNotTaken(msg.sender) {        
        Applicant memory newApplicant = Applicant({
            id: msg.sender,
            name: _name,
            phoneNumber: _phoneNumber,
            emailAddress: _emailAddress,
            physicalAddress: _physicalAddress,
            isRegistered: true
        });
        addressToApplicant[newApplicant.id] = newApplicant;
        emit NewApplicant(
            newApplicant.id, 
            newApplicant.name, 
            newApplicant.phoneNumber,
            newApplicant.emailAddress,
            newApplicant.physicalAddress);
    }
    
    function registerAsGrantor(string memory _agencyName, string memory _agencyCode) public addressNotTaken(msg.sender) {        
        Grantor memory newGrantor = Grantor({
            id: msg.sender,
            agencyName: _agencyName,
            agencyCode: _agencyCode,
            isRegistered: true
        });
        addressToGrantor[newGrantor.id] = newGrantor;
        emit NewGrantor(newGrantor.id, newGrantor.agencyName, newGrantor.agencyCode);
    }

    function createProject(address payable _project, string memory _name, string memory _description) public addressNotTaken(_project){
        Project memory newProject = Project({
            id: _project,
            owner: msg.sender,
            name: _name,
            description: _description,
            isRegistered: true
        });
        addressToProject[_project] = newProject;
        emit NewProject(newProject.id, newProject.owner, newProject.name, newProject.description);
    }

    function createGrant(string memory _name, string memory _description, uint256 _amountInUsd, uint _deadlineTimestamp) public payable {
        require(addressToGrantor[msg.sender].isRegistered, "You have not registered as a grantor");
        require(_deadlineTimestamp > block.timestamp, "Closing date must be in the future");
        require(msg.value >= usdToWei(_amountInUsd), "Value does not match");
        
        Grant memory newGrant = Grant({
            id: grantCounter,
            grantor: msg.sender,
            name: _name,
            description: _description,
            amountInWei: msg.value,
            createdAt: block.timestamp,
            deadlineTimestamp: _deadlineTimestamp,
            status: GrantStatus.Open,
            isRegistered: true
        });
        grantCounter+=1;
        grants.push(newGrant);
        emit NewGrant(
            newGrant.id, 
            newGrant.grantor, 
            newGrant.name, 
            newGrant.description,
            newGrant.amountInWei,
            newGrant.createdAt,
            newGrant.deadlineTimestamp,
            newGrant.status);
    }
    
    function requestGrant(address payable _project, uint256 _grantId) public {
        require(grants[_grantId].isRegistered, "Grant does not exist");
        require(block.timestamp < grants[_grantId].deadlineTimestamp, "Grant has expired");
        require(addressToApplicant[msg.sender].isRegistered, "You have not registered as an applicant");
        require(addressToProject[_project].owner == msg.sender, "You do not own this project");

        // Kind of a hack. To make sure a project can register for one grant only
        // When it's not registered to any, the Grant in the mapping will have all values at default
        require(projectToGrant[_project].isRegistered == false, "Project is not available for grant");
        
        GrantRequest memory newGrantRequest = GrantRequest({
            id: requestCounter,
            project: _project,
            grantId: _grantId,
            status: RequestStatus.Created
        });
        requestCounter += 1;
        requests.push(newGrantRequest);
        projectToGrant[newGrantRequest.project] = grants[newGrantRequest.grantId];

        emit NewGrantRequest(newGrantRequest.id, newGrantRequest.project, newGrantRequest.grantId, newGrantRequest.status);
    }
    
    function approveRequest(uint256 _requestId) public {
        GrantRequest storage request = requests[_requestId];
        Grant storage grant = grants[requests[_requestId].grantId];

        require(request.status == RequestStatus.Created, "You cannot resolve an already resolved request");
        require(addressToGrantor[msg.sender].isRegistered, "You have not registered as a grantor");
        require(grant.grantor == msg.sender, "You do not own this grant");
        
        // Generally we don't approve a project when not everybody has applied
        // Uncomment this rule when deploying to production
        // require(grant.deadlineTimestamp < block.timestamp, "Grant has not reached deadline");
         
        request.project.transfer(grant.amountInWei);
        request.status = RequestStatus.Approved;
        grant.status = GrantStatus.Closed;
        
        emit UpdateGrantRequest(request.id, request.status);
        emit UpdateGrant(grant.id, grant.status);
    }
    
    function getUsdPerEth() public view returns (uint256) {
        (, int price, , , ) = priceFeed.latestRoundData();
        return uint256(price);
    }

    function usdToWei(uint256 _amountInUsd) public view returns(uint256) {
        uint256 usdPerEth = getUsdPerEth();
        
        return _amountInUsd * priceFeedPrecision * weiPrecision / usdPerEth;
    }
    
    modifier isGrantOwner(uint256 _grantId) {
        Grant storage grant = grants[_grantId];
        require(grant.grantor == msg.sender, "You do not own this grant");
        _;
    }

    modifier addressNotTaken(address _address) {
        require(!addressToApplicant[_address].isRegistered, "Address has been taken");
        require(!addressToGrantor[_address].isRegistered, "Address has been taken");
        require(!addressToProject[_address].isRegistered, "Address has been taken");
        _;
    }
}