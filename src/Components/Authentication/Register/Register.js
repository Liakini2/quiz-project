import './Register.css'
import axios from 'axios'
import {useState} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {updateUser} from '../../../Redux/authReducer'

const Register =(props)=>{
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const register=()=>{
        axios.post('/api/auth/register', {username, email, password})
        .then(res=>{
            props.updateUser(res.data)
            props.history.push('/')
            alert(`Log in to start testing your trivia knowledge!`)
        }).catch(err=>{
            console.log(err)
            alert('This user is already registered.')
        })
    }

    
    return(
        <div className='regPg'>
            <div className='about'>
                <h1 className='welcome'>Welcome to Trivial Trivia</h1>
                <div className='aboutText'>
                    Use our website to create 
                    your own quizzes, challenge
                    your friends, and test your
                    knowledge!
                </div>
            </div>
            <br></br>
            <h1 className='registerBelow'>Register Below</h1>
            <input
            className='registerInput'
            placeholder='username'
            value={username}
            onChange={(e)=>{setUsername(e.target.value)}}
            />
            <input
            className='registerInput'
            placeholder='email address'
            value={email}
            onChange={(e)=>{setEmail(e.target.value)}}
            />
            <input
            className='registerInput'
            placeholder='password'
            type='password'
            value={password}
            onChange={(e)=>{setPassword(e.target.value)}}
            />
            <button 
            className='authButtons'
            onClick={register}>
                Register and Login
            </button>
            <Link to='/'>
            <button
            className='authButtons'>
                Back to Login
            </button>
            </Link>
        </div>
    )
}

export default connect(null, {updateUser})(Register)