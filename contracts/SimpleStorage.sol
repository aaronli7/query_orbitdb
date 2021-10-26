pragma solidity ^0.4.18;


// import "./Ownable.sol"; 

contract SimpleStorage {
    bool public status;
    address public Admin;
   
    uint public numberOfUsers;
    mapping(address => uint) public userId;
    mapping(address => mapping (address => bool)) public whitelist;
    mapping(address => address[]) public check_lists;
    mapping(address => address[]) public doctor_checklists;
    User[] public users;
 
    
    event UserAdded(address userPK, string userRole);
    event UserRemoved(address userPK);
    event DataResult(address userPK);
    event WhitelistedAddressAdded(address patient_userPK, address requester_userPK);
    event WhitelistedAddressRemoved(address patient_userPK, address requester_userPK);
    
        
    struct User{
        address userPK;
        string userRole;
    }
    
    struct EHRstorage{
        string storageName;
        string AreaID;
        string PatientID;
        string Hash_value;
    }
    
    
    mapping(bytes32 => EHRstorage) public DHTtable;
   
    
    modifier OnlyAdmin{
        require(msg.sender == Admin);
        _;
    }
    
    function SC_creation(string EHRsContract) public{
        Admin = msg.sender;
        status = true;
        addUser(0,"");
        addUser(Admin,"creator");
        
    }
    
    function addUser(address userPK, string userRole) OnlyAdmin public{
        require(status == true);
        uint id = userId[userPK];
        if(id == 0){
            userId[userPK] = users.length;
            id = users.length++;
        }
        
        users[id] =User(userPK,userRole);
        UserAdded(userPK, userRole);
        numberOfUsers++;
    }
    
    function removeUser(address userPK) OnlyAdmin public{
        require(userId[userPK]!=0);
        for (uint i = userId[userPK]; i<users.length-1;i++){
            users[i]=users[i+1];
        }
        delete users[users.length-1];
        users.length = users.length -1;
        UserRemoved(userPK);
        numberOfUsers--;
    }
    function toAsciiString(address x) public returns (string memory) {
        bytes memory s = new bytes(40);
        for (uint i = 0; i < 20; i++) {
            bytes1 b = bytes1(uint8(uint(uint160(x)) / (2**(8*(19 - i)))));
            bytes1 hi = bytes1(uint8(b) / 16);
            bytes1 lo = bytes1(uint8(b) - 16 * uint8(hi));
            s[2*i] = char(hi);
            s[2*i+1] = char(lo);            
        }
        return string(s);
   }

  function char(bytes1 b) public returns (bytes1 c) {
        if (uint8(b) < 10) return bytes1(uint8(b) + 0x30);
        else return bytes1(uint8(b) + 0x57);
  }

  function stringToBytes32(string source) public returns (bytes32 result) {
        bytes memory tempEmptyStringTest = bytes(source);
        if (tempEmptyStringTest.length == 0) {
            return 0x0;
        }

        assembly {
            result := mload(add(source, 32))
        }
    }
    
  function getkey(address userPK) public returns(bytes32) {
        return stringToBytes32(toAsciiString(userPK));
    }
    

//   string secret;  
  function store_EHRs(address userPK,string _storageName, string _AreaID, string _PatientID, string  _Hash_value) public {
    //   string _storageName, address _AreaID, address _PatientID, string _Hash_value
      
      bytes32 key = getkey(userPK);
      
      DHTtable[key].storageName = _storageName;
      DHTtable[key].AreaID = _AreaID;
      DHTtable[key].PatientID = _PatientID;
      DHTtable[key].Hash_value = _Hash_value;
  }
  
  function retrieve_EHRs(address requester_userPK, address patient_userPK) public view returns (string){
     require(msg.sender == requester_userPK);
     require(whitelist[patient_userPK][requester_userPK] == true, "you don't have access"); 
     bytes32 key = getkey(patient_userPK);
     return DHTtable[key].Hash_value;
  }
  
 function addAddressToWhitelist(address patient_userPK, address requester_userPK ) public returns(bool success) {
    require(msg.sender == patient_userPK);
    if (!whitelist[patient_userPK][requester_userPK]) {
      whitelist[patient_userPK][requester_userPK] = true;
      emit WhitelistedAddressAdded(patient_userPK, requester_userPK);
      success = true;
    }
  }
  
  function addAddressesToWhitelist(address patient_userPK, address[] requester_userPKs ) public returns(bool success) {
    require(msg.sender == patient_userPK);
     for (uint i = 0; i < requester_userPKs.length; i++) {
          if (!whitelist[patient_userPK][requester_userPKs[i]]) {
              check_lists[patient_userPK].push(requester_userPKs[i]);
              doctor_checklists[requester_userPKs[i]].push(patient_userPK);
              whitelist[patient_userPK][requester_userPKs[i]] = true;
              emit WhitelistedAddressAdded(patient_userPK, requester_userPKs[i]);
              success = true;
          }
     }
  }
  

  function removeAddressFromWhitelist(address patient_userPK, address requester_userPK)  public returns(bool success) {
    require(msg.sender == patient_userPK);
    if (whitelist[patient_userPK][requester_userPK]) {
      whitelist[patient_userPK][requester_userPK] = false;
      emit WhitelistedAddressRemoved(patient_userPK, requester_userPK);
      success = true;
    }
  }
  
  function removeAddressesFromWhitelist(address patient_userPK, address[] requester_userPKs)  public returns(bool success) {
    require(msg.sender == patient_userPK);
     for (uint i = 0; i < requester_userPKs.length; i++) {
         if (whitelist[patient_userPK][requester_userPKs[i]]) {
              for (uint j = 0; j < check_lists[patient_userPK].length; j++){
                  if(check_lists[patient_userPK][j] == requester_userPKs[i]){
                      delete check_lists[patient_userPK][j];
                  }
              }
              
              for (uint k = 0; k < doctor_checklists[requester_userPKs[i]].length; k++){
                  if(doctor_checklists[requester_userPKs[i]][k] == patient_userPK){
                      delete doctor_checklists[requester_userPKs[i]][k];
                  }
              }
            //   delete check_lists[patient_userPK][0];
            //   doctor_checklists[requester_userPKs[i]].push(patient_userPK);
              whitelist[patient_userPK][requester_userPKs[i]] = false;
              emit WhitelistedAddressRemoved(patient_userPK, requester_userPKs[i]);
              success = true;
         }
     }
  }
  
  function print_patientList(address patient_userPK) public view returns(address[]){
      require(msg.sender == patient_userPK);
      return check_lists[patient_userPK];
  }
  
   function print_requesterList(address requester_userPK) public view returns(address[]){
      require(msg.sender == requester_userPK);
      return doctor_checklists[requester_userPK];
  }


}