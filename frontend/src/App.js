import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import LoginForm from './components/LoginForm';
import UserPage from './components/UserPage'; 
import EditUserPage from './components/EditUserPage';
import ErrorPage  from './components/ErrorPage';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/usuarios" element={<UserPage />} />  
        <Route path="/editar/:id" element={<EditUserPage />} />
        <Route path="/error" element={<ErrorPage />} />  
      </Routes>
    </Router>

  );
}

export default App;
