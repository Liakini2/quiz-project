import {Link} from 'react-router-dom'
import {useEffect} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import {setUserQuizzes} from '../../Redux/quizReducer'


const MyQuizzes=({setUserQuizzes, quizReducer, ...props})=>{
    useEffect(()=>{
        axios.get('/api/myquizzes')
        .then(({data})=>setUserQuizzes(data))
        .catch(err=>console.log(err))
    },[setUserQuizzes])

    //if I have time add a search function here
    return(
        <div>
            <div>
                {quizReducer.userQuizzes.map((quiz, index)=>(
                    <div key={index}>
                        <h1>{quiz.title}</h1>
                        <img src={quiz.quiz_image} alt='quiz'/>
                        <h1>{quiz.description}</h1>
                        <h1>{quiz.type}</h1>
                        <Link to={`/editquiz/${quiz.quiz_id}`}>
                            <button>Edit Quiz</button>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    )
}

const mapStateToProps =(store)=>{return store}

export default connect(mapStateToProps, {setUserQuizzes})(MyQuizzes)