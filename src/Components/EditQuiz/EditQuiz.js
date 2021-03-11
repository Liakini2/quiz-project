import {Link} from 'react-router-dom'
import {useState, useEffect} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import {editUserQuiz, setQuiz, deleteUserQuiz} from '../../Redux/quizReducer'

const EditQuiz=({setQuiz, editUserQuiz, deleteUserQuiz, quizReducer, match, ...props})=>{
    const [quiz_image, setQuizImage] = useState('')
    const [type, setType] = useState('')
    const [description, setDescription] = useState('') 
    const [title, setTitle] = useState('')

    useEffect(()=>{
        axios.get(`/api/quiz/${match.params.quiz_id}`)
        .then(({data})=>{
            
            setQuiz(data)
            setQuizImage(quizReducer.setQuiz.quiz_image)
            setType(quizReducer.setQuiz.type)
            setDescription(quizReducer.setQuiz.description)
            setTitle(quizReducer.setQuiz.title)
        })
        .catch(err=>console.log(err))
    },[
        setQuiz, 
        match.params.quiz_id, 
        quizReducer.setQuiz.quiz_image, 
        quizReducer.setQuiz.type, 
        quizReducer.setQuiz.description, 
        quizReducer.setQuiz.title])

    const editQuiz=()=>{
        axios.put(`/api/quiz/${match.params.quiz_id}`, {quiz_image, type, description, title})
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
            <Link to='/myquizzes'>
                <button>Cancel Edit</button>
            </Link>
            <h1>Quiz Image:</h1>
            <input
            value={quiz_image||""}
            onChange={(e)=>setQuizImage(e.target.value)}
            placeholder='quiz image'/>
            <h1>Quiz Type:</h1>
            <input
            value={type||""}
            onChange={(e)=>setType(e.target.value)}
            placeholder='type'/>
            <h1>Quiz Description</h1>
            <input
            value={description||""}
            onChange={(e)=>setDescription(e.target.value)}
            placeholder='description'/>
            <h1>Quiz Title</h1>
            <input
            value={title||""}
            onChange={(e)=>setTitle(e.target.value)}
            placeholder='title'/>
            <br></br>
            <Link to={`/editquestions/${match.params.quiz_id}`}>
                <button onClick={()=>{editQuiz()}}>Submit Changes and Next</button>
            </Link>
            <br></br>
            <Link to='/myquizzes'>
                <button onClick={()=>{deleteQuiz()}}>Delete Quiz</button>
            </Link>
        </div>
    )
}

const mapStateToProps=(store)=>{return store}

export default connect(mapStateToProps, {editUserQuiz, setQuiz, deleteUserQuiz})(EditQuiz)