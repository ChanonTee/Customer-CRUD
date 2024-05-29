const Customer = require('../models/customerModel');
const asyncHandler = require('express-async-handler');

// Get all customers
const getCustomers = asyncHandler(async(req, res) => {
    try {
        const customers = await Customer.find({});
        res.status(200).json(customers);
    } catch (error) {
        res.status(500);
        throw new Error(error.message);
    }
})

// Get one customer
const getCustomer = asyncHandler(async(req, res) => {
    try {
        const {id} = req.params;
        const customer = await Customer.findById(id);
        if(!customer){
            res.status(404);
            throw new Error(`Can not find any customer with ID ${id}`);
        }
        res.status(200).json(customer);
    } catch (error) {
        res.status(500);
        throw new Error(error.message);
    }
})

const createCustomer = asyncHandler(async(req, res) => {
    try {
        const customer = await Customer.create(req.body);
        res.status(200).json(customer);

    } catch (error) {
        res.status(500);
        throw new Error(error.message);
    }
})

const updateCustomer = asyncHandler(async(req, res) => {
    try {
        const {id} = req.params;
        const customer = await Customer.findByIdAndUpdate(id, req.body);
        if(!customer){
            res.status(404);
            throw new Error(`Can not find any customer with ID ${id}`);
        }
        const updatedCustomer = await Customer.findById(id);
        res.status(200).json(updatedCustomer);
    } catch (error) {
        res.status(500);
        throw new Error(error.message);
    }
})

const deleteCustomer = asyncHandler(async(req, res) => {
    try {
        const {id} = req.params;
        const customer = await Customer.findByIdAndDelete(id);
        if(!customer){
            res.status(404);
            throw new Error(`Can not find any customer with ID ${id}`);
        }
        res.status(200).json(customer);
    } catch (error) {
        res.status(500);
        throw new Error(error.message);
    }
})

module.exports = {
    getCustomers, getCustomer, createCustomer, updateCustomer, deleteCustomer
};