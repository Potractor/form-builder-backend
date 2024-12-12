const mongoose = require('mongoose');

const ResponseSchema = new mongoose.Schema({
    formId: { type: mongoose.Schema.Types.ObjectId, ref: 'Form', required: true },
    answers: [
      {
        questionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Form.questions', required: true },
        response: mongoose.Schema.Types.Mixed, // Handles any response format
      },
    ],
  });
  

module.exports = mongoose.model('Response', ResponseSchema);

