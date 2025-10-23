import React, { useState } from 'react';
import { useAppDispatch } from '../hooks/Redux';
import { createTask, updateTask } from '../store/TaskSlice';
import type { Task } from '../tasks/Task';

interface TaskFormProps {
  projectId?: string;
  existingTask?: Task;
  onSuccess?: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ projectId, existingTask, onSuccess }) => {
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState({
    title: existingTask?.title || '',
    description: existingTask?.description || '',
    status: existingTask?.status || 'todo',
    dueDate: existingTask?.dueDate || new Date().toISOString().split('T')[0],
  });
  const [isStatusOpen, setIsStatusOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const taskData = {
      ...formData,
      projectId,
    };

    try {
      if (existingTask) {
        await dispatch(updateTask({ ...existingTask, ...formData })).unwrap();
      } else {
        await dispatch(createTask(taskData)).unwrap();
      }
      
      setFormData({
        title: '',
        description: '',
        status: 'todo',
        dueDate: new Date().toISOString().split('T')[0],
      });
      
      onSuccess?.();
    } catch (error) {
      console.error('Failed to save task:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleStatusChange = (status: 'todo' | 'in-progress' | 'done') => {
    setFormData(prev => ({
      ...prev,
      status,
    }));
    setIsStatusOpen(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'todo':
        return { bg: 'bg-gray-100', text: 'text-gray-700', dot: 'bg-gray-400' };
      case 'in-progress':
        return { bg: 'bg-blue-100', text: 'text-blue-700', dot: 'bg-blue-500' };
      case 'done':
        return { bg: 'bg-green-100', text: 'text-green-700', dot: 'bg-green-500' };
      default:
        return { bg: 'bg-gray-100', text: 'text-gray-700', dot: 'bg-gray-400' };
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'todo': return 'To Do';
      case 'in-progress': return 'In Progress';
      case 'done': return 'Done';
      default: return status;
    }
  };

  const statusColor = getStatusColor(formData.status);

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Title Field */}
      <div className="space-y-2">
        <label htmlFor="title" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
          <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
          Task Title *
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          placeholder="Enter task title..."
          className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition-all duration-200 bg-white shadow-sm"
        />
      </div>

      {/* Description Field */}
      <div className="space-y-2">
        <label htmlFor="description" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
          <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={4}
          placeholder="Describe the task details..."
          className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition-all duration-200 bg-white shadow-sm resize-vertical"
        />
      </div>

      {/* Status and Due Date */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Status Dropdown */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
            <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Status
          </label>
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsStatusOpen(!isStatusOpen)}
              className={`w-full rounded-xl border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition-all duration-200 bg-white shadow-sm flex items-center justify-between ${statusColor.bg} ${statusColor.text}`}
            >
              <div className="flex items-center gap-3">
                <span className={`w-2 h-2 rounded-full ${statusColor.dot}`}></span>
                <span className="font-medium">{getStatusLabel(formData.status)}</span>
              </div>
              <svg 
                className={`w-5 h-5 transition-transform ${isStatusOpen ? 'rotate-180' : ''}`}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Dropdown Menu */}
            {isStatusOpen && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-lg border border-gray-200 z-10 overflow-hidden">
                <button
                  type="button"
                  onClick={() => handleStatusChange('todo')}
                  className={`w-full text-left px-4 py-3 flex items-center gap-3 hover:bg-gray-50 transition-colors ${
                    formData.status === 'todo' ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-gray-400"></span>
                  <span className="font-medium">To Do</span>
                  {formData.status === 'todo' && (
                    <svg className="w-4 h-4 ml-auto text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </button>
                
                <button
                  type="button"
                  onClick={() => handleStatusChange('in-progress')}
                  className={`w-full text-left px-4 py-3 flex items-center gap-3 hover:bg-gray-50 transition-colors ${
                    formData.status === 'in-progress' ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                  <span className="font-medium">In Progress</span>
                  {formData.status === 'in-progress' && (
                    <svg className="w-4 h-4 ml-auto text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </button>
                
                <button
                  type="button"
                  onClick={() => handleStatusChange('done')}
                  className={`w-full text-left px-4 py-3 flex items-center gap-3 hover:bg-gray-50 transition-colors ${
                    formData.status === 'done' ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-green-500"></span>
                  <span className="font-medium">Done</span>
                  {formData.status === 'done' && (
                    <svg className="w-4 h-4 ml-auto text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Due Date Field */}
        <div className="space-y-2">
          <label htmlFor="dueDate" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
            <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Due Date *
          </label>
          <input
            type="date"
            id="dueDate"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
            required
            className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition-all duration-200 bg-white shadow-sm"
          />
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 hover:from-blue-700 hover:to-purple-700"
      >
        <span className="flex items-center justify-center gap-2">
          {existingTask ? (
            <>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Update Task
            </>
          ) : (
            <>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Create Task
            </>
          )}
        </span>
      </button>
    </form>
  );
};

export default TaskForm;