const express = require("express");
const Web3 = require("web3");
const MyContract = require("/MyContract.json");
const contractABI = MyContract.abi;
const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const rpcEndpoint = "http://127.0.0.1:8545";

const app = express();
const web3 = new Web3(new Web3.provoders.HttpProvider(rpcEndpoint));

const contract = new web3.eth.Contract(contractABI, contractAddress);

app.use(express.json());

app.get("/number", async (req, res) => {
    const number = await contract.methods.getNumber().call();
    res.json({ number });
})

app.post("/number", async (req, res) => {
    const { number } = req.body;
    const accounts = await web3.eth.getAccounts();
    const result = await contract.methods
      .sendNumber(number)
      .send({ from: accounts[0]});
    res.json({ message: "number set successfully"});
})

app.listen(3000, () => {
    console.log("Server listening Successfully on port 3000")
});
