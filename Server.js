const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// Create an Express application
const app = express();

// Middleware
app.use(bodyParser.json());  // Parse JSON bodies
app.use(cors());             // Allow cross-origin requests

// MongoDB Connection
const dbURI = 'mongodb+srv://Balakrishnan:Bala254269@cluster0.ylgoi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';  // MongoDB Cluster Connection String
mongoose.connect(dbURI)  // Simply pass the URI without the deprecated options
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log('Connection error: ', err));

    
// Define a Mongoose schema for the form data
const formSchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String
});

// Create a Mongoose model based on the schema
const FormData = mongoose.model('FormData', formSchema);

// POST route to handle form submission
app.post('/submit-form', async (req, res) => {
    try {
        const { name, email, message } = req.body;

        // Create a new document in the collection
        const newForm = new FormData({
            name: name,
            email: email,
            message: message
        });

        // Save the document to the MongoDB collection
        await newForm.save();

        res.status(200).send('Form data saved successfully!');
    } catch (error) {
        console.error('Error saving form data:', error);
        res.status(500).send('Error saving form data.');
    }
});

// Start the Express server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
