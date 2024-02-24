import React from 'react';
import { Typography, Box, makeStyles, Grid, TextField, Button} from '@material-ui/core';
import { grey, green } from '@material-ui/core/colors';
import { useState, useEffect} from "react";
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const useStyles = makeStyles({
  headingColor:{
    backgroundColor: grey[900],
    color: "white",
    marginBottom: 2
  },
  addStudColor:{
    backgroundColor: green[500],
    color: "white",
    marginBottom: 2
  },
})


export default function Edit() {
  const classes = useStyles();

  const {id} = useParams();

  const navigate = useNavigate();

  const handleClick = ()=>{
    navigate("/");
  }

  const [student, setStudent] = useState({
    studname: "",
    email: ""
  });

  useEffect(()=>{
    async function getStudent(){
      try{
        const student = await axios.get(`http://localhost:4000/students/${id}`)
        // console.log(student.data);
        setStudent(student.data);
      }
      catch(error){
        console.log("Something is wrong")
      }
    }
    getStudent();
  }, [id])

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
        await axios.put(`http://localhost:4000/students/${id}`, student)
        navigate("/")
      }
      catch(error){
        console.log("Something is wrong")
      }
    }
  return (
    <>
        <Box Align="center" className={classes.headingColor} p= {2} mb={2}>
      <Typography variant="h2">
        React Crud
      </Typography>
    </Box>
    <Grid container justify="center" spacing={4}>
      <Grid item md={6} xs={12}>
      <Box Align="center" className={classes.addStudColor} p= {2} mb={2}>
      <Typography variant="h4">
        Edit Student
      </Typography>
    </Box>
    <form noValidate>
      <Grid container spacing={2}>
      <Grid item xs={12}>
          <TextField autoComplete="id" name="id" value={id} variant="outlined" required id ="id" label="ID" disabled fullWidth autoFocus/> 
        </Grid>
        <Grid item xs={12}>
          <TextField autoComplete="studname" name="studname" value={student.studname} variant="outlined" required id ="sudname" label="Name" onChange={e => onDataChange(e)} fullWidth autoFocus/> 
        </Grid>
        <Grid item xs={12} mb={2}>
          <TextField autoComplete="email" name="email" value={student.email} variant="outlined" required  id ="email" label="Email Address" onChange={e => onDataChange(e)}fullWidth autoFocus/> 
        </Grid>
      </Grid>
      <Box mb={4}>
        <Button type="submit" variant="contained" color="primary" fullWidth onClick={e => onFormSubmit(e)}>Update</Button>
      </Box>
    </form>
    <Box mt={4}>
        <Button m={3} type="submit" className={classes.center} variant="contained" color="primary" onClick={handleClick}>Back To Home</Button>
      </Box>
      </Grid>
      </Grid>
    </>
  )
}
