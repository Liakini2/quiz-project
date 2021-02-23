import {useHistory} from 'react-router-dom'

const Header=(props)=>{
    const {push} = useHistory()
    return(
        <div>
            <div>
                <h1>Profile</h1>
                <h1>Profile Pic placeholder</h1>
            </div>

            <div>
                <h1>Hamburger placeholder</h1>
            </div>
        </div>
    )
}

export default Header