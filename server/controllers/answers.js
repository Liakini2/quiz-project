module.exports = {
    getAnswers: async (req, res)=>{
        console.log(req.params)
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
    addAnswer: async (req, res)=>{
        const db = req.app.get('db')
        console.log(req.body)
        const {question_id} = req.params
        const {quizId, answerA, answerB, answerC, answerD} = req.body
        await db.answers.add_answer([question_id, quizId, answerA, resultA])
        await db.answers.add_answer([question_id, quizId, answerB, resultB])
        await db.answers.add_answer([question_id, quizId, answerC, resultC])
        const [result] = await db.answers.add_answer([question_id, quizId, answerD, resultD])
        console.log(result)
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
        const {answer} = req.body
        const {answer_id} = req.body
        const db = req.app.get('db')
        const [result] = await db.answers.edit_answer([answer_id, answer?answer:result.answer, result?result:result.result])
        const newAnswer = {...result}
        res.status(201).send(newAnswer)
    },
    deleteAnswer: async (req, res)=>{
        const {answer_id} = req.params
        const db = req.app.get('db')
        const [result] = await db.answers.get_answer([answer_id])
        if(result){
            db.answers.delete_answer([answer_id])
            res.sendStatus(200)
        }
    }
    // deleteQuestionAnswers
    // deleteQuizAnswers
}