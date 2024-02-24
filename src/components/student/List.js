import React from 'react';
import { Link } from 'react-router-dom';
import { Typography, Box, makeStyles, TableContainer, Table, TableBody, TableCell, TableHead, TableRow, Paper, IconButton, Tooltip} from '@material-ui/core';
import VisibilityIcon from '@material-ui/icons/Visibility';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import axios from 'axios';
import { useState, useEffect} from "react";


import { green } from '@material-ui/core/colors';

const useStyles = makeStyles({
  studListColor:{
    backgroundColor: green[500],
    color: "white"
  },
})

export default function List() {
    const classes = useStyles();

    const[students, setStudents] = useState([]);
    useEffect(()=>{
      async function getAllStudent(){
        try{
          const students = await axios.get("http://localhost:4000/students")
          // console.log(students.data);
          setStudents(students.data);
        }
        catch(error){
          console.log("Something is wrong")
        }
      }
      getAllStudent();
    },[])

    const handleDelete = async id =>{
      await axios.delete(`http://localhost:4000/students/${id}`);
      var newStudent = students.filter((item)=> {
        return item.id !== id;
      })
      setStudents(newStudent);
    }

    
  return (
  <>
     <Box align="center" className={classes.studListColor} p= {2} mb={2}>
      <Typography variant="h4">
        Student List
      </Typography>
    </Box>
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow style={{ backgroundColor: '#bdbdbd'}} >
            <TableCell align="center" className={classes.
            tableHeadCell}>No</TableCell>
             <TableCell align="center" className={classes.
            tableHeadCell}>Name</TableCell>
             <TableCell align="center" className={classes.
            tableHeadCell}>Email</TableCell>
            <TableCell align="center" className={classes.
            tableHeadCell}>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {students.map((student, i)=> {
          return(
            <TableRow key={i}>
            <TableCell align="center">{i + 1}</TableCell>
            <TableCell align="center">{student.studname}</TableCell>
            <TableCell align="center">{student.email}</TableCell>
            <TableCell align="center">
              <Tooltip title="View">
                <IconButton>
                  <Link to={`/view/${student.id}`}>
                  <VisibilityIcon color="primary"/>
                  </Link>
                </IconButton>
              </Tooltip>
              <Tooltip title="Edit">
                <IconButton>
                  <Link to={`/edit/${student.id}`}>
                   <EditIcon color="primary"/>
                  </Link>
                </IconButton>
              </Tooltip>
              <Tooltip title="Delete">
                <IconButton onClick={() => handleDelete(student.id)}>
                  <DeleteIcon color="secondary"/>
                </IconButton>
              </Tooltip>
            </TableCell>
          </TableRow>
          )
        }
        )}
         
        </TableBody>
      </Table>
    </TableContainer>
  </>
  )
}
