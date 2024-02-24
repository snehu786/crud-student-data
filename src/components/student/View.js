import React from 'react';
import { Link } from 'react-router-dom';
import { useParams, useNavigate} from 'react-router-dom';
import { useState, useEffect} from "react";
import axios from "axios";
import { Typography, Box, makeStyles, TableContainer, Table, TableBody, TableCell, TableHead, TableRow, Paper, IconButton, Tooltip, Button} from '@material-ui/core';
import VisibilityIcon from '@material-ui/icons/Visibility';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';


import { green } from '@material-ui/core/colors';

const useStyles = makeStyles({
    studListColor:{
      backgroundColor: green[400],
      color: "white"
    },
    tableHeadCell:{
      color: "white",
      fontweight: "bold",
      fontsize: 16
    },
  });

export default function View() {
    const classes = useStyles();

    const {id} = useParams();

    const[student, setStudent] = useState([]);
    const navigate = useNavigate();
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

   
    const handleClick = ()=>{
      navigate("/");
    }

  return (
    <>
       <Box align="center" className={classes.studListColor} p= {2} mb={2}>
      <Typography variant="h4">
        Student Detail
      </Typography>
    </Box>
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow style={{ backgroundColor: '#bdbdbd'}} >
            <TableCell align="center" className={classes.tableHeadCell}>No</TableCell>
             <TableCell align="center" className={classes.tableHeadCell}>Name</TableCell>
             <TableCell align="center" className={classes.tableHeadCell}>Email</TableCell>
            <TableCell align="center" className={classes.tableHeadCell}>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell align="center">{student.id}</TableCell>
            <TableCell align="center">{student.studname}</TableCell>
            <TableCell align="center">{student.email}</TableCell>
            <TableCell align="center">
              <Tooltip title="View">
                <IconButton>
                  <Link to="/view/1">
                  <VisibilityIcon color="primary"/>
                  </Link>
                </IconButton>
              </Tooltip>
              <Tooltip title="Edit">
                <IconButton>
                  <Link to="/edit/1">
                   <EditIcon color="primary"/>
                  </Link>
                </IconButton>
              </Tooltip>
              <Tooltip title="Delete">
                <IconButton>
                  <Link to="/delete/1">
                  <DeleteIcon color="primary"/>
                  </Link>
                </IconButton>
              </Tooltip>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
    <Box mt={4}>
        <Button m={3} type="submit" className={classes.center} variant="contained" color="primary" onClick={handleClick}>Back To Home</Button>
      </Box>
    </>
  )
}
