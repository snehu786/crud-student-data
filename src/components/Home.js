import React from 'react';
import List from '../components/student/List';
import { Typography, Box, makeStyles, Grid, TextField, Button} from '@material-ui/core';
import { grey,  deepOrange} from '@material-ui/core/colors';
import { useState } from "react";
import axios from 'axios';

const useStyles = makeStyles({
  headingColor:{
    backgroundColor: grey[900],
    color: "white",
    marginBottom: 2
  },
  addStudColor:{
    backgroundColor: deepOrange[400],
    color: "white",
    marginBottom: 2
  },
})

export default function Home() {
  const classes = useStyles();

  const [student, setStudent] = useState({
    studname: "",
    email: ""
  });

  const [status, setStatus] = useState();

  function onDataChange(e){
    setStudent({
      ...student,
      [e.target.name]: e.target.value
    })
    // console.log(student);
  }

  async function onFormSubmit(e){
    e.preventDefault()
      try{
        await axios.post(`http://localhost:4000/students`, student)
        setStatus(true);
      }
      catch(error){
        console.log("Something is wrong")
      }
    }
    if(status){
      return <Home/>
    }

  return (
   <>
    <Box align="center" className={classes.headingColor} p= {2} m={2}>
      <Typography variant="h2">
        React Crud
      </Typography>
    </Box>
    <Grid container spacing={4}>
      <Grid item md={6} xs={12}>
      <Box align="center" className={classes.addStudColor} p= {2} mb={2}>
      <Typography variant="h4">
        Add Student
      </Typography>
    </Box>
    <form noValidate>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField autoComplete="studname" name="studname" variant="outlined" required id ="studname" label="Name" onChange={e => onDataChange(e)} fullWidth autoFocus/> 
        </Grid>
        <Grid item xs={12} mb={2}>
          <TextField autoComplete="email" name="email" variant="outlined" required  id ="email" label="Email Address" onChange={e => onDataChange(e)} fullWidth autoFocus/> 
        </Grid>
      </Grid>
      <Box mt={4}>
        <Button type="submit" variant="contained" color="primary" onClick={e =>onFormSubmit(e)}fullWidth>Add </Button>
      </Box>
    </form>
      </Grid>
      <Grid item md={6} xs={12}>
       <List/>
      </Grid>
    </Grid>
   </>
  )
}
