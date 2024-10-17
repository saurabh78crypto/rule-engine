import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CreateRule from './components/CreateRule';
import CombineRules from './components/CombineRule';
import EvaluateRule from './components/EvaluateRule';
import ModifyRule from './components/ModifyRule';
import Navbar from './components/Navbar'; 

const App = () => {
  return (
    <Router>
      <div className="container mt-5">
        <h1 className="text-center mb-4">Rule Engine</h1>
        
        <Navbar /> 

        <Routes>
          <Route path="/" element={<CreateRule />} />
          <Route path="/combine" element={<CombineRules />} />
          <Route path="/evaluate" element={<EvaluateRule />} />
          <Route path="/modify" element={<ModifyRule />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
