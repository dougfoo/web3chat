pragma solidity ^0.5.0;

contract Chat {
    string public message;
    uint public messageCount = 0;
    mapping(uint => Message) public messages;

    struct Message {
        uint id;
        string message;
        uint likes;
        address owner;
    }

    event MessageCreated(
        uint id,
        string message,
        uint likes
    );

    event MessageLiked(
        uint id,
        string message,
        uint likes
    );

    constructor() public {
        message = "foostack web3 Marketplace";
    }

    function createMessage(string memory _message, uint _likes) public {
        // Require a valid message
        require(bytes(_message).length > 0);
        // Require a valid likes
        require(_likes > 0);
        // Increment Message count
        messageCount ++;
        // Create the Message
        messages[messageCount] = Message(messageCount, _message, _likes, msg.sender);
        // Trigger an event
        emit MessageCreated(messageCount, _message, _likes);
    }

    function likeMessage(uint _id) public payable {
        Message memory _Message = messages[_id];
        _Message.likes++;
        messages[_id] = _Message;
        emit MessageLiked(_id, _Message.message, _Message.likes);
    }
}
