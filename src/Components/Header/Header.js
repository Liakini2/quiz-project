import './Header.css'
import axios from 'axios'
import {useHistory} from 'react-router-dom'

const Header=(props)=>{
    const {push} = useHistory()
        
    const logout=()=>{
        axios.post('/api/auth/logout')
        .then(_=>push('/'))
        .catch(err=>console.log(err))
    }

    return(
        <header>
            <div className='profilePic'>
                <button
                onClick={()=>push('/profile')}>
                    Profile
                </button>
                <button
                onClick={()=>push('/explore')}>
                    Explore
                </button>
            </div>
            <div className='ham'>
                <button onClick={logout}>
                    Logout
                </button>
            </div>
        </header>
    )
}

export default Header