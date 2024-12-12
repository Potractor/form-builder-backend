
const express = require('express');
const router = express.Router();
const Form = require('../models/Form');
const Response = require('../models/Response');
const mongoose = require('mongoose');
// Create a new form
router.post('/forms', async (req, res) => {
    try {
      const { title, questions } = req.body;
  
      const form = new Form({ title, questions });
      await form.save();
  
      res.status(201).send({ formId: form._id, message: 'Form created successfully!' });
    } catch (error) {
      res.status(400).send({ error: 'Error saving form', message: error.message });
    }
  });
  

// Get a form by ID
router.get('/forms/:id', async (req, res) => {
    try {
        const form = await Form.findById(req.params.id);
        if (!form) return res.status(404).send({ error: 'Form not found' });
        res.send(form);
    } catch (error) {
        res.status(500).send({ error: 'Error fetching form', message: error.message });
    }
});

// POST endpoint to save responses
router.post('/responses', async (req, res) => {
    const { formId, responses } = req.body; // 'responses' object from the frontend

    try {
        // Ensure form exists
        const form = await Form.findById(formId);
        if (!form) return res.status(404).send({ error: 'Form not found' });

        // Prepare answers array from the 'responses' object
        const answers =Object.entries(responses).map(([questionId, response]) => {
            return {
                questionId: new mongoose.Types.ObjectId(questionId), // Ensure questionId is ObjectId
                response, // Store the user's response directly
            };
        });

        // Create a new Response document and save it
        const responseDoc = new Response({ formId, answers });
        await responseDoc.save();

        res.status(201).send({ message: 'Responses saved successfully', response: responseDoc });
    } catch (error) {
        console.error('Error saving responses:', error);
        res.status(400).send({ error: 'Error saving responses', message: error.message });
    }
});



module.exports = router;
