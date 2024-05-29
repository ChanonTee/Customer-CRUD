const Customer = require('../models/customerModel');
const express = require('express');
const { getCustomers, getCustomer, createCustomer, updateCustomer, deleteCustomer } = require('../controllers/customerController');

const router = express.Router();

// Get all customers
router.get('/', getCustomers);

// Get one customer
router.get('/:id', getCustomer);

// Add new customer
router.post('/', createCustomer)

// Update customer
router.put('/:id', updateCustomer);

// Delete customer
router.delete('/:id', deleteCustomer);

module.exports = router;