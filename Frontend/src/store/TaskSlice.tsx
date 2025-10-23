import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import type { Task, TaskState } from "../tasks/Task";

const API_URL = "http://localhost:3001/api/task";

// helper to read token (adjust if you store token elsewhere)
const getAuthHeaders = () => {
  const token = localStorage.getItem("token"); // ensure login saved token
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (token) headers["Authorization"] = `Bearer ${token}`;
  // debug
  console.log("getAuthHeaders ->", { tokenPresent: !!token, tokenPreview: token ? token.slice(0,10) + "..." : null });
  return headers;
};

// 🔹 Fetch all tasks or by projectId
export const fetchTasks = createAsyncThunk<Task[], string | undefined>(
  "tasks/fetchTasks",
  async (projectId, { rejectWithValue }) => {
    // use backend path param when asking for tasks of a project
    const url = projectId ? `${API_URL}/project/${projectId}` : API_URL;
    // console.log(projectId)
    console.log("fetchTasks -> requesting", url);
    try {
      const response = await fetch(url, {
         headers: getAuthHeaders() });
      console.log("fetchTasks -> status", response);
      if (!response.ok) {
        const errText = await response.text().catch(() => "");
        console.error("fetchTasks -> failed:", response.status, errText);

        // if unauthorized, clear local token so subsequent calls fail fast
        if (response.status === 401 || response.status === 403) {
          localStorage.removeItem("token");
          console.warn("fetchTasks -> removed invalid token from localStorage");
        }

        return rejectWithValue(errText || `Failed to fetch tasks (${response.status})`);
      }
      const json = await response.json();
      console.log("fetchTasks -> received", Array.isArray(json) ? json.length : typeof json, json);
      return json;
    } catch (err: any) {
      console.error("fetchTasks -> network error:", err.message || err);
      return rejectWithValue(err.message || "Network error");
    }
  }
);

// 🔹 Create a new task
export const createTask = createAsyncThunk<Task, Omit<Task, "_id" | "createdAt" | "updatedAt">>(
  "tasks/createTask",
  async (task) => {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(task),

    });
      console.log(task)

    if (!response.ok) {
      const errText = await response.text().catch(() => "");
      throw new Error(errText || `Failed to create task (${response.status})`);
    }
    return response.json();
  }
);

// 🔹 Update existing task
export const updateTask = createAsyncThunk<Task, Task>(
  "tasks/updateTask",
  async (task) => {
    const response = await fetch(`${API_URL}/${task._id}`, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify(task),
    });
    if (!response.ok) {
      const errText = await response.text().catch(() => "");
      throw new Error(errText || `Failed to update task (${response.status})`);
    }
    return response.json();
  }
);

// 🔹 Delete task
export const deleteTask = createAsyncThunk<string, string>(
  "tasks/deleteTask",
  async (taskId) => {
    const response = await fetch(`${API_URL}/${taskId}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });
    if (!response.ok) {
      const errText = await response.text().catch(() => "");
      throw new Error(errText || `Failed to delete task (${response.status})`);
    }
    return taskId;
  }
);

// 🔹 Initial State
const initialState: TaskState = {
  tasks:[],
  loading: false,
  error: null,
};

// 🔹 Slice
const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action: PayloadAction<Task[]>) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch tasks";
      })

      .addCase(createTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTask.fulfilled, (state, action: PayloadAction<Task>) => {
        state.loading = false;
        state.tasks.push(action.payload);
      })
      .addCase(createTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to create task";
      })

      .addCase(updateTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTask.fulfilled, (state, action: PayloadAction<Task>) => {
        state.loading = false;
        const index = state.tasks.findIndex((t:Task) => t._id === action.payload._id);
        if (index !== -1) state.tasks[index] = action.payload;
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to update task";
      })

      .addCase(deleteTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTask.fulfilled, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.tasks = state.tasks.filter((t:Task) => t._id !== action.payload);
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to delete task";
      });
  },
});

export const { clearError } = taskSlice.actions;
export default taskSlice.reducer;
