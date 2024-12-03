
const express=require('express')
const dotenv=require('dotenv')
const bodyparser=require('body-parser')
const cors=require('cors')

dotenv.config();

//connection URL
const { MongoClient }=require('mongodb');

//database Name
const url='mongodb://0.0.0.0:27017/'
const client=new MongoClient(url)

const dbName='passOP';
const app=express()
const port=3000

app.use(bodyparser.json())
app.use(cors())

client.connect();

//Get all the Passwords
app.get('/', async(req,res)=>{
    const db=client.db(dbName);
    const collection=db.collection('passwords');
    const findResult=await collection.find({}).toArray();
    res.json(findResult)
})
//save a password
app.post('/', async(req,res)=>{
    const password=req.body
    const db=client.db(dbName);
    const collection=db.collection('passwords');
    const findResult=await collection.insertOne(password);
    res.send({success: true, result: findResult});
})

//delete a password
app.delete('/', async(req,res)=>{
    const password=req.body
    const db=client.db(dbName);
    const collection=db.collection('passwords');
    const findResult=await collection.deleteOne(password);
    res.send({success: true, result: findResult});
})

//edit password
const editPassword=(id)=>{
    console.log("Editing password with id ", id)
    setform(passwordArray.filter(i=>i.id===id)[0])
    setPasswordArray(passwordArray.filter(item=>item.id!==id))
}

app.listen(port, ()=>{
    console.log(`Example app listening on port http://localhost:${port}`)
})
