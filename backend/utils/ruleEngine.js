function isValidAttribute(attribute) {
  const validAttributes = ['age', 'salary', 'department', 'experience', 'sales'];
  return validAttributes.includes(attribute);
}

function isValidValue(value) {
  return !isNaN(value) || (value.startsWith("'") && value.endsWith("'") && value.length > 2);
}

function isComparisonOperator(token) {
  return ['>', '<', '>=', '<=', '=', '!='].includes(token);
}

function createAST(ruleString) {
  // Tokenize the input by matching attributes, values, operators, and parentheses
  const tokens = ruleString.match(/(\w+|'[^']*'|\d+|[()<>]=?|AND|OR)/g).filter(token => token.trim() !== '');

  // Stack to handle sub-expressions and build the AST
  const stack = [];
  let current = { type: 'expression', left: null, right: null, operator: null };
  let expectingOperand = true; // Start expecting an operand (attribute or value)

  for (let token of tokens) {
    token = token.trim();

    if (token === '(') {
      // Start a new subexpression, save the current context
      stack.push(current);
      current = { type: 'expression', left: null, right: null, operator: null };
      expectingOperand = true;
    } else if (token === ')') {
      // Close the current subexpression, and pop back to the parent expression
      if (!stack.length) {
        throw new Error('Unmatched closing parenthesis.');
      }
      const parent = stack.pop();
      if (!parent.left) {
        parent.left = current;
      } else if (!parent.right) {
        parent.right = current;
      }
      current = parent;
      expectingOperand = false; // After closing, expect an operator
    } else if (token === 'AND' || token === 'OR') {
      // Process logical operators
      if (expectingOperand) {
        throw new Error(`Unexpected operator '${token}'. Expected operand.`);
      }
      // If there is already a logical operator in the current expression, we need to wrap
      // it in a new parent node and continue building the tree
      const newExpr = { type: 'expression', left: current, operator: token, right: null };
      current = newExpr;
      expectingOperand = true; // Now expect an operand after the operator
    } else if (isComparisonOperator(token)) {
      // Process comparison operator (>, <, =, etc.)
      if (!current.left) {
        throw new Error(`Unexpected comparison operator '${token}'.`);
      }
      current.operator = token;
    } else if (isValidAttribute(token)) {
      // Process attribute (LHS)
      if (!expectingOperand) {
        throw new Error(`Unexpected attribute '${token}'. Expected operator.`);
      }
      current.left = { type: 'attribute', value: token };
      expectingOperand = false;
    } else if (isValidValue(token)) {
      // Strip the surrounding quotes for proper comparison
      const strippedValue = token.startsWith("'") ? token.slice(1, -1) : token;

      // Process value (RHS)
      if (!current.operator) {
        throw new Error(`Unexpected value '${token}'. Expected operator.`);
      }
      current.right = { type: 'value', value: strippedValue };
      expectingOperand = false; // After value, expect an operator
    } else {
      throw new Error(`Invalid token '${token}'.`);
    }
  }

  // If there are still items in the stack, ensure that expressions are balanced
  while (stack.length) {
    const parent = stack.pop();
    if (!parent.left) {
      parent.left = current;
    } else if (!parent.right) {
      parent.right = current;
    }
    current = parent;
  }

  // Validate the final AST structure
  if (!current.left || !current.right || !current.operator) {
    throw new Error('Invalid rule format. Rule must have a complete expression.');
  }

  return current; 
}



function combineRules(rules) {
  try {
    if (rules.length === 0) {
      throw new Error("No rules provided.");
    }

    let combinedAST = createAST(rules[0]);

    for (let i = 1; i < rules.length; i++) {
      const nextAST = createAST(rules[i]);

      // Create a new AST node that combines the current combinedAST with the next rule using 'AND'
      combinedAST = {
        type: 'operator',
        left: combinedAST,
        right: nextAST,
        value: 'AND'
      };
    }

    return combinedAST;
  } catch (error) {
    console.error('Error in combineRulesUtil:', error);
    throw error;
  }
}

function evaluateRule(ast, data) {
  if (ast.type === 'operator') {
    let leftValue = evaluateRule(ast.left, data);
    let rightValue = evaluateRule(ast.right, data);
    if (ast.value === 'AND') {
      return leftValue && rightValue;
    } else if (ast.value === 'OR') {
      return leftValue || rightValue;
    }
  } else if (ast.type === 'operand') {
    let [key, operator, value] = ast.value.split(' ');
    value = value.replace(/['"]+/g, '');
    if (operator === '>') return data[key] > parseInt(value);
    if (operator === '<') return data[key] < parseInt(value);
    if (operator === '=') return data[key] === value;
  }
  return false;
}


function modifyAST(ast, modifications) {
  if (!ast) {
    throw new Error('AST is undefined.');
  }

  if (modifications.operator) {
    ast.value = modifications.operator; // Modify operator
  }

  if (modifications.newLeft) {
    ast.left = createAST(modifications.newLeft); // Modify the left operand subtree
  }

  if (modifications.newRight) {
    ast.right = createAST(modifications.newRight); // Modify the right operand subtree
  }

  return ast;
}

export { createAST, combineRules, evaluateRule, modifyAST };
