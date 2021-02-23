const bcrypt = require('bcrypt')

module.exports = {
    register: async (req, res) =>{
        const {username, email, password, profile_pic} = req.body
        const db = req.app.get('db')
        const result = await db.user.find_user([email])
        const existingUser = result[0]
        if(existingUser){
            return res.status(409).send(`Email already registered.`)
        }
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, salt)
        const registeredUser = await db.user.create_user([username, email, hash, profile_pic])
        const user = registeredUser[0]
        delete user.password
        req.session.user = {username: user.username, email: user.email, profile_pic: user.profile_pic, id: user.id}
        return res.status(200).send(req.session.user)
    },
    login: async (req, res) =>{
        const {email, password} = req.body
        const db = req.app.get('db')
        const foundUser= await db.user.find_user([email])
        const user = foundUser [0]
        if(!user){
            return res.status(401).send('User not found. Please register prior to logging in.')
        }
        const isAuthenticated = bcrypt.compareSync(password, user.password)
        if(!isAuthenticated){
            return res.status(401).send('Username or Password Incorrect')
        } else {
            delete user.password
            req.session.user = {username: user.username, email: user.email, profile_pic: user.profile_pic, id: user.id}
            return res.status(200).send(req.session.user)
        }
    },
    getUser: async (req, res) =>{
        if(req.session.user){
            return res.status(200).send(req.session.user)
        } else {
            return res.status(401).send('Please log in.')
        }
    },
    logout: async (req, res) =>{
        req.session.destroy()
        return res.sendStatus(200)
    }
}