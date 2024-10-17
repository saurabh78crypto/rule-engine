import React, { useState } from 'react';
import axios from 'axios';

const EvaluateRule = () => {
  const [evaluationData, setEvaluationData] = useState('');

  const evaluateRule = async () => {
    try {
      const parsedData = JSON.parse(evaluationData); // Parse the JSON data from the textarea

      // Prepare the payload for the API request
      const payload = {
        ast: parsedData.ast, 
        data: parsedData.data 
      };

      const response = await axios.post('http://localhost:5000/api/rules/evaluate_rule', payload);
      alert(`Evaluation Result: ${response.data.eligible}`);
    } catch (error) {
      console.error(error);
      alert('Error evaluating rule.');
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setEvaluationData(value); 
  };

  return (
    <div className="mb-4 card">
      <div className="card-body">
        <h5 className="card-title">Evaluate Rule</h5>
        <textarea
          className="form-control mb-2"
          placeholder="Enter evaluation data in JSON format"
          value={evaluationData}
          onChange={handleInputChange}
          rows="6" 
        />
        <button className="btn btn-info" onClick={evaluateRule}>
          Evaluate Rule
        </button>
      </div>
    </div>
  );
};

export default EvaluateRule;
