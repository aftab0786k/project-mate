import Task from "../modal/taskModel.js";

// 🟢 Create a new task
export const createTask = async (req, res) => {
  try {
    const { title, description, status, dueDate, projectId } = req.body;
    console.log(req.body);
    const newTask = new Task({ title, description, status, dueDate, projectId });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🔵 Get all tasks for a specific project
export const getTasksByProject = async (req, res) => {
  try {
    const { projectId } = req.params;
    const tasks = await Task.find({ projectId });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🟠 Update a task
export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, status, dueDate } = req.body;
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { title, description, status, dueDate },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🔴 Delete a task
export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTask = await Task.findByIdAndDelete(id);

    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🟣 Filter tasks by status
export const filterTasksByStatus = async (req, res) => {
  try {
    const { status } = req.query;
    const tasks = await Task.find({ status });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
