import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React, {useState,useEffect} from 'react';
import {Select,Grid,Table,Pagination,Divider,TableBody,CircularProgress,TableCell,TableContainer,TableHead,TablePagination,TableRow,Accordion,AccordionSummary,AccordionDetails,FormControl,TextField,InputLabel,MenuItem,Button,AppBar,Typography,Toolbar,Paper,Box} from '@mui/material'
import {createTheme,ThemeProvider,styled} from '@mui/material/styles'
import { AntDesign } from '@expo/vector-icons';



export const themeOptions = {
  palette: {
    mode:'dark',
    type: 'dark',
    primary: {
      main: '#2596be',
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
  const [search, setSearch] = useState("");
  const [devices, setDevices] = useState([]);
  const [type, setType] = useState(10);
  const [baseUrl, setBaseUrl] = useState("https://smstestbed.nist.gov/vds");
  const [loading, setLoading] = useState(false);
  const theme = createTheme(themeOptions);

  useEffect(() => {
    const interval = setInterval(() => {
      fetchDevices();
    }, 5000); // Fetch devices every second

    return () => clearInterval(interval); // Cleanup on unmount
  }, [search, type, baseUrl]); // Dependencies for useEffect

  const handleTypeChange = (event) => {
    setType(event.target.value);
  };

  const handleBaseUrlChange = (event) => {
    setBaseUrl(event.target.value);
  };

  const fetchDevices = async () => {
    setLoading(true);
    setDevices([]);
    const queryPath = type === 10 ? "current" : "sample";
    const params = new URLSearchParams({ baseUrl: baseUrl,category: queryPath, count: isNaN(search) ? 10 : search });
    const url = `http://localhost:5000/data?${params.toString()}`;
    await fetch(url)
      .then(response => response.json())
      .then(data => {
        setDevices(data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Failed to fetch devices:", error);
        setLoading(false);
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <div style={{width: "100%", backgroundColor: "#303030"}}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h2" component="div">
              SMS Test Bed Explorer
            </Typography>
          </Toolbar>
        </AppBar>
        <Paper sx={{ margin: 2, padding: 2 }}>
          <FormControl fullWidth style={{ marginBottom: 16 }}>
            <TextField
              fullWidth
              label="Base URL"
              variant="outlined"
              value={baseUrl}
              onChange={handleBaseUrlChange}
              inputProps={{ style: { color: 'white' } }}
              sx={{ input: { color: 'white' } }}
            />
          </FormControl>
          <FormControl fullWidth style={{ marginBottom: 16 }}>
            <Select
              fullWidth
              value={type}
              onChange={handleTypeChange}
              sx={{ input: { color: 'white' } }}
            >
              <MenuItem value={10}>Current</MenuItem>
              <MenuItem value={20}>Sample</MenuItem>
            </Select>
          </FormControl>
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <TextField
                fullWidth
                type="number"
                label="Number of Entries"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                sx={{ input: { color: 'white' } }}
              />
            </Grid>
            <Grid item xs={4}>
              <Button variant="contained" color="primary" onClick={fetchDevices} fullWidth>
                Search
              </Button>
            </Grid>
          </Grid>
          <Typography variant="h5" sx={{ color: 'white', marginTop: 2 }}>
            {loading ? <CircularProgress color="primary" /> : devices.length > 0 ? "Data loaded" : "No data found"}
            {SMSResults(devices)}
          </Typography>
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
                          <TableContainer sx={{ maxHeight: "500px", overflow: "auto", backgroundColor: "#282828" }}> 
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

