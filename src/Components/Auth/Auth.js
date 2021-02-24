import './Auth.css'
import axios from 'axios'
import {useState} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {updateUser} from '../../Redux/authReducer'

const Auth = (props) =>{
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const login=()=>{
        axios.post('/api/auth/login', {email, password})
        .then(res=>{
            props.updateUser(res.data)
            props.history.push('/explore')
            setEmail('')
            setPassword('')
        }).catch(err=>console.log(err))
    }    

    return(
        <div>
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
            <button onClick={login}>
                Login
            </button>
            <Link to='/register'>
            <button>
                Register
            </button>
            </Link>
        </div>
    )
}

export default connect(null, {updateUser})(Auth)

