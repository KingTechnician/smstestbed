import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React, {useState} from 'react';
import {Select,Grid,Table,Pagination,Divider,TableBody,CircularProgress,TableCell,TableContainer,TableHead,TablePagination,TableRow,Accordion,AccordionSummary,AccordionDetails,FormControl,TextField,InputLabel,MenuItem,Button,AppBar,Typography,Toolbar,Paper,Box} from '@mui/material'
import {createTheme,ThemeProvider,styled} from '@mui/material/styles'
import { AntDesign } from '@expo/vector-icons';



export const themeOptions = {
  palette: {
    mode:'dark',
    type: 'dark',
    primary: {
      main: '#b73131',
    },
    secondary: {
      main: '#f50057',
    },
  },
  root:{
    "& .MuiTableCell-head":{
      color:"white",
      backgroundColor:"blue"
    }
  },
};




export default function App() {
  const [search,setSearch] = useState("") //This determines the number of results to be displayed
  const [devices,setDevices] = useState([])
  const [type,setType] = useState(10) //Keyed by 10 for current and 20 for sample paths
  const theme = createTheme(themeOptions) //Imported themes for dark mode
  const [loading,setLoading] = useState(false)
  const handleTypeChange = (event) =>{
    setType(event.target.value)
  }
  
  const fetchDevices = async() =>
  {
    setLoading(true)
    setDevices([])
    const queryPath = type===10?"current":"sample"
    console.log(queryPath)
    //Check if search is a number
    var url = ""
    if(isNaN(search))
    {
      const params = new URLSearchParams({category:queryPath,count:10})
      url = `http://localhost:5000/data?${params.toString()}`
    }
    else
    {
      const params = new URLSearchParams({category:queryPath,count:search})
      url = `http://localhost:5000/data?${params.toString()}`
    }
    await fetch(url)
    .then(response=>response.text())
    .then(str=>{setDevices(JSON.parse(str))})
    setLoading(false)
  }
  return (
    <ThemeProvider theme={theme}>
      <div style={{width:"100%",backgroundColor:"#303030"}}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h2" component="div">
              SMS Test Bed Explorer
            </Typography>
          </Toolbar>
        </AppBar>
        <Paper sx={{backgroundColor:"#303030",height:"95%",overflow:"auto"}}>
          <FormControl sx={{width:"100%"}} fullwidth>
          <Select
          sx={{width:"100%",input:{color:"white"}}} 
          labelId="Data Selection Category" 
          id="data-selection" 
          value={type} 
          onChange={handleTypeChange}
          inputProps={{style:{color:'white'},input:{color:"white"}}}>
            <MenuItem value={10}>Current</MenuItem>
            <MenuItem value={20}>Sample</MenuItem>
          </Select>
          <br></br>
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <TextField 
              type="number"
              sx={{width:"100%",input:{color:"white"}}} 
              label="Number of Entries" 
              value={search} 
              onChange={(e)=>setSearch(e.target.value)}/>
            </Grid>
            <Grid item xs={4}>
              <Button onClick={fetchDevices} variant="contained" color="primary" fullWidth>
                Search
              </Button>
            </Grid>
          </Grid>
          </FormControl>
          <br></br>
          {devices.length===0 && loading?<CircularProgress color="primary"/>:<Typography variant="h5">{devices.length>0?"":"Play with the search bar to get started!"}</Typography>}
          {SMSResults(devices)}
          <br></br>
        </Paper>
      </div>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});





/**
 * 
 * @param {any[]} devices The array of devices to be displayed 
 * @returns {JSX.Element[]} An array of JSX elements to be rendered
 */
function SMSResults(devices) {
  return devices.map((device) => {
    return (
      <Accordion sx={{ backgroundColor: "424242" }}>
        <AccordionSummary
          expandIcon={<AntDesign name="caretup" size={24} color="black" />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography variant="h3">{device.name + ", uuid: " + device.uuid}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2}>
            {device.components.map((component) => {
              return (
                <Grid key={component.id} item xs={6}>
                  <Typography variant="h4">{component.component + " , " + component.id}</Typography>
                  {Object.keys(component.data).map((key) => {
                    return (
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <Typography variant="h5">{key}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <TableContainer sx={{ maxHeight: "500px", overflow: "auto", backgroundColor: "#303030" }}> 
                            <Table stickyHeader>
                              <TableHead>
                                <TableRow>
                                  <TableCell>Description</TableCell>
                                  <TableCell>Data Item ID</TableCell>
                                  <TableCell>Timestamp</TableCell>
                                  <TableCell>Name</TableCell>
                                  <TableCell>Sub Type</TableCell>
                                  <TableCell>Sequence</TableCell>
                                  <TableCell>Value</TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {component.data[key].map((data) => {
                                  return (
                                    <TableRow key={data.timestamp}>
                                      <TableCell>{data.description}</TableCell>
                                      <TableCell>{data.dataItemId}</TableCell>
                                      <TableCell>{data.timestamp}</TableCell>
                                      <TableCell>{data.name}</TableCell>
                                      <TableCell>{data.subType}</TableCell>
                                      <TableCell>{data.sequence}</TableCell>
                                      <TableCell>{data.value}</TableCell>
                                    </TableRow>
                                  );
                                })}
                              </TableBody>
                            </Table>
                          </TableContainer>
                        </Grid>
                      </Grid>
                    );
                  })}
                </Grid>
              );
            })}
          </Grid>
        </AccordionDetails>
      </Accordion>
    );
  });
}

