import express from 'express';
import { createRule, combineRulesController, evaluateRuleController, modifyRuleController, getAllRules } from '../controllers/ruleController.js';

const router = express.Router();

// Route for creating a rule
router.post('/create_rule', createRule);

// Route for fetching all rules
router.get('/', getAllRules);

// Route for combining rules
router.post('/combine_rules', combineRulesController);

// Route for evaluating a rule
router.post('/evaluate_rule', evaluateRuleController);

// Route for modifying a rule
router.put('/modify_rule/:id', modifyRuleController);

export default router;
