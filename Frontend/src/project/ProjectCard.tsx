import type { Project } from '../project/Project'
import { useDispatch } from "react-redux";
import { type AppDispatch } from '../store/Index'
import { useNavigate } from 'react-router-dom';
import { deleteProject, updateProject } from "../hooks/ProjectSlice";
import { useState } from 'react';

interface Props {
  project: Project;
}

const ProjectCard = ({ project }: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleStatusChange = (newStatus: "active" | "completed") => {
    const updated = {
      ...project,
      status: newStatus,
    };
    dispatch(updateProject({
      ...updated,
      status: updated.status as "active" | "completed",
    }));
    setIsDropdownOpen(false);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (project._id) dispatch(deleteProject(project._id));
  };

  const handleCardClick = () => {
    navigate(`/projects/${project._id}`);
  };

  const handleDropdownToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div 
      onClick={handleCardClick} 
      className="bg-gradient-to-br from-white to-gray-50 p-6 shadow-lg rounded-2xl border border-gray-200 hover:shadow-xl transition-all duration-300 hover:transform hover:-translate-y-1 cursor-pointer group"
    >
      {/* Header Section */}
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-bold text-gray-800 group-hover:text-indigo-600 transition-colors">
          {project.title}
        </h3>
        
        {/* Status Dropdown */}
        <div className="relative">
          <button
            onClick={handleDropdownToggle}
            className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold transition-all ${
              project.status === "completed"
                ? "bg-green-100 text-green-700 hover:bg-green-200"
                : "bg-orange-100 text-orange-700 hover:bg-orange-200"
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-current"></span>
            {project.status}
            <svg 
              className={`w-4 h-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white rounded-xl shadow-lg border border-gray-200 z-10 overflow-hidden">
              <button
                onClick={() => handleStatusChange("active")}
                className={`w-full text-left px-4 py-3 flex items-center gap-3 hover:bg-gray-50 transition-colors ${
                  project.status === "active" ? "bg-indigo-50 text-indigo-600" : "text-gray-700"
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-orange-500"></span>
                <span className="font-medium">Active</span>
                {project.status === "active" && (
                  <svg className="w-4 h-4 ml-auto text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </button>
              
              <button
                onClick={() => handleStatusChange("completed")}
                className={`w-full text-left px-4 py-3 flex items-center gap-3 hover:bg-gray-50 transition-colors ${
                  project.status === "completed" ? "bg-indigo-50 text-indigo-600" : "text-gray-700"
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                <span className="font-medium">Completed</span>
                {project.status === "completed" && (
                  <svg className="w-4 h-4 ml-auto text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Description */}
      <p className="text-gray-600 text-sm mb-6 leading-relaxed line-clamp-3">
        {project.description}
      </p>

      {/* Footer Actions */}
      <div className="flex justify-between items-center pt-4 border-t border-gray-100">
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Last updated
        </div>
        
        <button
          onClick={handleDelete}
          className="flex items-center gap-2 text-sm bg-red-50 text-red-600 px-4 py-2 rounded-xl font-medium hover:bg-red-100 transition-all duration-200 hover:shadow-sm group/delete"
        >
          <svg className="w-4 h-4 group-hover/delete:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
          Delete
        </button>
      </div>
    </div>
  );
};

export default ProjectCard;