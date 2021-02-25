import {Link} from 'react-router-dom'

const Profile=(props)=>{

    return(
        <div>
            <h1>My Profile:</h1>
            <Link to='/createquiz'>
                <button>Create a Quiz</button>
            </Link>
            <Link to='/myquizzes'>
                <button>My Quizzes</button>
            </Link>
        </div>
    )
}

export default Profile