module.exports = {
    getQuizzes: async (req, res)=>{
        const db = req.app.get('db')
        const results = await db.quiz.get_quizzes()
        res.status(200).send(results)
    },
    getUsersQuizzes: async (req, res)=>{
        console.log(req.session.user)
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
    addQuiz: async (req, res)=>{
        const {quizImage, type, description, title} = req.body
        const {user_id} = req.session.user
        const db = req.app.get('db')
        const [result] = await db.quiz.add_quiz([user_id, quizImage, type, description, title])
        const newQuiz = {
            author_id: result.author_id, 
            quiz_id: result.quiz_id, 
            quizImage: result.quiz_image, 
            type: result.type, 
            description: result.description, 
            title: result.title, 
            date_created: result.date_created
        }
        res.status(201).send(newQuiz)
    },
    editQuiz: async (req, res)=>{
        const {quizImage, type, description, title} = req.body
        const {quiz_id} = req.params
        const {user_id} = req.session.user
        const db = req.app.get('db')
        const [result] = await db.quiz.get_user_quiz([quiz_id, user_id])
        if(result){
            const [updatedQuiz] = await db.quiz.edit_quiz([quiz_id, user_id, quizImage?quizImage:result.quizImage, type?type:result.type, description?description:result.description, title?title:result.title])
            const newQuiz = {...updatedQuiz}
            res.status(201).send(newQuiz)
        } else {
            return res.status(401).send(`Unable to edit other user's quizzes.`)
        }
    },
    deleteQuiz: async (req, res)=>{
        const {user_id} = req.session.user
        const {quiz_id} = req.params
        const db = req.app.get('db')
        const [result] = await db.quiz.get_user_quiz([quiz_id, user_id])
        if(user_id === result.author_id){
            db.quiz.delete_quiz([quiz_id])
            res.sendStatus(200)
        } else {
            return res.status(401).send(`Unable to delete other user's quizzes`)
        }
    }
}