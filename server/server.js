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
    const ipfsOptions = { repo: './ipfs'}
    const ipfs = await IPFS.create(ipfsOptions)
    const db = await OrbitDB.createInstance(ipfs)

    // some initial data
    dbEHR = await db.docs(dbName)
    await dbEHR.load()
    console.log("db address:", dbEHR.address.toString())

    await dbEHR.put({'_id': '1', first_name:'Siffre', last_name: 'Timmes', Email: 'stimmes0@nasa.gov', age: 18, gender: 'Male'})
    await dbEHR.put({'_id': '2', first_name:'Fonzie', last_name: 'Coggen', Email: 'fcoggen1@weather.com', age: 20, gender: 'Female'})
    await dbEHR.put({'_id': '3', first_name:'Shell', last_name: 'Kos', Email: 'skos2@prweb.com', age: 22, gender: 'Female'})
    await dbEHR.put({'_id': '4', first_name:'Matthiew', last_name: 'Rasell', Email: 'mrasell3@oaic.gov.au', age: 24, gender: 'Female'})
    await dbEHR.put({'_id': '5', first_name:'Phillipe', last_name: 'Sedgwick', Email: 'psedgwick4@sciencedirect.com', age: 26, gender: 'Male'})
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


app.get('/', (req, res)=>{
    initOrbit()
})

app.get('/showPatients', (req, res)=>{
    console.log("Query the patients info")
    res.send({message: "Query hello world test"})
    const all = dbEHR.query()
    console.log(all)
})

app.get('/helloworld', (req, res)=>{
    console.log("helloworld test")
    res.send({message: "hello world test"})
})


const PORT=process.env.PORT || 5000;

app.listen(PORT, ()=>{
    console.log(`Server listening at http://localhost:${PORT}` )
})