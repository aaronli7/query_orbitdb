const express=require('express');
const cors=require('cors');
const IPFS = require('ipfs')
const OrbitDB = require('orbit-db')

const app = express();
app.use(express.json())
app.use(cors())

var orbitDB

// initialize the orbitdb database
async function initOrbit(){
    const ipfsOptions = { repo: './ipfs'}
    const ipfs = await IPFS.create(ipfsOptions)
    const db = await OrbitDB.createInstance(ipfs)

    orbitDB = db
}

async function orbitAdd(id,name,age){
    
    const db = await orbitDB.docs('EHR-db')
    await db.load()
    console.log(db.address.toString())
    await db.put({'_id': id, firstName: fname, lastName, lname, age: age}, (err,res) =>{
        if(err){
            res.send({err: err})
        }
        else{
            res.send({message: "Data added"})
        }
    })
}


app.get('/', (req, res)=>{
    initOrbit()
})

app.get('/helloworld', (req, res)=>{
    console.log("helloworld test")
    res.send({message: "hello world test"})
})


const PORT=process.env.PORT || 5000;

app.listen(PORT, ()=>{
    console.log(`Server listening at http://localhost:${PORT}` )
})