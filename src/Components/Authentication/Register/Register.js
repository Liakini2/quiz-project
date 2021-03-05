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
    const [profilePic, setProfilePic] = useState('')

    const register=()=>{
        axios.post('/api/auth/register', {username, email, password, profilePic})
        .then(res=>{
            props.updateUser(res.data)
            props.history.push('/')
        }).catch(err=>console.log(err))
    }

    return(
        <div className='regPg'>
            <h1>Register</h1>
            <input
            placeholder='username'
            value={username}
            onChange={(e)=>{setUsername(e.target.value)}}
            />
            <input
            placeholder='email address'
            value={email}
            onChange={(e)=>{setEmail(e.target.value)}}
            />
            <input
            placeholder='password'
            type='password'
            value={password}
            onChange={(e)=>{setPassword(e.target.value)}}
            />
            <input
            placeholder='profile picture'
            value={profilePic}
            onChange={(e)=>{setProfilePic(e.target.value)}}
            />
            <button onClick={register}>
                Register and Login
            </button>
            <Link to='/'>
            <button>
                Back to Login
            </button>
            </Link>
        </div>
    )
}

export default connect(null, {updateUser})(Register)