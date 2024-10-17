import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const ModifyRule = () => {
  const [rules, setRules] = useState([]);
  const [selectedRule, setSelectedRule] = useState('');
  const [modification, setModification] = useState({ operator: '', newLeft: '', newRight: '' });

  // Fetch rules on component mount
  useEffect(() => {
    const fetchRules = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/rules');
        setRules(response.data);
      } catch (error) {
        console.error('Error fetching rules:', error);
      }
    };

    fetchRules();
  }, []);

  // Handle rule selection
  const handleRuleSelect = useCallback((event) => {
    const ruleId = event.target.value;
    const rule = rules.find((rule) => rule._id === ruleId);
    setSelectedRule(ruleId);

    if (rule && rule.ast) {
      const getValue = (node) => {
        if (!node) return '';
        if (node.type === 'operand') return node.value;
        else if (node.type === 'operator') {
          const leftValue = getValue(node.left);
          const rightValue = getValue(node.right);
          return `${leftValue} ${node.value} ${rightValue}`;
        }
        return '';
      };

      setModification({
        operator: rule.ast.value || '',
        newLeft: getValue(rule.ast.left) || '',
        newRight: getValue(rule.ast.right) || '',
      });
    } else {
      setModification({ operator: '', newLeft: '', newRight: '' });
    }
  }, [rules]);

  // Modify rule function
  const modifyRule = async () => {
    try {
      await axios.put(`http://localhost:5000/api/rules/modify_rule/${selectedRule}`, { modifications: modification });
      alert('Rule modified successfully!');

      const updatedRule = { ...rules.find(rule => rule._id === selectedRule), ...modification };
      setRules(rules.map(rule => (rule._id === selectedRule ? updatedRule : rule)));
      setSelectedRule(''); 
      setModification({ operator: '', newLeft: '', newRight: '' }); 
    } catch (error) {
      console.error(error);
      alert('Error modifying rule.');
    }
  };

  // Cancel modification
  const cancelModification = () => {
    setSelectedRule(''); 
    setModification({ operator: '', newLeft: '', newRight: '' }); 
  };

  return (
    <div className="mb-4 card">
      <div className="card-body">
        <h5 className="card-title">Modify Rule</h5>
        
        <select className="form-control mb-2" onChange={handleRuleSelect} value={selectedRule}>
          <option value="">Select a rule</option>
          {rules.map((rule) => (
            <option key={rule._id} value={rule._id}>
              {rule.value} (ID: {rule._id})
            </option>
          ))}
        </select>

        {selectedRule && (
          <div>
            <div className="mb-2">
              <label className="form-label">Operator</label>
              <input
                type="text"
                className="form-control"
                value={modification.operator}
                onChange={(e) => setModification({ ...modification, operator: e.target.value })}
              />
            </div>
            <div className="mb-2">
              <label className="form-label">New Left Operand</label>
              <input
                type="text"
                className="form-control"
                value={modification.newLeft}
                onChange={(e) => setModification({ ...modification, newLeft: e.target.value })}
              />
            </div>
            <div className="mb-2">
              <label className="form-label">New Right Operand</label>
              <input
                type="text"
                className="form-control"
                value={modification.newRight}
                onChange={(e) => setModification({ ...modification, newRight: e.target.value })}
              />
            </div>
            <button className="btn btn-primary" onClick={modifyRule}>
              Save Changes
            </button>
            <button className="btn btn-secondary" onClick={cancelModification}>
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ModifyRule;
