const express = require('express');
const app = express();
const cors = require('cors');
const port = 5000;
const xmldom = require('xmldom')


const router = express.Router()

const url = "https://smstestbed.nist.gov/vds/current"


app.use(cors({
    origin:'*',
    methods:['GET',"POST"],
}));
app.get('/',(req,res)=>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.send("Hello World!")
})


app.get('/data',(req,res)=>
{
    res.setHeader('Access-Control-Allow-Origin', '*');
    const url = "https://smstestbed.nist.gov/vds/sample";

fetch(url)
.then(response =>{

    if(!response.ok)
    {
        throw new Error("Network response was not okay");
    }
    return response.text()
})
.then(str =>
    {
        var parser = new xmldom.DOMParser()

        console.log(str)
        res.send(str)
    }).catch(error=>{
        console.error(error)
    })
})


app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})