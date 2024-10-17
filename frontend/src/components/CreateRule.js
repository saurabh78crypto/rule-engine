import React, { useState } from 'react';
import axios from 'axios';

const CreateRule = () => {
  const [ruleString, setRuleString] = useState('');

  const createRule = async () => {
    try {
      await axios.post('http://localhost:5000/api/rules/create_rule', { ruleString });
      alert('Rule created successfully!');
      setRuleString('');
    } catch (error) {
      console.error(error);
      alert('Error creating rule.');
    }
  };

  return (
    <div className="mb-4 card">
      <div className="card-body">
        <h5 className="card-title">Create Rule</h5>
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Enter rule string (e.g., age > 30)"
          value={ruleString}
          onChange={(e) => setRuleString(e.target.value)}
        />
        <button className="btn btn-primary" onClick={createRule}>
          Create Rule
        </button>
      </div>
    </div>
  );
};

export default CreateRule;
