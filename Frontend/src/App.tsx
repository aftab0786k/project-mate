import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/Index';
  
import Signup from './pages/Signup';

import Index from './pages/Index';
import Layout from './components/Layout';
import Tasks from './pages/Tasks'; // Import Tasks component

import Login from './pages/Login';
import ProjectsPage from './pages/ProjectPage';
import ProjectDetailsPage from './pages/ProjectDetailsPage';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Routes>
            {/* Default route redirects to home */}
            <Route path="/home" element={<Navigate to="/Home" replace />} />
            
            {/* Home page route */}
            <Route element={<Layout />}>
             <Route path="/" element={<Index />} />
       
              <Route path="/projectpage" element={<ProjectsPage/>} />
              <Route path="/projects/:projectId" element={<ProjectDetailsPage />} />
             
              <Route path="/tasks" element={<Tasks />} /> {/* Add Tasks route */}
              
              {/* Signup page route */}
              <Route path="/signup" element={<Signup/>} />
              
              {/* Login page route */}
              <Route path="/login" element={<Login />} />
                  {/* <Route path="/dashboard" element={<Dashboard />} /> */}
            </Route>
            
            {/* 404 fallback route */}
            <Route path="*" element={
              <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                  <h1 className="text-4xl font-bold text-gray-800 mb-4">404 - Page Not Found</h1>
                  <p className="text-gray-600 mb-4">The page you're looking for doesn't exist.</p>
                  <a 
                    href="/home" 
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Go Home
                  </a>
                </div>
              </div>
            } />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
};

export default App;