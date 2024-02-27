const xml2js = require("xml2js")
const xmldom = require('xmldom')


var word =  ""


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
        
        //const xmlDocument = parser.parseFromString(str,"application/xml")
        //console.log(xmlDocument)
    }).catch(error=>{
        console.error(error)
    })


/*const fetchData = async()=>
  {
    console.log("I'm over here.")
    await fetch("http://localhost:5000/data")
    .then(response=>response.text())
    .then(str=>
      {
        var searchResults = []
        var parser  =new DOMParser()
        var xmlDocument = parser.parseFromString(str.replaceAll("\n",""),"application/xml")
        var htmlString = new XMLSerializer().serializeToString(xmlDocument)
        var deviceStreams = xmlDocument.getElementsByTagName("DeviceStream")
        
        for(const d of deviceStreams)
        {

          const name = d.getAttribute("name")
          const uuid = d.getAttribute("uuid")
          var components = []
          const componentStreams = d.getElementsByTagName("ComponentStream")
          for (const c of componentStreams)
          {
            const component = c.getAttribute("component")
            const id = c.getAttribute("componentId")
            const tables = omitChildNodesByTagName(c,"text")
            for(const t of tables)
            {
              var dataDictionary = {}
              const tagName = t.tagName || "none"
              if(tagName!=="none")
              {
                console.log(tagName)
                dataDictionary[tagName] = []
                var dataPoints = t.querySelectorAll("*")
                for(const dp of dataPoints)
                {
                  dataEntry = {
                    "dataItemId":dp.getAttribute("dataItemId"),
                    "timestamp":dp.getAttribute("timestamp"),
                    "name": dp.getAttribute("name"),
                    "sequence":dp.getAttribute("sequence"),
                    "subType":dp.getAttribute("subType"),
                  }
                }
                console.log(dataDictionary)
              }
            }
            const componentEntry = {
              "component":component,
              "id":id
            }
          }
        }
      })
  }
  */