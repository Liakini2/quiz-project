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
        const {question, question_image} = req.body
        const [result] = await db.questions.add_question([quiz_id, question, question_image])
        const newQuestion = {
            quiz_id: result.quiz_id,
            question_id: result.question_id,
            question: result.question,
            question_image: result.question_image,
            answers: result.answers
        }
        res.status(200).send(newQuestion)
    },
    editQuestion: async (req, res)=>{
        const {question, question_image} = req.body
        const {question_id} = req.params
        // const {quiz_id}
        const db = req.app.get('db')
        const [result] = await db.question.edit_question([question_id, question?question:result.question, question_image?question_image:result.question_image])
        const newQuestion = {...result}
        res.status(201).send(newQuestion)
    },
    deleteQuestion: async (req, res)=>{
        // const {question_id} = req.params
        // // const {quiz_id}
        // const db = req.app.get('db')
        // const [result] = await db.quiz.get
        //need to make it so that when a question is deleted so are it's answers
    }
}