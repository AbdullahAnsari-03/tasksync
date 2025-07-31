// components/TaskForm.js
import React, { useState } from 'react';
import { Box, Button, MenuItem, Paper, TextField, Typography } from '@mui/material';

const TaskForm = ({ onTaskCreated }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('To Do');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      const res = await fetch('/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, description, status }),
      });

      const data = await res.json();
      if (res.ok) {
        onTaskCreated(data);
        setTitle('');
        setDescription('');
        setStatus('To Do');
      } else {
        alert(data.error || 'Task creation failed');
      }
    } catch (err) {
      console.error('Error:', err);
      alert('Something went wrong!');
    }
  };

  return (
    <Paper
      elevation={6}
      sx={{
        p: 3,
        mb: 4,
        backdropFilter: 'blur(12px)',
        background: 'rgba(255, 255, 255, 0.1)',
        border: '1px solid rgba(255, 255, 255, 0.3)',
        borderRadius: 4,
      }}
    >
      <Typography variant="h6" gutterBottom> Create a New Task </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          label="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          fullWidth
        />
        <TextField
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          multiline
          rows={3}
          fullWidth
        />
        <TextField
          select
          label="Status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          fullWidth
        >
          <MenuItem value="To Do">To Do</MenuItem>
          <MenuItem value="In Progress">In Progress</MenuItem>
          <MenuItem value="Done">Done</MenuItem>
        </TextField>
        <Button variant="contained" type="submit" sx={{ bgcolor: '#1976d2' }}>
          Create Task
        </Button>
      </Box>
    </Paper>
  );
};

export default TaskForm;
