import React, { useState } from 'react';
import axios from 'axios';

const CombineRules = () => {
  const [inputValue, setInputValue] = useState(''); 

  const combineRules = async () => {
    // Split input into rules and trim whitespace
    const parsedRules = inputValue.split(',').map(rule => rule.trim()).filter(rule => rule);

    // Check if at least two valid rules are provided
    if (parsedRules.length < 2) {
      alert('Please enter at least two rules.');
      return;
    }

    try {
      await axios.post('http://localhost:5000/api/rules/combine_rules', { rules: parsedRules });
      alert('Rules combined successfully!');
      setInputValue(''); 
    } catch (error) {
      console.error(error);
      alert('Error combining rules.');
    }
  };

  return (
    <div className="mb-4 card">
      <div className="card-body">
        <h5 className="card-title">Combine Rules</h5>
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Enter rules separated by commas"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button className="btn btn-success" onClick={combineRules}>
          Combine Rules
        </button>
      </div>
    </div>
  );
};

export default CombineRules;
