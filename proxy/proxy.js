const express = require('express');
const app = express();
const cors = require('cors');
const port = 5000;
const jsdom = require("jsdom")
const xmldom = require('xmldom')


const router = express.Router()

const baseUrl = "https://smstestbed.nist.gov/vds"


app.use(cors({
    origin:'*',
    methods:['GET',"POST"],
}));


app.get('/data',(req,res)=> //Request to get data from the smstestbed
{
    res.setHeader('Access-Control-Allow-Origin', '*');
    var {count,category} = req.query
    count = count || 10
    const url = `${baseUrl}/${category}?count=${count}`
    console.log(url)
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
            const dom = new jsdom.JSDOM(str)
            var devices = []
            parseSmsData(dom, devices);
            res.send(JSON.stringify(devices))
            //console.log(xmlDocument)
        }).catch(error=>{
            console.error(error)
        })    
})


app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})

/**
 * 
 * @param {jsdom.JSDOM} dom The dom object containing the  xml data 
 * @param {any[]} devices The array where devices will be iterated and saved from.
 * 
 * @returns {void} Variable devices will be modified in place 
 */
function parseSmsData(dom, devices) {
    const deviceStreams = dom.window.document.getElementsByTagName("DeviceStream"); //DeviceStream tags reference individual devices
    for (const d of deviceStreams) {
        const name = d.getAttribute("name");
        const uuid = d.getAttribute("uuid");
        var components = [];
        const componentStreams = d.getElementsByTagName("ComponentStream"); //ComponentStream tags reference individual componeents
        for (const c of componentStreams) {
            var dataDictionary = {};
            const component = c.getAttribute("component");
            const id = c.getAttribute("componentId");
            const tables = c.childNodes;
            for (const t of tables) {
                const tagName = t.tagName || "none"; //Some tags are actually empty lines, this will filter them out
                if (tagName !== "none") //We can assume anything in this if statement is a valid tag
                {
                    const dataPoints = t.querySelectorAll("*"); //Grab regardless of name
                    dataDictionary[tagName] = [];
                    for (const dp of dataPoints) {
                        dataEntry = {
                            "description": dp.tagName, //This gives more detail than the smstestbed site - shows the actual purpose of the data point
                            "dataItemId": dp.getAttribute("dataItemId"),
                            "timestamp": dp.getAttribute("timestamp"),
                            "name": dp.getAttribute("name"),
                            "sequence": dp.getAttribute("sequence"),
                            "subType": dp.getAttribute("subType"),
                            "value": dp.textContent
                        };
                        dataDictionary[tagName].push(dataEntry); // Add by tag name to specify type of data points

                    }
                }
            }
            const componentEntry = {
                "component": component,
                "id": id,
                "data": dataDictionary
            };
            components.push(componentEntry); // Add component to list of components
        }
        const device = {
            name: name,
            uuid: uuid,
            components: components
        };
        devices.push(device);
    }
}
