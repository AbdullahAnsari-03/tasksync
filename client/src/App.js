import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Button,
  Box, Card, CardContent,
  List,
  ListItem,
  Paper,
} from '@mui/material';
import Login from './components/Login';
import TaskForm from './components/TaskForm';
import { Chip, Grid } from '@mui/material';


function App() {
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem('token'));
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (loggedIn) {
      const fetchTasks = async () => {
        const token = localStorage.getItem('token');
        try {
          const res = await fetch('/api/tasks', {
            headers: { Authorization: `Bearer ${token}` },
          });
          const data = await res.json();
          if (res.ok) {
            setTasks(data);
          } else {
            alert(data.message || 'Failed to fetch tasks');
          }
        } catch (err) {
          alert('Error fetching tasks');
        }
      };
      fetchTasks();
    }
  }, [loggedIn]);

  const handleLogin = () => {
    setLoggedIn(true);
  };

  const handleTaskCreated = (newTask) => {
    setTasks([newTask, ...tasks]);
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">TaskSync</Typography>
        </Toolbar>
      </AppBar>

      <Container sx={{ mt: 4 }}>
        {!loggedIn ? (
          <Login onLogin={handleLogin} />
        ) : (
          <>
            <Box display="flex" justifyContent="flex-end" mb={2}>
              <Button
                variant="outlined"
                color="error"
                onClick={() => {
                  localStorage.removeItem('token');
                  setLoggedIn(false);
                  setTasks([]);
                }}
              >
                Logout
              </Button>
            </Box>

            <Typography variant="h5" gutterBottom>
              Create New Task
            </Typography>
            <TaskForm onTaskCreated={handleTaskCreated} />

            <Typography variant="h6" sx={{ mt: 4 }}>
              Tasks Created
            </Typography>
<List sx={{ mt: 2 }}>
  {tasks.map((task) => (
    <ListItem key={task._id} sx={{ px: 0 }}>
      <Paper
        elevation={4}
        sx={{
          p: 2,
          width: '100%',
          backdropFilter: 'blur(10px)',
          background: 'rgba(255, 255, 255, 0.1)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          borderRadius: 3,
        }}
      >
        <Typography variant="h6">{task.title}</Typography>
        <Typography variant="body2" sx={{ mt: 1 }}>
          {task.description}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          Status: {task.status}
        </Typography>
      </Paper>
    </ListItem>
  ))}
</List>


          </>
        )}
      </Container>
    </>
  );
}

export default App;
