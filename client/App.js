import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React, {useState} from 'react';
import {Select,Grid,Table,Pagination,Divider,TableBody,TableCell,TableContainer,TableHead,TablePagination,TableRow,Accordion,AccordionSummary,AccordionDetails,FormControl,TextField,InputLabel,MenuItem,Button,AppBar,Typography,Toolbar,Paper,Box} from '@mui/material'
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
  const [type,setType] = useState(10)
  const theme = createTheme(themeOptions)
  const displayStyler = createTheme({root:{"& .MuiTableCell-head":{color:"white",backgroundColor:"blue"}}})
  const handleTypeChange = (event) =>{
    setType(event.target.value)
  }
  React.useEffect(()=>
  {
    console.log("I'm over here.")
    fetch("http://localhost:5000/data")
    .then(response=>response.text())
    .then(str=>console.log(str))

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
        <Paper sx={{backgroundColor:"#303030",height:"100%"}}>
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
          <Accordion sx={{backgroundColor:"#424242",color:"white"}}>
            <AccordionSummary
              expandIcon={<AntDesign name="caretup" size={24} color="black" />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography variant="h3">Device Example</Typography>
              <Divider sx={{backgroundColor:"blue"}}/>
            </AccordionSummary>
            <AccordionDetails> 
              <Grid container spacing ={2}>
                <Grid item xs={6}>
                  <Typography variant="h4">Events</Typography>
                  <TableContainer sx={{backgroundColor:"#303030"}}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Timestamp</TableCell>
                          <TableCell>Type</TableCell>
                          <TableCell>Sub Type</TableCell>
                          <TableCell>Name</TableCell>
                          <TableCell>Id</TableCell>
                          <TableCell>Sequence</TableCell>
                          <TableCell>Value</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow>
                          <TableCell>2021-10-10</TableCell>
                          <TableCell>Device</TableCell>
                          <TableCell>Temperature</TableCell>
                          <TableCell>Device 1</TableCell>
                          <TableCell>1</TableCell>
                          <TableCell>1</TableCell>
                          <TableCell>23.4</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="h4">Properties</Typography>
                  <TableContainer sx={{backgroundColor:"#303030"}}>
                  <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Timestamp</TableCell>
                          <TableCell>Type</TableCell>
                          <TableCell>Sub Type</TableCell>
                          <TableCell>Name</TableCell>
                          <TableCell>Id</TableCell>
                          <TableCell>Sequence</TableCell>
                          <TableCell>Value</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow>
                          <TableCell>2021-10-10</TableCell>
                          <TableCell>Device</TableCell>
                          <TableCell>Temperature</TableCell>
                          <TableCell>Device 1</TableCell>
                          <TableCell>1</TableCell>
                          <TableCell>1</TableCell>
                          <TableCell>23.4</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="h4">Commands</Typography>
                  <TableContainer sx={{backgroundColor:"#303030"}}>
                  <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Timestamp</TableCell>
                          <TableCell>Type</TableCell>
                          <TableCell>Sub Type</TableCell>
                          <TableCell>Name</TableCell>
                          <TableCell>Id</TableCell>
                          <TableCell>Sequence</TableCell>
                          <TableCell>Value</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow>
                          <TableCell>2021-10-10</TableCell>
                          <TableCell>Device</TableCell>
                          <TableCell>Temperature</TableCell>
                          <TableCell>Device 1</TableCell>
                          <TableCell>1</TableCell>
                          <TableCell>1</TableCell>
                          <TableCell>23.4</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
          <Pagination count={10} variant="outlined" size="large"/>
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
