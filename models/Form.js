const mongoose = require('mongoose');

const baseOptions = {
  discriminatorKey: 'type', // Field to differentiate between question types
  collection: 'questions',
};

const BaseQuestionSchema = new mongoose.Schema(
  {
    question: { type: String, required: true },
    points: { type: Number, default: 0 },
  },
  baseOptions
);

const CategorizeQuestionSchema = new mongoose.Schema({
  categories: [String],
  options: [
    {
      text: { type: String, required: true },
      categories: [String],
    },
  ],
});

const SentenceQuestionSchema = new mongoose.Schema({
  blanks: [String],
});

const SubQuestionSchema = new mongoose.Schema({
    questionText: { type: String, required: true },
    options: [
      {
        text: { type: String, required: true }, // Option text
        isCorrect: { type: Boolean, required: true }, // Correct option indicator
      }
    ],
    correctOption: { type: Number, required: true }, // Index of the correct option
  });
  
  
  const ComprehensionQuestionSchema = new mongoose.Schema({
    passage: { type: String, required: true }, // Passage for the comprehension
    instructions: { type: String }, // Instructions for the comprehension
    media: { type: String }, // Media URL
    questions: [SubQuestionSchema], // Array of inner questions with options
  });

const FormSchema = new mongoose.Schema({
  title: { type: String, required: true },
  questions: [BaseQuestionSchema],
});

const Form = mongoose.model('Form', FormSchema);

// Attach discriminators
FormSchema.path('questions').discriminator('Categorize', CategorizeQuestionSchema);
FormSchema.path('questions').discriminator('Sentence', SentenceQuestionSchema);
FormSchema.path('questions').discriminator('Comprehension', ComprehensionQuestionSchema);

module.exports = Form;
