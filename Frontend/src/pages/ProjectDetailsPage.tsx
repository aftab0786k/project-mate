import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {type RootState } from '../store/Index';
import TaskList from '../tasks/TaskList';
import TaskForm from '../store/TaskForm';
import { useState } from 'react';

const ProjectDetailsPage = () => {
  const { projectId } = useParams();
  const project = useSelector((state: RootState) =>
    state.project.projects.find((p) => p._id === projectId)
  );

  const [showForm, setShowForm] = useState(false);

  if (!project) {
    return <p className="text-center text-gray-500">Project not found.</p>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold mb-2 text-gray-800">{project.title}</h1>
      <p className="text-gray-700 mb-4">{project.description}</p>
      <span className={`inline-block text-sm px-3 py-1 rounded-full ${
        project.status === 'completed'
          ? 'bg-green-100 text-green-700'
          : 'bg-yellow-100 text-yellow-700'
      }`}>
        {project.status}
      </span>

      <div className="flex justify-end my-6">
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          + Add Task
        </button>
      </div>

      {/* Modal for task form */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Create Task</h2>
              <button onClick={() => setShowForm(false)} className="text-gray-500 hover:text-gray-700">
                ✕
              </button>
            </div>
            <TaskForm
              projectId={projectId}
              onSuccess={() => setShowForm(false)}
            />
          </div>
        </div>
      )}

      <TaskList projectId={projectId} />
    </div>
  );
};

export default ProjectDetailsPage;
