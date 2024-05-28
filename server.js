const express = require('express');
const mongoose = require('mongoose');
const Customer = require('./models/customerModel');

const app = express();

app.use(express.json());

const mongodbURI = "mongodb+srv://test:test1234@customer.zlnjldh.mongodb.net/customer?retryWrites=true&w=majority&appName=customer";
mongoose.set("strictQuery", false);
mongoose.
    connect(mongodbURI)
    .then(() => {
        console.log('Connected to mongoDB success');
        app.listen(3000, () => {
            console.log('Node API app is running on port 3000');
        })
    })
    .catch((error) => {
        console.log(error);
    })

// routes
// Get all customers
app.get('/customers', async(req, res) => {
    try {
        const customers = await Customer.find({});
        res.status(200).json(customers);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});
    }
})

// Get one customer
app.get('/customers/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const customer = await Customer.findById(id);
        if(!customer){
            return res.status(404).json({message: `Can not find any customer with ID ${id}`});
        }
        res.status(200).json(customer);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});
    }
})

// Add new customer
app.post('/customers', async(req, res) => {
    try {
        const customer = await Customer.create(req.body);
        res.status(200).json(customer);

    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});
    }
})

// Update customer
app.put('/customers/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const customer = await Customer.findByIdAndUpdate(id, req.body);
        if(!customer){
            return res.status(404).json({message: `Can not find any customer with ID ${id}`});
        }
        const updatedCustomer = await Customer.findById(id);
        res.status(200).json(updatedCustomer);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});
    }
})

// Delete customer
app.delete('/customers/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const customer = await Customer.findByIdAndDelete(id);
        if(!customer){
            return res.status(404).json({message: `Can not find any customer with ID ${id}`})   
        }
        res.status(200).json(customer);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});
    }
})