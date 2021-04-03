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
        address applicant;
        string name;
        bool isRegistered;
    }
    mapping(address => Applicant) addressToApplicant;
    
    struct Project {
        address owner;
        address project;
        string name;
    }
    mapping(address => Project) addressToProject;
    
    struct Grant {
        address grantor;
        uint256 id;
        string name;
        uint256 amountAvailable;
        GrantStatus status;
    }
    uint256 grantCounter;

    Grant[] grants;
    
    struct Grantor {
        address grantor;
        string name;
        bool isRegistered;
    }
    mapping(address => Grantor) addressToGrantor;
    
    struct GrantRequest {
        uint256 id;
        address payable project;
        uint256 grantId;
        uint256 amountInUsd;
        RequestStatus status;
    }
    uint256 requestCounter;
    GrantRequest[] requests;
    
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
  
    function registerAsApplicant(string memory _name) public {
        require(!addressToApplicant[msg.sender].isRegistered, "You already registered as an applicant");
        
        Applicant memory newApplicant = Applicant({
            applicant: msg.sender,
            name: _name,
            isRegistered: true
        });
        addressToApplicant[newApplicant.applicant] = newApplicant;
    }
    
    function registerAsGrantor(string memory _name) public {
        require(!addressToGrantor[msg.sender].isRegistered, "You already registered as a grantor");
        
        Grantor memory newGrantor = Grantor({
            grantor: msg.sender,
            name: _name,
            isRegistered: true
        });
        addressToGrantor[newGrantor.grantor] = newGrantor;
    }
    
    function createGrant(string memory _name, uint256 _amountInUsd) public payable {
        require(msg.value >= usdToWei(_amountInUsd), "Value does not match");
        require(addressToGrantor[msg.sender].isRegistered, "You have not registered as a grantor");
        
        Grant memory newGrant = Grant({
            grantor: msg.sender,
            id: grantCounter,
            name: _name,
            amountAvailable: msg.value,
            status: GrantStatus.Open
        });
        grantCounter+=1;
        grants.push(newGrant);
    }
    
    function createProject(address payable _project, string memory _name) public {
        require(addressToApplicant[msg.sender].isRegistered, "You have not registered as an applicant");
        
        Project memory newProject = Project({
            owner: msg.sender,
            project: _project,
            name: _name
        });
        addressToProject[_project] = newProject;
    }
    
    function requestGrant(address payable _project, uint256 _grantId, uint256 _amountInUsd) public {
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
        }else {
            request.status = RequestStatus.Denied;
        }
    }
    
    function closeGrant(uint256 _grantId) isGrantOwner(_grantId) public {
        Grant storage grant = grants[_grantId];
        grant.status = GrantStatus.Closed;
    }
    
    /**
     * Returns the latest price
     */
    function getUsdPerEth() public view returns (uint256) {
        (
            uint80 roundID, 
            int price,
            uint startedAt,
            uint timeStamp,
            uint80 answeredInRound
        ) = priceFeed.latestRoundData();
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