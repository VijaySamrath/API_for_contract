const ethers = require('ethers');
require('dotenv').config();
const API_URL = process.env.API_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const contractAddress = process.env.CONTRACT_ADDRESS;

const provider = new ethers.providers.JsonRpcProvider(API_URL);
const signer = new ethers.Wallet(PRIVATE_KEY, provider);
const {abi} = require("./TestToken.json");
const contractInstance = new ethers.Contract(contractAddress, abi, provider);
const contractWithSigner = contractInstance.connect(signer);

const express = require('express');
const app = express();
app.use(express.json());


app.get('/balance', async(req, res) => {   //http://localhost:3000/balance
    try {
        const {address} = req.body;
        const product = await contractInstance.balanceOf(address);
        res.send(product);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
});

app.post('/mint', async(req, res) => {
    try {
        const {address} = req.body;
        const {mintamount} = req.body;
        const tx = await contractWithSigner.mint(address, mintamount);
        await tx.wait();
        res.json({success: true})
    }
    catch (error) {
        res.status(500).send(error.message);
    }
});

const port = 3000;
app.listen(port, () => {
    console.log("API server is listening on port 3000")
})