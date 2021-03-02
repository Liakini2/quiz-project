module.exports = {
    getQuestions: async (req, res)=>{
        const {quiz_id} = req.params
        const db = req.app.get('db')
        const results = await db.quizQuestions.get_questions([quiz_id])
        res.status(200).send(results)
    },
    addQuestion: async (req, res)=>{
        const {user_id} = req.session.user
        const db = req.app.get('db')
        // const result = await db.quizQuestions.
    },
    editQuestion: async (req, res)=>{
        const db = req.app.get('db')
    },
    deleteQuestion: async (req, res)=>{
        const db = req.app.get('db')
    }
}