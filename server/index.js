require('dotenv').config()
const express = require('express')
const massive = require('massive')
const session = require('express-session')
const app = express()
const {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET} = process.env

//CONTROLLERS
const AuthCtrl = require('./controllers/auth')
const QuizCtrl = require('./controllers/quiz')
const QuestionCtrl = require('./controllers/question')
const AnswerCtrl = require('./controllers/answers')

//MIDDLEWARE
app.use(express.json())
app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: 1000 * 60 * 60 * 24}
}))

//DATABASE CONNECTION
massive({
    connectionString: CONNECTION_STRING,
    ssl: {
        rejectUnauthorized: false
    }
}).then(db=>{
    app.set('db', db)
    console.log('db connected')
    app.listen(SERVER_PORT, ()=> console.log(`Server running on port ${SERVER_PORT}`))
}).catch(err=>console.log(err))

//ENDPOINTS

//Auth endpoints
app.post('/api/auth/register', AuthCtrl.register)
app.post('/api/auth/login', AuthCtrl.login)
app.get('/api/auth/user', AuthCtrl.getUser)
app.post('/api/auth/logout', AuthCtrl.logout)

//Quiz endpoints
app.get('/api/quizzes', QuizCtrl.getQuizzes)
app.get('/api/myquizzes', QuizCtrl.getUsersQuizzes)
app.get('/api/quiz/:quiz_id', QuizCtrl.getQuiz)
app.get('/api/takequiz/:quiz_id', QuizCtrl.getCompleteQuiz)
app.post('/api/quizzes', QuizCtrl.addQuiz)
app.put('/api/quiz/:quiz_id', QuizCtrl.editQuiz)
app.delete('/api/quiz/:quiz_id', QuizCtrl.deleteQuiz)

//Quiz-Questions endpoints
app.get('/api/questions/:quiz_id', QuestionCtrl.getQuestions)
app.get('/api/question/:question_id', QuestionCtrl.getQuestion)
app.post('/api/question/:quiz_id', QuestionCtrl.addQuestion)
app.put('/api/question/:question_id', QuestionCtrl.editQuestion)
app.delete('/api/question/:question_id', QuestionCtrl.deleteQuestion)
// app.delete('/api/questions/:quiz_id', QuestionCtrl.deleteQuizQuestions)

//Answers endpoints
app.get('/api/answers/:question_id', AnswerCtrl.getAnswers)
app.get('/api/answer/:answer_id', AnswerCtrl.getAnswer)
app.post('/api/answer/:question_id', AnswerCtrl.addAnswer)
app.put('/api/answer/:answer_id', AnswerCtrl.editAnswer)
app.delete('/api/answer/:answer_id', AnswerCtrl.deleteAnswer)
// app.delete('/api/answers/:question_id', AnswerCtrl.deleteQuestionAnswers)
// app.delete('/api/answers/:quiz_id', AnswerCtrl.deleteQuizAnswers)