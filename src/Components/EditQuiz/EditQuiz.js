import {Link} from 'react-router-dom'
import {useState, useEffect} from 'react'
import axios from 'axios'

import './EditQuiz.css'

import {connect} from 'react-redux'
import {editUserQuiz, setQuiz, deleteUserQuiz} from '../../Redux/quizReducer'

const EditQuiz=({setQuiz, editUserQuiz, deleteUserQuiz, quizReducer, match, ...props})=>{
    const [quiz_image, setQuizImage] = useState('')
    const [description, setDescription] = useState('') 
    const [title, setTitle] = useState('')

    useEffect(()=>{
        axios.get(`/api/quiz/${match.params.quiz_id}`)
        .then(({data})=>{
            setQuiz(data)
            setQuizImage(quizReducer.setQuiz.quiz_image)
            setDescription(quizReducer.setQuiz.description)
            setTitle(quizReducer.setQuiz.title)
        })
        .catch(err=>console.log(err))
    },[
        setQuiz, 
        match.params.quiz_id, 
        quizReducer.setQuiz.quiz_image,
        quizReducer.setQuiz.description, 
        quizReducer.setQuiz.title])

    const editQuiz=()=>{
        axios.put(`/api/quiz/${match.params.quiz_id}`, {quiz_image, description, title})
        .then(({data})=>editUserQuiz(data))
        .catch(err=>console.log(err))
    }
    
    const deleteQuiz=()=>{
        axios.delete(`/api/quiz/${match.params.quiz_id}`)
        .then(({data})=>{deleteUserQuiz(data)})
        .catch(err=>console.log(err))
    }

    return(
        <div>
            <div className='aboutEditQuiz'>
                <h1 className='introText'>Edit Your Quiz!</h1>
                <Link to='/myquizzes'>
                    <button className='altButtons'>Cancel</button>
                </Link>
            </div>
            <div className='editQuizInputs'>
                <h1>Quiz Image:</h1>
                <textarea
                className='editInputField'
                value={quiz_image||""}
                onChange={(e)=>setQuizImage(e.target.value)}
                placeholder='quiz image'/>
                <h1>Quiz Description</h1>
                <textarea
                className='editInputField'
                value={description||""}
                onChange={(e)=>setDescription(e.target.value)}
                placeholder='description'/>
                <h1>Quiz Title</h1>
                <input
                className='altEditInputField'
                value={title||""}
                onChange={(e)=>setTitle(e.target.value)}
                placeholder='title'/>
                <Link to={`/editquestions/${match.params.quiz_id}`}>
                    <button className='buttons' onClick={()=>{editQuiz()}}>Submit Changes and Next</button>
                </Link>
                <Link to='/myquizzes'>
                    <button className='buttons' onClick={()=>{deleteQuiz()}}>Delete Quiz</button>
                </Link>
            </div>
        </div>
    )
}

const mapStateToProps=(store)=>{return store}

export default connect(mapStateToProps, {editUserQuiz, setQuiz, deleteUserQuiz})(EditQuiz)