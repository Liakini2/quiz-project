module.exports = {
    getQuestions: async (req, res)=>{
        const {quiz_id} = req.params
        const db = req.app.get('db')
        const results = await db.questions.get_questions([quiz_id])
        res.status(200).send(results)
    },
    getQuestion: async (req, res)=>{
        const {question_id} = req.params
        const db = req.app.get('db')
        const [result] = await db.questions.get_question([question_id])
        res.status(200).send(result)
    },
    addQuestion: async (req, res)=>{
        const db = req.app.get('db')
        const {quiz_id} = req.params
        const {question} = req.body
        const [result] = await db.questions.add_question([quiz_id, question])
        const newQuestion = {
            quiz_id: result.quiz_id,
            question_id: result.question_id,
            question: result.question,
            answers: result.answers
        }
        res.status(200).send(newQuestion)
    },
    editQuestion: async (req, res)=>{
        const {question, answers} = req.body
        const {question_id} = req.params
        const db = req.app.get('db')
        for(let i=0; i<answers.length; i++){
            db.answers.edit_answer(answers[i].answer_id, answers[i].answer, answers[i].result)
        }
        const [result] = await db.questions.get_question([question_id])
        if(result){
            const [changes] = await db.questions.edit_question([question_id, question?question:result.question])
            const newQuestion = {...changes}
            res.status(201).send(newQuestion)
        }
    },
    deleteQuestion: async (req, res)=>{
        const {question_id} = req.params
        const db = req.app.get('db')
        const [result] = await db.questions.get_question([question_id])
        if(result){
            await db.answers.delete_question_answers([question_id])
            await db.questions.delete_question([question_id])
            return res.sendStatus(200)
        }
        return res.sendStatus(200)
    }
}