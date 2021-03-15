import './Auth.css'
import axios from 'axios'
import {useState} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {updateUser} from '../../../Redux/authReducer'

const Auth = (props) =>{
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const login=()=>{
        axios.post('/api/auth/login', {email, password})
        .then(res=>{
            props.updateUser(res.data)
            props.history.push(props.location.state?props.location.state.from:'/explore')
        }).catch(err=>{
            alert(`Please register prior to logging in!`)
            console.log(err)
        })
    }    

    return(
        <div className='loginPg'>
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
            <div className='login'>
                <input
                placeholder='email address'
                value={email}
                onChange={(e)=>{setEmail(e.target.value)}}
                />
                <br></br>
                <input
                placeholder='password'
                type='password'
                value={password}
                onChange={(e)=>{setPassword(e.target.value)}}
                />
                <br></br>
                <button 
                className='authButtons'
                onClick={login}>
                    Login
                </button>
            </div>
            <br></br>
            <div className='register'>
                <p className='inst'>New to trivial trivia? </p>
                <p className='inst'>Click the button below <br></br>to register a new account.</p>
                <Link to='/register'>
                <button
                className='authButtons'>
                    Create An Account
                </button>
                </Link>
            </div>
        </div>
    )
}

export default connect(null, {updateUser})(Auth)

