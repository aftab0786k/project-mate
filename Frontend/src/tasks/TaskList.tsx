import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type {  AppDispatch, RootState } from "../store/Index"; // <-- Make sure your store exports these types
import { Task } from "./Task";
import { fetchTasks } from "../store/TaskSlice";

// Define the expected props
interface TaskListProps {
  projectId?: string;
}

// Define the Task type used in your app
export interface ITask {
  id?: string;
  _id?: string;
  title: string;
  description?: string;
  status: "todo" | "in-progress" | "done";
}

// Component
const TaskList: React.FC<TaskListProps> = ({ projectId }) => {
  const dispatch = useDispatch<AppDispatch>();

  const { tasks = [], loading = false, error = null } = useSelector(
    (state: RootState) => state.tasks ?? { tasks: [], loading: false, error: null }
  );

  useEffect(() => {
    dispatch(fetchTasks(projectId));
  }, [dispatch, projectId]);

  // Loading State
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mb-4"></div>
        <p className="text-gray-600 text-lg font-medium">Loading tasks...</p>
        <p className="text-gray-400 text-sm mt-2">Please wait while we fetch your tasks</p>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center">
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
            <svg
              className="w-8 h-8 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>
        <h3 className="text-xl font-bold text-red-800 mb-2">Unable to Load Tasks</h3>
        <p className="text-red-600 mb-4">Error: {String(error)}</p>
        <button
          onClick={() => dispatch(fetchTasks(projectId))}
          className="bg-red-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-red-700 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  // Empty State
  if (!tasks || tasks.length === 0) {
    return (
      <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-12 text-center border-2 border-dashed border-gray-300">
        <div className="flex justify-center mb-6">
          <div className="w-24 h-24 bg-white rounded-full shadow-lg flex items-center justify-center">
            <svg
              className="w-12 h-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
          </div>
        </div>
        <h3 className="text-2xl font-bold text-gray-700 mb-3">No Tasks Found</h3>
        <p className="text-gray-500 mb-6 max-w-md mx-auto">
          {projectId
            ? "This project doesn't have any tasks yet. Create the first task to get started!"
            : "You don't have any tasks yet. Create your first task to get started!"}
        </p>
        <div className="flex items-center justify-center gap-2 text-gray-400">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 10V3L4 14h7v7l9-11h-7z"
            />
          </svg>
          <span className="text-sm">Get started by creating a new task</span>
        </div>
      </div>
    );
  }

  // Task Statistics
  const taskStats = {
    total: tasks.length,
    todo: tasks.filter((task:Task) => task.status === "todo").length,
    inProgress: tasks.filter((task:Task) => task.status === "in-progress").length,
    done: tasks.filter((task:Task) => task.status === "done").length,
  };

  return (
    <div className="space-y-6">
      {/* Task Statistics */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <svg
            className="w-5 h-5 text-blue-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
            />
          </svg>
          Task Overview
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-gray-50 rounded-xl">
            <div className="text-2xl font-bold text-gray-800">{taskStats.total}</div>
            <div className="text-sm text-gray-600">Total Tasks</div>
          </div>
          <div className="text-center p-4 bg-blue-50 rounded-xl">
            <div className="text-2xl font-bold text-blue-600">{taskStats.todo}</div>
            <div className="text-sm text-blue-600">To Do</div>
          </div>
          <div className="text-center p-4 bg-orange-50 rounded-xl">
            <div className="text-2xl font-bold text-orange-600">{taskStats.inProgress}</div>
            <div className="text-sm text-orange-600">In Progress</div>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-xl">
            <div className="text-2xl font-bold text-green-600">{taskStats.done}</div>
            <div className="text-sm text-green-600">Completed</div>
          </div>
        </div>
      </div>

      {/* Tasks Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tasks.map((task:Task) => (
          <Task key={task._id ?? task.id} task={task} />
        ))}
      </div>

      {/* Tasks Summary */}
      <div className="bg-gray-50 rounded-xl p-4 text-center">
        <p className="text-gray-600 text-sm">
          Showing <span className="font-semibold">{tasks.length}</span> task
          {tasks.length !== 1 ? "s" : ""}
          {projectId && <span> for this project</span>}
        </p>
      </div>
    </div>
  );
};

export default TaskList;
