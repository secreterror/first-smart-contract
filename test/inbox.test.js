const assert = require("assert");
const ganache = require("ganache-cli");
const Web3 = require("web3");

//recieve the spitted bytecode and abi
const { interface, bytecode } = require("../compile");

// instance of a web3 ,web3 is used to interact with blockchain
// ganache provides us some account to deploy
const web3 = new Web3(ganache.provider());

let accounts;
let inbox;
beforeEach(async () => {
  accounts = await web3.eth.getAccounts();

  inbox = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({
      data: bytecode,
    })
    .send({ from: accounts[0], gas: "1000000" });
});
describe("Inbox", () => {
  it("deploys a contract", () => {
    assert.ok(inbox.options.address);
  });
  it("can change the message", async () => {
    await inbox.methods.setMessage("bye").send({ from: accounts[0] });
    const message = await inbox.methods.message().call();

    assert.equal(message, "bye");
  });
});
