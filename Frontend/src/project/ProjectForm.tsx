import { useState } from "react";
import { useDispatch } from "react-redux";
import { type AppDispatch } from '../store/Index';
import { createProject } from "../hooks/ProjectSlice";

const ProjectForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<"active" | "completed">("active");
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(createProject({ title, description, status }));
    setTitle("");
    setDescription("");
    setStatus("active");
    setIsFormOpen(false); // Close form after submission
  };

  const handleCancel = () => {
    setTitle("");
    setDescription("");
    setStatus("active");
    setIsFormOpen(false);
  };

  return (
    <div className=" mx-auto p-6">
      {/* Create Project Button - Right Aligned */}
      {!isFormOpen && (
        <div className="flex justify-end mb-8">
          <button
            onClick={() => setIsFormOpen(true)}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 hover:from-indigo-700 hover:to-purple-700"
          >
            <span className="flex items-center justify-center gap-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Create New Project
            </span>
          </button>
        </div>
      )}

      {/* Project Form */}
      {isFormOpen && (
        <div className="bg-gradient-to-br from-white to-gray-50 shadow-2xl rounded-2xl p-8 border border-gray-200 transform transition-all duration-300 animate-fade-in">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Create New Project
            </h2>
            <button
              onClick={handleCancel}
              className="text-gray-500 hover:text-gray-700 transition-colors duration-200 p-2 hover:bg-gray-100 rounded-full"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Project Title</label>
              <input
                type="text"
                placeholder="Enter project title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full border border-gray-300 p-4 rounded-xl focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 transition-all duration-200 bg-white shadow-sm"
                required
                autoFocus
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Description</label>
              <textarea
                placeholder="Describe your project..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                className="w-full border border-gray-300 p-4 rounded-xl focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 transition-all duration-200 bg-white shadow-sm resize-vertical"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as "active" | "completed")}
                className="w-full border border-gray-300 p-4 rounded-xl focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 transition-all duration-200 bg-white shadow-sm"
              >
                <option value="active">Active</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={handleCancel}
                className="flex-1 bg-gray-100 text-gray-700 py-4 px-6 rounded-xl font-medium hover:bg-gray-200 transition-all duration-200 border border-gray-200 shadow-sm"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 px-6 rounded-xl font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 hover:from-indigo-700 hover:to-purple-700"
              >
                Create Project
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ProjectForm;