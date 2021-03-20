require('dotenv').config()
const express = require('express')
const massive = require('massive')
const session = require('express-session')
const app = express()
const path = require('path')
// const bodyParser = require('body-parser')
// const nodemailer = require('nodemailer')

const {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET, NODEMAILER_USER, NODEMAILER_PASS, NODEMAILER_SERVICE} = process.env

//CONTROLLERS
const AuthCtrl = require('./controllers/auth')
const QuizCtrl = require('./controllers/quiz')
const QuestionCtrl = require('./controllers/question')
const AnswerCtrl = require('./controllers/answers')
const ResultCtrl = require('./controllers/results')

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

//Answers endpoints
app.get('/api/answers/:question_id', AnswerCtrl.getQuestionAnswers)
app.get('/api/answer/:answer_id', AnswerCtrl.getAnswer)
app.get('/api/quizanswers/:quiz_id', AnswerCtrl.getQuizAnswers)
app.post('/api/answer/:question_id', AnswerCtrl.addAnswer)
app.put('/api/answer/:answer_id', AnswerCtrl.editAnswer)

//Result endpoints
app.get('/api/result/:result_id', ResultCtrl.getResult)
app.get('/api/results/', ResultCtrl.getResults)
app.post('/api/result/:quiz_id', ResultCtrl.addResult)

// app.post('/', (req, res)=>{
//     let transporter = nodemailer.createTransport({
//         service: NODEMAILER_SERVICE, 
//         auth: {
//             user: `${NODEMAILER_USER}`, 
//             pass: NODEMAILER_PASS, 
//         },
//     });

//     let info = await transporter.sendMail({
//         from: '"Trivial Trivia" <NODEMAILER_USER>', 
//         to: "bar@example.com, baz@example.com", 
//         subject: "Hello! And Thank You!", 
//         text: "Thank you for signing up for Trivial Trivia! We look forward to seeing you share your trivia knowledge!", 
//         html: "<b>Hello world?</b>", 
//     });

//     console.log("Message sent: %s", info.messageId);
    
//     console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    
//     res.status(200).send('Email Sent!')
// })

// Hosting
app.use(express.static(__dirname + '/../build'))
app.get('*', (req, res)=>{
    res.sendFile(path.join(__dirname + '../build'))
})