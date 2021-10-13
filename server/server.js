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


async function showPatients(){
    const db = await dbEHR.docs(dbName)
    await db.load()
    const value = await db.get('')
    return value
}

async function queryAge(age=23){
    const db = await dbEHR.docs(dbName)
    await db.load()
    const value = await db.query((doc) => doc.age > age)
    return value
}

async function addPatient(info){
    const db = await dbEHR.docs(dbName)
    await db.load()
    await db.put({'_id': info.id, first_name:info.first_name, last_name: info.last_name, Email: info.email, age: info.age, gender: info.gender})
}

async function queryPatient(id){
    const db = await dbEHR.docs(dbName)
    await db.load()
    const result = await db.get(id)
    return result
}

async function updatePatient(info){
    const db = await dbEHR.docs(dbName)
    await db.load()
    await db.put({'_id': info._id, first_name: info.first_name, last_name: info.last_name, Email: info.Email, age: info.age, gender: info.gender})
}

async function deletePatient(id){
    const db = await dbEHR.docs(dbName)
    await db.load()
    const hash = await db.del(id)
    return hash
}


app.get('/showPatients', async (req, res)=>{
    await initOrbit()
    const result = await showPatients()
    res.json(result)
})

app.post('/queryAge', async (req, res)=>{
    const query_age = req.body.age
    console.log("request age query:", query_age)
    const result = await queryAge(query_age)
    console.log(result)
    res.json(result)
})

app.post('/addPatient', async (req, res)=>{
    console.log(`add new patient info: {req.body}`)
    await addPatient(req.body)
    res.send(req.body)
})

app.get('/helloworld', async (req, res)=>{
    console.log("helloworld test")
    res.send({message: "hello world test"})
})

// Edit patient endpoint
app.get('/users/:id', async (req, res)=>{
    const query_id = req.params.id
    const result = await queryPatient(query_id)
    console.log(result)
    res.json(result)
})

app.post('/users/:id', async (req, res)=>{
    await updatePatient(req.body)
    res.send({message: "patient update successfully."})
})

app.delete('/users/:id', async (req, res)=>{
    const hash = await deletePatient(req.params.id)
    console.log("delete hash:", hash)
    res.send({message: "patient delete successfully."})
})


const PORT=process.env.PORT || 5000;

app.listen(PORT, ()=>{
    console.log(`Server listening at http://localhost:${PORT}` )
})