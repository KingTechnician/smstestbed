import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React, {useState} from 'react';
import {Select,Grid,Table,Pagination,Divider,TableBody,TableCell,TableContainer,TableHead,TablePagination,TableRow,Accordion,AccordionSummary,AccordionDetails,FormControl,TextField,InputLabel,MenuItem,Button,AppBar,Typography,Toolbar,Paper,Box} from '@mui/material'
import {createTheme,ThemeProvider,styled} from '@mui/material/styles'
import { AntDesign } from '@expo/vector-icons';


const dataColumns = [
  {id:"description",label:"Description",minWidth:170},
  {id:"dataItemId",label:"DataItemId",minWidth:100},
  {id:"timestamp",label:"Timestamp",minWidth:170},
  {id:"name",label:"Name",minWidth:170},
  {id:"sequence",label:"Sequence",minWidth:170},
  {id:"subType",label:"SubType",minWidth:170},
  {id:"value",label:"Value",minWidth:170}
]


const columns = [
  { id: 'name', label: 'ame', minWidth: 170 },
  { id: 'code', label: 'ISO\u00a0Code', minWidth: 100 },
  {
    id: 'population',
    label: 'Population',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'size',
    label: 'Size\u00a0(km\u00b2)',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'density',
    label: 'Density',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toFixed(2),
  },
];

function tableData(description,dataItemId,timestamp,name,sequence,subType,value)
{
  return {description,dataItemId,timestamp,name,sequence,subType,value}

}
function createData(name, code, population, size) {
  const density = population / size;
  return { name, code, population, size, density };
}

const rows = [
  createData('India', 'IN', 1324171354, 3287263),
  createData('China', 'CN', 1403500365, 9596961),
  createData('Italy', 'IT', 60483973, 301340),
  createData('United States', 'US', 327167434, 9833520),
  createData('Canada', 'CA', 37602103, 9984670),
  createData('Australia', 'AU', 25475400, 7692024),
  createData('Germany', 'DE', 83019200, 357578),
  createData('Ireland', 'IE', 4857000, 70273),
  createData('Mexico', 'MX', 126577691, 1972550),
  createData('Japan', 'JP', 126317000, 377973),
  createData('France', 'FR', 67022000, 640679),
  createData('United Kingdom', 'GB', 67545757, 242495),
  createData('Russia', 'RU', 146793744, 17098246),
  createData('Nigeria', 'NG', 200962417, 923768),
  createData('Brazil', 'BR', 210147125, 8515767),
];

export function ColumnGroupingTable(props) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [dataRows,setDataRows] = React.useState([])
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  return (
    <Paper sx={{ width: '100%' }}>
      <TableContainer sx={{ maxHeight: 440,backgroundColor:"#303030" }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {dataColumns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ top: 0, minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

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
                            <ColumnGroupingTable data={component.data[key]}/>
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
