//SPDX-License-Identifier: MIT
pragma solidity ^0.8.15;

contract Lottery {
    //State /storage variable

    address public owner;
    address payable[] players;
    address[] public winners;

    uint public lotteryId;

    //constructor -> this runs when the contract is deployed
    constructor () {
        owner = msg.sender;
        lotteryId = 0;
    }

    //Enter function
    function enter() public payable {
        require(msg.value >= 0.1 ether);
        players.push(payable(msg.sender));
    }

    //Get players
    function getPlayers() public view returns(address payable[] memory) {
        return players;
    }

    //Get balance
    function getBalance() public view returns (uint) {
        return address(this).balance;
    }

    //Get Lottery ID
    function getLotteryId() public view returns (uint) {
        return lotteryId;
    }

    //Get random number (will help us in picking the winners )
    function getRandomNumber() public view returns (uint) {
        return uint(keccak256(abi.encodePacked(owner, block.timestamp)));
    }

    //Pick Winner!!!
    function pickWinner() public {
        require(msg.sender == owner);
        uint randomIndex = getRandomNumber() % players.length;
        players[randomIndex].transfer(address(this).balance);
        winners.push(players[randomIndex]);
        //Delete all the players list [player1, player2] -> []
        delete players;
        //Updating the contract id
        lotteryId++;

    }

     //Get Winners
     function getWinners() public view returns (address[] memory) {
         return winners;
     }
    
}