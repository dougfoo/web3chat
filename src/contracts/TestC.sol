pragma solidity ^0.5.0;

contract TestC {
    string public testf;
    uint public testfCount = 0;
    mapping(uint => TestF) public testfs;

    struct TestF {
        uint id;
        string testf;
    }

 
    constructor() public {
        testf = "foostack web3 Marketplace";
    }

    function createTest(string memory _testf) public {
        // Require a valid message
        testfCount ++;
        // Create the Message
        testfs[testfCount] = TestF(testfCount, _testf);
    }
}