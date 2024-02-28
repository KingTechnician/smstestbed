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
  const [search,setSearch] = useState("")
  const [devices,setDevices] = useState([])
  const [type,setType] = useState(10)
  const theme = createTheme(themeOptions)
  const displayStyler = createTheme({root:{"& .MuiTableCell-head":{color:"white",backgroundColor:"blue"}}})
  const handleTypeChange = (event) =>{
    console.log(devices)
    setType(event.target.value)
  }
  
  const fetchDevices = async() =>
  {
    await fetch("http://localhost:5000/data")
    .then(response=>response.text())
    .then(str=>{setDevices(JSON.parse(str))})
  }
  React.useEffect(()=>
  {
    fetchDevices()
    console.log(devices)
  },[])
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
              sx={{width:"100%",input:{color:"white"}}} 
              label="Number of Entries" 
              value={search} 
              onChange={(e)=>setSearch(e.target.value)}/>
            </Grid>
            <Grid item xs={4}>
              <Button variant="contained" color="primary" fullWidth>
                Search
              </Button>
            </Grid>
          </Grid>
          </FormControl>
          <br></br>
          {devices.length===0?<CircularProgress color="primary"/>:""}
          {devices.map((device)=>
          {
            return(
            <Accordion sx={{backgroundColor:"424242"}}>
              <AccordionSummary
                expandIcon={<AntDesign name="caretup" size={24} color="black" />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography variant="h3">{device.name+", uuid: "+device.uuid}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container spacing={2}>
                  {device.components.map((component)=>
                  {
                    return(
                    <Grid item xs={6}>
                      <Typography variant="h4">{component.component+" , "+component.id}</Typography>
                      {
                        Object.keys(component.data).map((key)=>
                        {
                          return(
                          <Grid container spacing={2}>
                            <Grid item xs={12}>
                              <Typography variant="h5">{key}</Typography>
                            </Grid>
                          <Grid item xs={12}>
                              <TableContainer sx={{maxHeight:"500px",overflow:"auto",backgroundColor:"#303030"}}>
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
                                    {component.data[key].map((data)=>
                                    {
                                      return(
                                      <TableRow>
                                        <TableCell>{data.description}</TableCell>
                                        <TableCell>{data.dataItemId}</TableCell>
                                        <TableCell>{data.timestamp}</TableCell>
                                        <TableCell>{data.name}</TableCell>
                                        <TableCell>{data.subType}</TableCell>
                                        <TableCell>{data.sequence}</TableCell>
                                        <TableCell>{data.value}</TableCell>
                                      </TableRow>
                                      )
                                    })}
                                  </TableBody>
                                </Table>
                              </TableContainer>
                            </Grid>
                          </Grid>
                          )
                        })
                      }
                    </Grid>
                    )
                  })}
                </Grid>
              </AccordionDetails>
            </Accordion>
            )
          })}
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
