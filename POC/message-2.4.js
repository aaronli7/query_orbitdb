const IPFS = require('ipfs');
const OrbitDB = require('orbit-db');
const cors=require('cors');
const topic = 'uga/cs/node/';
var readline = require('readline');
const message = 'Message sent from ';
const pwd = './'
const defaultAddr = "/ip4/0.0.0.0/tcp/0"
var currNodeId = -1;
const ipfsConfig = {
	config: {
		Pubsub: {
			Enabled: true
		}
	}
}
var dbReq;
var ipfs;
var queryId = 0;

const addReadNodes = '/addreadnodes/:nodeId'

var express = require('express');
var app = express();
app.use(express.json())
app.use(cors())

var dataRequester;
var dataOwner;
var dataPromise;
var dbName = "verifier-db"
var result;

const receiveMsg = async (msg) => {
	var arrayOfIds = new TextDecoder().decode(msg.data);
	console.log("Message received : "+arrayOfIds);
	var arrayOfIds = arrayOfIds.split(",");
	var doId = arrayOfIds[0];
	var drId = arrayOfIds[1];
	var db = await dataPromise.docs(dbName.concat(doId));
	await db.load();

	result = await db.query((doc) => doc.nodeId == drId);

	console.log("Result : "+result);

}

async function init_orbitdb(ipfs) {
	dataPromise = await OrbitDB.createInstance(ipfs);
}

async function ipfs_init(node, portNum) {
	const file = pwd.concat(node);
	ipfs = await IPFS.create({ 
		repo: file, 
		Pubsub: true, 
		port: portNum,
		config: {
			Addresses: {
				Swarm: [defaultAddr]
			}
		}});

	dataRequester = file;

	init_orbitdb(ipfs);
}

app.post(addReadNodes, async (req, res) => {
	 var nodeIdRecv = req.params.nodeId;
	 var nodeToAdd = req.body.node;

	 if (nodeIdRecv == currNodeId) {
	 	console.log("Body received : "+req.body.node);
	 	console.log("Node Id received : "+req.params.nodeId);
	 	queryId++;
	 	var db = await dataPromise.docs(dbName.concat(currNodeId));
		await db.load();
	 	await db.put({ '_id' : queryId, 'nodeId': nodeToAdd });
	 	const topicToSub = topic.concat(nodeToAdd);

	 	await ipfs.pubsub.subscribe(topicToSub, receiveMsg);

	 	const topicSubsto = await ipfs.pubsub.ls();

	 	console.log("Peer subscribed to : "+topicSubsto);
	 }

    res.send({message: "Ok"})
})

app.post('/requestData/:drId/:doId', async (req, res) => {
	var drId = req.params.drId;
	var doId = req.params.doId;
	var dbIds = [doId, drId];

	if (drId == currNodeId) {
		const msg = new TextEncoder().encode(dbIds);
		const topicToPub = topic.concat(drId);
		console.log("Topic to publish : "+topicToPub);
		await ipfs.pubsub.publish(topicToPub, msg);
	}

	res.send({message: "Ok"})
})

app.get('/result/:nodeId', async (req, res) => {
	var nodeId = req.params.nodeId;

	if (nodeId == currNodeId) {
		if (result != 'undefined') {
			res.json(result);
			result = undefined;
		} else {
			res.json("{}");
		}
	}
})

const node = process.argv.slice(2)

currNodeId = node[0];

dbReq = ipfs_init(node[0], node[1]);

console.log("Successful");

app.listen(node[1], ()=>{
    console.log(`Server listening at http://localhost:`+node[1]);
})