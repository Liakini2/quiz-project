module.exports = {
    getQuestionAnswers: async (req, res)=>{
        const {question_id} = req.params
        const db = req.app.get('db')
        const results = await db.answers.get_question_answers([question_id])
        res.status(200).send(results)
    },
    getAnswer: async (req, res)=>{
        const {answer_id} = req.params
        const db = req.app.get('db')
        const [result] = await db.answers.get_answer([answer_id])
        res.status(200).send(result)
    },
    getQuizAnswers: async (req,res)=>{
        const {quiz_id} = req.params
        const db = req.app.get('db')
        const results = await db.answers.get_quiz_answers([quiz_id])
        console.log(results)
        res.status(200).send(results)
    },
    addAnswer: async (req, res)=>{
        const db = req.app.get('db')
        const {question_id} = req.params
        const {quizId, answerA, answerB, answerC, answerD, resultA, resultB, resultC, resultD} = req.body
        resultA?resultA===true:resultA===false
        resultB?resultB===true:resultB===false
        resultC?resultC===true:resultC===false
        resultD?resultD===true:resultD===false
        await db.answers.add_answer([question_id, quizId, answerA, resultA])
        await db.answers.add_answer([question_id, quizId, answerB, resultB])
        await db.answers.add_answer([question_id, quizId, answerC, resultC])
        const [result] = await db.answers.add_answer([question_id, quizId, answerD, resultD])
        const newAnswer = {
            question_id: result.question_id,
            quiz_id: result.quiz_id,
            answer_id: result.answer_id,
            answer: result.answer,
            result: result.result
        }
        res.status(200).send(newAnswer)
    },
    editAnswer: async (req, res)=>{
        const {answer, result} = req.body
        const {answer_id} = req.params
        const db = req.app.get('db')
        const [changes] = await db.answers.edit_answer([answer_id, answer?answer:changes.answer, result?result:changes.result])
        const newAnswer = {...result}
        res.status(201).send(newAnswer)
    }
}