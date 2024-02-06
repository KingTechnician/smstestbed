const xml2js = require("xml2js")
const xmldom = require('xmldom')



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


        
        const xmlDocument = parser.parseFromString(str,"application/xml")
        console.log(xmlDocument)
    }).catch(error=>{
        console.error(error)
    })