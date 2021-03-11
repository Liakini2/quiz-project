module.exports = {
    getQuizzes: async (req, res)=>{
        const db = req.app.get('db')
        const results = await db.quiz.get_quizzes()
        res.status(200).send(results)
    },
    getUsersQuizzes: async (req, res)=>{
        const {user_id} = req.session.user
        const db = req.app.get('db')
        const results = await db.quiz.get_user_quizzes([user_id])
        if(!results){
            return res.status(200).send(`You have not created any quizzes.`)
        } else {
            return res.status(200).send(results)
        }
    },
    getQuiz: async (req, res)=>{
        const {quiz_id} = req.params
        const db = req.app.get('db')
        const [result] = await db.quiz.get_quiz([quiz_id])
        res.status(200).send(result)
    },
    getCompleteQuiz: async (req, res)=>{
        const {quiz_id} = req.params
        const db = req.app.get('db')
        const [result] = await db.quiz.get_complete_quiz([quiz_id])
        res.status(200).send(result)
    },
    addQuiz: async (req, res)=>{
        const {quiz_image, type, description, title} = req.body
        const {user_id} = req.session.user
        const db = req.app.get('db')
        if(quiz_image === undefined || quiz_image === null){
            quiz_image === "https://media.istockphoto.com/photos/neon-light-question-mark-with-concrete-wall-3d-rendering-picture-id1216197124?k=6&m=1216197124&s=612x612&w=0&h=Am6H2ld7B9EXvdcwlmEc5BNUjfU8Jy-PIw-wovrSIyU="
        }
        const [result] = await db.quiz.add_quiz([user_id, quiz_image, type, description, title])
        const newQuiz = {
            author_id: result.author_id, 
            quiz_id: result.quiz_id, 
            quiz_image: result.quiz_image, 
            type: result.type, 
            description: result.description, 
            title: result.title
        }
        res.status(201).send(newQuiz)
    },
    editQuiz: async (req, res)=>{
        const {quiz_image, type, description, title} = req.body
        const {quiz_id} = req.params
        const {user_id} = req.session.user
        const db = req.app.get('db')
        const [result] = await db.quiz.get_user_quiz([quiz_id, user_id])
        if(result){
            const [updatedQuiz] = await db.quiz.edit_quiz([quiz_id, user_id, quiz_image?quiz_image:result.quiz_image, type?type:result.type, description?description:result.description, title?title:result.title])
            const newQuiz = {...updatedQuiz}
            res.status(201).send(newQuiz)
        } else {
            return res.status(401).send(`Unable to edit other user's quizzes.`)
        }
    },
    deleteQuiz: async (req, res)=>{
        console.log(req.params)
        const {user_id} = req.session.user
        const {quiz_id} = req.params
        const db = req.app.get('db')
        const [result] = await db.quiz.get_user_quiz([quiz_id, user_id])
        console.log(result)
        console.log(user_id)
        if(user_id === result.author_id){
            await db.answers.delete_quiz_answers([quiz_id])
            await db.questions.delete_quiz_questions([quiz_id])
            await db.quiz.delete_quiz([quiz_id])
            res.sendStatus(200)
        } else {
            return res.status(401).send(`Unable to delete other user's quizzes`)
        }
    }
}