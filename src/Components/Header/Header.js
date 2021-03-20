import './Header.css'
import axios from 'axios'
import {useHistory} from 'react-router-dom'
import {useState} from 'react'

const Header=(props)=>{
    const {push} = useHistory()
    const [menuOpen, setMenuOpen] = useState(false)
    const [toggleShow, setToggleShow] = useState(false) 
        
    const logout=()=>{
        axios.post('/api/auth/logout')
        .then(_=>push('/'))
        .catch(err=>console.log(err))
    }

    const menuBtn =()=>{
        const menuBtn = document.querySelector('.menu-btn')
        if(!menuOpen){
            menuBtn.classList.add('open')
            setMenuOpen(true)
            
        } else {
            menuBtn.classList.remove('open')
            setMenuOpen(false)
        }
    }

    const toggleShowFunc=()=>{
        if(!toggleShow){
            setToggleShow(true)
        } else {
            setToggleShow(false)
        }
    }

    return(
        <header>
            <ul className={`nav-links ${toggleShow ? 'show' : ''}`}>
                <li>
                    <a 
                    className='nav-item'
                    onClick={()=>{
                        push('/profile')
                        toggleShowFunc()
                        menuBtn()
                    }}
                    >
                        Profile
                    </a>
                </li>
                <li>
                    <a 
                    className='nav-item'
                    onClick={()=>{
                        push('/explore')
                        toggleShowFunc()
                        menuBtn()
                    }}
                    >
                        Explore
                    </a>
                </li>
                <li>
                    <a 
                    className='nav-item'
                    onClick={()=>{
                        logout()
                        toggleShowFunc()
                        menuBtn()
                    }}
                    >
                        Logout
                    </a>
                </li>
            </ul>
            <div 
            className='menu-btn' 
            id='nav-btn'
            onClick={()=>{
                toggleShowFunc()
                menuBtn()
            }}
            >
                <div className='menu-btn_burger'></div>
            </div>
            <h1 className='logo'>TRIVIAL TRIVIA</h1>
        </header>
    )
}

export default Header