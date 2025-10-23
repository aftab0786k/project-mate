import React, { useState } from "react";

export type TaskShape = {
  _id?: string;
  id?: string;
  title?: string;
  description?: string;
  status?: "todo" | "in-progress" | "done" | string;
  dueDate?: string | Date;
  projectId?: string;
  createdAt?: string;
  updatedAt?: string;
};

type TaskProps = {
  task: TaskShape;
  onStatusChange?: (taskId: string, newStatus: "todo" | "in-progress" | "done") => void;
};

export function Task({ task, onStatusChange }: TaskProps) {
  if (!task) return null;

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'todo':
        return {
          color: 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200',
          icon: (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          ),
          label: 'To Do'
        };
      case 'in-progress':
        return {
          color: 'bg-blue-100 text-blue-700 border-blue-300 hover:bg-blue-200',
          icon: (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          ),
          label: 'In Progress'
        };
      case 'done':
        return {
          color: 'bg-green-100 text-green-700 border-green-300 hover:bg-green-200',
          icon: (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          ),
          label: 'Done'
        };
      default:
        return {
          color: 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200',
          icon: (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          ),
          label: status || 'Unknown'
        };
    }
  };

  const handleStatusClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleStatusChange = (newStatus: "todo" | "in-progress" | "done", e: React.MouseEvent) => {
    e.stopPropagation();
    if (onStatusChange && task._id) {
      onStatusChange(task._id, newStatus);
    }
    setIsDropdownOpen(false);
  };

  const statusConfig = getStatusConfig(task.status || 'unknown');
  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date();

  return (
    <div className="group bg-gradient-to-br from-white to-gray-50 p-6 rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 hover:transform hover:-translate-y-1 cursor-pointer relative">
      {/* Header Section */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1 min-w-0">
          <h3 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors line-clamp-2">
            {task.title ?? "Untitled Task"}
          </h3>
        </div>
        
        {/* Status Dropdown */}
        <div className="relative ml-4 flex-shrink-0">
          <button
            onClick={handleStatusClick}
            className={`flex items-center gap-2 px-3 py-2 rounded-full text-sm font-semibold border transition-all duration-200 ${statusConfig.color} ${
              isDropdownOpen ? 'ring-2 ring-blue-200 ring-offset-2' : ''
            }`}
          >
            {statusConfig.icon}
            <span className="hidden sm:inline">{statusConfig.label}</span>
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
            <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200 z-10 overflow-hidden">
              <div className="p-2">
                <div className="text-xs font-semibold text-gray-500 px-3 py-2">Change Status</div>
                
                {/* To Do Option */}
                <button
                  onClick={(e) => handleStatusChange('todo', e)}
                  className={`w-full text-left px-4 py-3 flex items-center gap-3 hover:bg-gray-50 transition-colors rounded-lg ${
                    task.status === 'todo' ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-gray-500"></span>
                  <span className="font-medium">To Do</span>
                  {task.status === 'todo' && (
                    <svg className="w-4 h-4 ml-auto text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </button>
                
                {/* In Progress Option */}
                <button
                  onClick={(e) => handleStatusChange('in-progress', e)}
                  className={`w-full text-left px-4 py-3 flex items-center gap-3 hover:bg-gray-50 transition-colors rounded-lg ${
                    task.status === 'in-progress' ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                  <span className="font-medium">In Progress</span>
                  {task.status === 'in-progress' && (
                    <svg className="w-4 h-4 ml-auto text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </button>
                
                {/* Done Option */}
                <button
                  onClick={(e) => handleStatusChange('done', e)}
                  className={`w-full text-left px-4 py-3 flex items-center gap-3 hover:bg-gray-50 transition-colors rounded-lg ${
                    task.status === 'done' ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-green-500"></span>
                  <span className="font-medium">Done</span>
                  {task.status === 'done' && (
                    <svg className="w-4 h-4 ml-auto text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Description */}
      {task.description ? (
        <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
          {task.description}
        </p>
      ) : (
        <p className="text-gray-400 text-sm italic mb-4">No description provided</p>
      )}

      {/* Footer - Metadata */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="flex items-center gap-4 text-sm text-gray-500">
          {/* Due Date */}
          {task.dueDate && (
            <div className={`flex items-center gap-2 ${isOverdue ? 'text-red-500' : ''}`}>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className={isOverdue ? 'font-semibold' : ''}>
                {new Date(task.dueDate).toLocaleDateString()}
                {isOverdue && ' (Overdue)'}
              </span>
            </div>
          )}

          {/* Created Date */}
          {task.createdAt && (
            <div className="hidden sm:flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Created: {new Date(task.createdAt).toLocaleDateString()}</span>
            </div>
          )}
        </div>

        {/* Action Indicators */}
        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
          <span className="text-xs text-blue-600 font-medium">Click to view details</span>
        </div>
      </div>

      {/* Priority Indicator (Visual) */}
      {isOverdue && (
        <div className="absolute top-4 left-4">
          <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" title="Overdue"></div>
        </div>
      )}
    </div>
  );
}

export type Task = TaskShape;

export type TaskState = {
  tasks: Task[];
  loading?: boolean;
  error?: string | null;
};