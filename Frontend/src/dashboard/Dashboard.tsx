import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {type  AppDispatch,type RootState } from "../store/Index";
// import { fetchTasks } from "../redux/slices/taskSlice";
import { fetchTasks } from "../store/TaskSlice";
import type { Task } from "../tasks/Task";

const Dashboard = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { tasks, loading, error } = useSelector((state: RootState) => state.tasks);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  if (loading) return <p className="text-center mt-10 text-gray-600">Loading...</p>;
  if (error) return <p className="text-center mt-10 text-red-600">{error}</p>;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">🧾 Task Dashboard</h1>

      {tasks.length === 0 ? (
        <p className="text-gray-600 text-center mt-10">No tasks found</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tasks.map((task: Task) => (
            <div
              key={task._id}
              className="bg-white p-5 rounded-2xl shadow hover:shadow-lg transition-all border border-gray-100"
            >
              <h2 className="text-lg font-semibold text-gray-800">{task.title}</h2>
              <p className="text-gray-600 text-sm mt-1">{task.description || "No description"}</p>

              <div className="flex justify-between items-center mt-3">
                <span
                  className={`px-3 py-1 text-xs font-medium rounded-full ${
                    task.status === "done"
                      ? "bg-green-100 text-green-700"
                      : task.status === "in-progress"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {task.status}
                </span>
                <span className="text-xs text-gray-500">
                  📅 {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "No date"}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
