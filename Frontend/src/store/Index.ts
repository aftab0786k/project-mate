import { configureStore } from '@reduxjs/toolkit';
import taskReducer from './TaskSlice';
import projectReducer from "../hooks/ProjectSlice";

export const store = configureStore({
  reducer: {
    tasks: taskReducer,
    project:projectReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;