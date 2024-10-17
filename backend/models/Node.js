import mongoose from 'mongoose';

const nodeSchema = new mongoose.Schema({
  // "operator" or "operand"
  type: { 
    type: String, 
    required: true 
  }, 
  // for operators
  left: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Node" 
  }, 
  // for operators
  right: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Node" 
  },
  // for operands like age, department etc. 
  value: { 
    type: String 
  },
  // To save the whole AST
  ast: {
    type: Object
  } 
});

const Node = mongoose.model('Node', nodeSchema);
export default Node;
