import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import type { Project } from "../project/Project";
import Api from "../ApiEnd";
// Use the PROJECT_URL from ApiEnd.ts  
const API_URL = Api.PROJECT_URL;
// const API_URL = "http://localhost:3001/api/projects";

export interface ProjectState {
  projects: Project[];
  loading: boolean;
  error: string | null;
}

const initialState: ProjectState = {
  projects: [],
  loading: false,
  error: null,
};

const getAuthHeaders = (): Record<string, string> => {
  const token = localStorage.getItem("token");
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (token) headers["Authorization"] = `Bearer ${token}`;
  return headers;
};

// 🔹 Fetch All Projects
export const fetchProjects = createAsyncThunk<Project[]>(
  "projects/fetchProjects",
  async () => {
    const response = await fetch(API_URL, { headers: getAuthHeaders() });
    if (!response.ok) throw new Error("Failed to fetch projects");
    return response.json();
  }
);

// 🔹 Create Project
export const createProject = createAsyncThunk<Project, Omit<Project, "_id">>(
  "projects/createProject",
  async (newProject) => {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(newProject),
    });
    if (!response.ok) throw new Error("Failed to create project");
    return response.json();
  }
);

// 🔹 Update Project
// export const updateProject = createAsyncThunk<Project, Project>(
//   "projects/updateProject",
//   async (project) => {
//     const response = await fetch(`${API_URL}/${project._id}`, {
//       method: "PUT",
//       headers: getAuthHeaders(),
//       body: JSON.stringify(project),
//     });
//     if (!response.ok) throw new Error("Failed to update project");
//     return response.json();
//   }
// );
export const updateProject = createAsyncThunk<Project, Project>(
  "projects/updateProject",
  async (project) => {
    const response = await fetch(`${API_URL}/${project._id}`, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify(project),
    });
    if (!response.ok) throw new Error("Failed to update project");
    return response.json();
  }
);


// 🔹 Delete Project
export const deleteProject = createAsyncThunk<string, string>(
  "projects/deleteProject",
  async (id) => {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error("Failed to delete project");
    return id;
  }
);

const projectSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProjects.fulfilled, (state, action: PayloadAction<Project[]>) => {
        state.loading = false;
        state.projects = action.payload;
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error loading projects";
      })
      .addCase(createProject.fulfilled, (state, action: PayloadAction<Project>) => {
        state.projects.push(action.payload);
      })
      .addCase(updateProject.fulfilled, (state, action: PayloadAction<Project>) => {
        const index = state.projects.findIndex((p) => p._id === action.payload._id);
        if (index !== -1) state.projects[index] = action.payload;
      })
      .addCase(deleteProject.fulfilled, (state, action: PayloadAction<string>) => {
        state.projects = state.projects.filter((p) => p._id !== action.payload);
      });
  },
});

export default projectSlice.reducer;
