const express = require('express');
const path = require('path'); // Import path for serving static files
const router = express.Router();
const quizController = require('../controllers/quizController');

// Quiz routes
router.post('/create', quizController.createQuiz);
router.get('/:id', quizController.getQuiz);
router.get('/', quizController.getAllQuizzes);
router.put('/:id', quizController.updateQuiz);
router.delete('/:id', quizController.deleteQuiz);

// Route to serve quiz management page
router.get('/quiz-management', (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontend/quiz-management.html'));
});

module.exports = router;
