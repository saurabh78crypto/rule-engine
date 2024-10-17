import Node from '../models/Node.js';
import { createAST, combineRules as combineRulesUtil, evaluateRule as evaluateRuleUtil, modifyAST } from '../utils/ruleEngine.js';

const createRule = async (req, res) => {
  try {
    const { ruleString } = req.body;
    const ast = createAST(ruleString);

    // Create nodes for left and right operands
    const leftNode = new Node({
      type: 'operand',
      value: ast.left.value
    });
    const rightNode = new Node({
      type: 'operand',
      value: ast.right.value
    });

    // Save the left and right nodes to the database
    await leftNode.save();
    await rightNode.save();

     // Create a new operator node using the ObjectIds of the left and right nodes
     const newNode = new Node({
      type: 'operator',
      left: leftNode._id, // Reference to the left operand node
      right: rightNode._id, // Reference to the right operand node
      value: ast.value, // The operator (e.g., '>')
      ast, // Save the complete AST
    });

    await newNode.save(); 
    res.json(newNode);
  } catch (err) {
    console.error(err.message);
    res.status(400).json({ err: err.message });
  }
};


const getAllRules = async (req, res) => {
  try {
    const rules = await Node.find(); 
    res.json(rules);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: err.message });
  }
}

const combineRulesController = async (req, res) => {
  try {
    const { rules } = req.body;
    if (!rules || rules.length < 2) {
      return res.status(400).json({ message: 'At least two rules are required.' });
    }

    const combinedAST = combineRulesUtil(rules); 
    res.json(combinedAST);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

const evaluateRuleController = async (req, res) => {
  try {
    const { ast, data } = req.body;
    const result = evaluateRuleUtil(ast, data); 
    res.json({ eligible: result });
  } catch (err) {
    console.error(err.message);
    res.status(400).json({ error: error.message });
  }
};


const modifyRuleController = async (req, res) => {
  try {
    const { id } = req.params;
    const { modifications } = req.body;

    let ruleNode = await Node.findById(id);
    if (!ruleNode) {
      return res.status(404).json({ error: 'Rule not found' });
    }

    const { ast } = ruleNode;

    // Apply modifications to the AST
    const updatedAST = modifyAST(ast, modifications);

    await Node.findByIdAndUpdate(id, { ast: updatedAST });
    res.json(updatedAST);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: err.message });
  }
};

export { createRule, getAllRules, combineRulesController, evaluateRuleController, modifyRuleController };

