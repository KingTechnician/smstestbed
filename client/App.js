import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {useState} from 'react';
import {Select,Grid,Table,TableBody,TableCell,TableContainer,TableHead,TablePagination,TableRow,Accordion,AccordionSummary,AccordionDetails,FormControl,TextField,InputLabel,MenuItem,Button,AppBar,Typography,Toolbar,Paper,Box} from '@mui/material'
import {createTheme,ThemeProvider,styled} from '@mui/material/styles'

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
  }
};




export default function App() {
  const [search,setSearch] = useState("")
  const [type,setType] = useState(10)
  const theme = createTheme(themeOptions)
  const displayStyler = createTheme({root:{"& .MuiTableCell-head":{color:"white",backgroundColor:"blue"}}})
  const handleTypeChange = (event) =>{
    setType(event.target.value)
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
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>Results Example</Typography>
            </AccordionSummary>
            <AccordionDetails> 
            <TableContainer sx={{maxHeight:"20%"}}>
                <Table stickyHeader aria-label="display-result">
                  <TableHead>
                    <TableRow sx={{backgroundColor:'primary.main','&.MuiTableCell-head':{color:'common.white'}}}> 
                      <TableCell>Id</TableCell>
                      <TableCell>First Name</TableCell>
                      <TableCell>Last Name</TableCell>
                      <TableCell>Email</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>1</TableCell>
                      <TableCell>John</TableCell>
                      <TableCell>Doe</TableCell>
                      <TableCell>test@gmail.com</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </AccordionDetails>
          </Accordion>
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
