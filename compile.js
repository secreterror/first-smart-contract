const path = require("path");
const fs = require("fs");

const solc = require("solc");

//we havent used require statement because node will try to compile solidity
const inboxPath = path.resolve(__dirname, "contract", "Inbox.sol");
const source = fs.readFileSync(inboxPath, "utf-8");

// this will spit out some byte code and abi
module.exports = solc.compile(source, 1).contracts[":Inbox"];
