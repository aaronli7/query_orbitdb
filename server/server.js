const express=require('express');
const cors=require('cors');
const IPFS = require('ipfs')
const OrbitDB = require('orbit-db')

const app = express();
app.use(express.json())
app.use(cors())

var dbEHR
const dbName = 'EHR-db'

// initialize the orbitdb database
async function initOrbit(){
    if(dbEHR == undefined){
        const ipfsOptions = { repo: './ipfs'}
        const ipfs = await IPFS.create(ipfsOptions)
        dbEHR = await OrbitDB.createInstance(ipfs)
        // some initial data
        db = await dbEHR.docs(dbName)
        await db.load()
        console.log("db address:", db.address.toString())
    
        await db.put({'_id': '1', first_name:'Siffre', last_name: 'Timmes', Email: 'stimmes0@nasa.gov', age: 18, gender: 'Male'})
        await db.put({'_id': '2', first_name:'Fonzie', last_name: 'Coggen', Email: 'fcoggen1@weather.com', age: 20, gender: 'Female'})
        await db.put({'_id': '3', first_name:'Shell', last_name: 'Kos', Email: 'skos2@prweb.com', age: 22, gender: 'Female'})
        await db.put({'_id': '4', first_name:'Matthiew', last_name: 'Rasell', Email: 'mrasell3@oaic.gov.au', age: 24, gender: 'Female'})
        await db.put({'_id': '5', first_name:'Phillipe', last_name: 'Sedgwick', Email: 'psedgwick4@sciencedirect.com', age: 26, gender: 'Male'})
    }
    else{
        db = await dbEHR.docs(dbName)
        await db.load()
        console.log("db address:", db.address.toString())
    }
}

async function orbitAdd(id,name,age){
    
    const db = await orbitDB.docs(dbName)
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

async function showPatients(){
    const db = await dbEHR.docs(dbName)
    await db.load()
    const value = await db.get('')
    return value
}

async function queryAge(age=0){
    const db = await dbEHR.docs(dbName)
    await db.load()
    const value = await db.query((doc) => doc.age > age)
    return value
}

app.get('/', async (req, res)=>{
    initOrbit()
})

app.get('/showPatients', async (req, res)=>{
    console.log("Query the patients info")
    const result = await showPatients()
    console.log(result)
    // res.send({users:{result}})
    res.json(result)
})

app.get('/helloworld', (req, res)=>{
    console.log("helloworld test")
    res.send({message: "hello world test"})
})


const PORT=process.env.PORT || 5000;

app.listen(PORT, ()=>{
    console.log(`Server listening at http://localhost:${PORT}` )
})