module.exports = {
    getResult: async (req, res)=>{
        const db = req.app.get('db')
        const {quiz_id} = req.params
        const {user_id} = req.session.user
        const [result] = await db.results.get_result([quiz_id, user_id])
        res.status(200).send(result)
    },
    getResults: async (req, res)=>{
        const db = req.app.get('db')
        const {user_id} = req.session.user
        const results = await db.results.get_results([user_id])
        res.status(200).send(results)
    },
    addResult: async (req, res)=>{
        const db = req.app.get('db')
        const {user_id} = req.session.user
        const {quiz_id} = req.params
        const {result} = req.body
        const [addNewResult] = await db.results.add_result([quiz_id, user_id, result])
        res.status(200).send(addNewResult)
    }
}