import {Link} from 'react-router-dom'
import {useEffect} from 'react'
import axios from 'axios'
import './MyQuizzes.css'

import {connect} from 'react-redux'
import {setUserQuizzes} from '../../Redux/quizReducer'


const MyQuizzes=({setUserQuizzes, quizReducer, ...props})=>{
    useEffect(()=>{
        axios.get('/api/myquizzes')
        .then(({data})=>{setUserQuizzes(data)})
        .catch(err=>console.log(err))
    },[setUserQuizzes])

    //if I have time add a search function here

    return(
        <div className='myQuizzes'>
            <div className='aboutEdit'>
                <p className='aboutEditText'>This is a view of the quizzes you've created. Don't see anything? Try creating a quiz from your profile. Click the 'edit quiz' button under a quiz to edit and delete your quizzes.</p>
            </div>
            <div className='quizDisplay'>
                {quizReducer.setUserQuizzes.map((quiz, index)=>(
                    <div 
                    className='quizCards'
                    key={index}>
                        <h1 className='quizTitle'>{quiz.title}</h1>
                        <img className='twoQuizImage' src={quiz.quiz_image} alt='quiz'/>
                        <h1>{quiz.description}</h1>
                        <Link to={`/editquiz/${quiz.quiz_id}`}>
                            <button className='buttons'> Edit Quiz</button>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    )
}

const mapStateToProps =(store)=>{return store}

export default connect(mapStateToProps, {setUserQuizzes})(MyQuizzes)