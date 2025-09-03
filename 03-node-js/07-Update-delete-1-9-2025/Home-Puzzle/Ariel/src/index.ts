import express from "express";
import { randomUUID } from 'crypto';
// import { Task } from "./model/taskModle";
import { tasks } from "./model/taskData";
const app = express();
const PORT = 3000;
app.use(express.json()); // use this line to parse request body
app.use(express.static("./src/public"));
/////////////////////////////////////////////////////
/////////////////////////////////////////////////////
/////////////////////////////////////////////////////

//API route (for data)

// GET /tasks - Retrieve all tasks - דואג להציג הכל באתר
app.get('/tasks/get-all-tasks', (_, res) => {
  try {
    res.status(200).json({
      success: true,
      data: tasks,
      count: tasks.length
    });
  } catch (error) {
    console.error('Error occurred while fetching all tasks:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});


// GET /tasks/get-task/:id - Retrieve a single task by ID
app.get('/tasks/get-task/:id', (req, res) => {
  try {
    const { id } = req.params;
    
    // Find task by ID
    const task = tasks.find(t => t.id === id);
    
    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }
    
    return res.status(200).json({
      success: true,
      data: task
    });
  } catch (error) {
    console.error('Error occurred while fetching task:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// POST /tasks/create-task - Create a new task
app.post('/tasks/create-task', (req, res) => {
  try {
    const { title, description } = req.body;
    
    // Title validation - required and non-empty
    if (!title || typeof title !== 'string' || title.trim().length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Title is required and must be a non-empty string'
      });
    }
    
    // Create new task
    const newTask = {
      id: randomUUID(),
      title: title.trim(),
      description: description ? description.trim() : undefined,
      completed: false,
      createdAt: new Date()
    };
    
    tasks.push(newTask);
    
    return res.status(201).json({
      success: true,
      data: newTask,
      message: 'Task created successfully'
    });
  } catch (error) {
    console.error('Error occurred while creating task:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// DELETE /tasks/delete-task/:id - Delete a task
app.delete('/tasks/delete-task/:id', (req: any, res: any) => {
  try {
    const { id } = req.params;
    
    // Find task index
    const taskIndex = tasks.findIndex(t => t.id === id);
    
    if (taskIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }
    
    // Remove task from array
    tasks.splice(taskIndex, 1);
    
    res.status(200).json({
      success: true,
      message: 'Task deleted successfully'
    });
  } catch (error) {
    console.error('Error occurred while deleting task:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});


    // PUT /tasks/update-task/:id - Update an existing task
app.put('/tasks/update-task/:id', (req:any, res:any) => {
  try {
    const { id } = req.params;
    const { title, description, completed } = req.body;
    
    // Find task
    const task = tasks.find(t => t.id === id);
    
    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }
    
    // Update fields if provided
    if (title !== undefined) {
      if (!title || typeof title !== 'string' || title.trim().length === 0) {
        return res.status(400).json({
          success: false,
          message: 'Title must be a non-empty string'
        });
      }
      task.title = title.trim();
    }
    
    if (description !== undefined) {
      task.description = description ? description.trim() : undefined;
    }
    
    if (completed !== undefined) {
      task.completed = Boolean(completed);
    }
    
    res.status(200).json({
      success: true,
      data: task,
      message: 'Task updated successfully'
    });
  } catch (error) {
    console.error('Error occurred while updating task:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});



// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

/*
GET /tasks - Retrieve all tasks
GET /tasks/:id - Retrieve a single task by ID
POST /tasks - Create a new task
PUT /tasks/:id - Update an existing task
DELETE /tasks/:id - Delete a task
*/