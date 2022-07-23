const Marketplace = artifacts.require("Marketplace");
const Chat = artifacts.require("Chat");
const TestC = artifacts.require("TestC");

module.exports = function(deployer) {
  // deployer.deploy(Marketplace);
  deployer.deploy(Chat);
  deployer.deploy(TestC);
};
