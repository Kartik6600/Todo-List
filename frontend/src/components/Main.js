import axios from "axios";
import React, { useEffect, useState } from "react";
import "./css/Main.css";
import {
    Container,
    Grid,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Button,
    Paper,
    Typography,
  } from "@mui/material";

  const Main = () => {
    return <div><Todo /></div>;
};

export default Main;

  function Todo() {
    const [todoList, setTodoList] = useState([]);
    const [editableId, setEditableId] = useState(null);
    const [editedTask, setEditedTask] = useState("");
    const [editedStatus, setEditedStatus] = useState("");
    const [editedDeadline, setEditedDeadline] = useState("");
    const [newTask, setNewTask] = useState("");
    const [newStatus, setNewStatus] = useState("");
    const [newDeadline, setNewDeadline] = useState("");
  
    useEffect(() => {
      axios
        .get("http://127.0.0.1:3001/getTodoList")
        .then((result) => setTodoList(result.data))
        .catch((err) => console.log(err));
    }, []);
  
    const toggleEditable = (id) => {
      const rowData = todoList.find((data) => data._id === id);
      if (rowData) {
        setEditableId(id);
        setEditedTask(rowData.task);
        setEditedStatus(rowData.status);
        setEditedDeadline(rowData.deadline || "");
      } else {
        setEditableId(null);
        setEditedTask("");
        setEditedStatus("");
        setEditedDeadline("");
      }
    };
  
    const addTask = (e) => {
      e.preventDefault();
      if (!newTask || !newStatus || !newDeadline) {
        alert("All fields must be filled out.");
        return;
      }
  
      axios
        .post("http://127.0.0.1:3001/addTodoList", {
          task: newTask,
          status: newStatus,
          deadline: newDeadline,
        })
        .then(() => window.location.reload())
        .catch((err) => console.log(err));
    };
  
    const saveEditedTask = (id) => {
      if (!editedTask || !editedStatus || !editedDeadline) {
        alert("All fields must be filled out.");
        return;
      }
  
      axios
        .post(`http://127.0.0.1:3001/updateTodoList/${id}`, {
          task: editedTask,
          status: editedStatus,
          deadline: editedDeadline,
        })
        .then(() => window.location.reload())
        .catch((err) => console.log(err));
    };
  
    const deleteTask = (id) => {
      axios
        .delete(`http://127.0.0.1:3001/deleteTodoList/${id}`)
        .then(() => window.location.reload())
        .catch((err) => console.log(err));
    };
  
    return (
        <div class="body">
      <Container sx={{ mt: 5 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={7}>
            <Typography variant="h4" align="center" gutterBottom>
              Todo List
            </Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Task</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Deadline</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {todoList.map((data) => (
                    <TableRow key={data._id}>
                      <TableCell>
                        {editableId === data._id ? (
                          <TextField
                            fullWidth
                            value={editedTask}
                            onChange={(e) => setEditedTask(e.target.value)}
                          />
                        ) : (
                          data.task
                        )}
                      </TableCell>
                      <TableCell>
                        {editableId === data._id ? (
                          <TextField
                            fullWidth
                            value={editedStatus}
                            onChange={(e) => setEditedStatus(e.target.value)}
                          />
                        ) : (
                          data.status
                        )}
                      </TableCell>
                      <TableCell>
                        {editableId === data._id ? (
                          <TextField
                            fullWidth
                            type="datetime-local"
                            value={editedDeadline}
                            onChange={(e) => setEditedDeadline(e.target.value)}
                          />
                        ) : (
                          data.deadline
                            ? new Date(data.deadline).toLocaleString()
                            : ""
                        )}
                      </TableCell>
                      <TableCell>
                        {editableId === data._id ? (
                          <Button
                            variant="contained"
                            color="success"
                            size="small"
                            onClick={() => saveEditedTask(data._id)}
                          >
                            Save
                          </Button>
                        ) : (
                          <Button
                            variant="contained"
                            color="primary"
                            size="small"
                            onClick={() => toggleEditable(data._id)}
                          >
                            Edit
                          </Button>
                        )}
                        <Button
                          variant="contained"
                          color="error"
                          size="small"
                          sx={{ ml: 1 }}
                          onClick={() => deleteTask(data._id)}
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          <Grid item xs={12} md={5}>
            <Typography variant="h4" align="center" gutterBottom>
              Add Task
            </Typography>
            <Paper sx={{ p: 4 }}>
              <form onSubmit={addTask}>
                <TextField
                  fullWidth
                  label="Task"
                  margin="normal"
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                />
                <TextField
                  fullWidth
                  label="Status"
                  margin="normal"
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                />
                <TextField
                  fullWidth
                  type="datetime-local"
                  margin="normal"
                  value={newDeadline}
                  onChange={(e) => setNewDeadline(e.target.value)}
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="success"
                  fullWidth
                  sx={{ mt: 2 }}
                >
                  Add Task
                </Button>
              </form>
            </Paper>
          </Grid>
        </Grid>
      </Container>
      </div>
    );
  }