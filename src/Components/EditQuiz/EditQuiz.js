import {Link} from 'react-router-dom'
import {useState, useEffect} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import {editUserQuiz, setQuiz, deleteUserQuiz} from '../../Redux/quizReducer'

const EditQuiz=({setQuiz, editUserQuiz, deleteUserQuiz, quizReducer, match, ...props})=>{
    
    const [quizImage, setQuizImage] = useState('')
    //eventually modify this to be a drop down menu
    const [type, setType] = useState('')
    const [description, setDescription] = useState('') 
    const [title, setTitle] = useState('')

    useEffect(()=>{
        axios.get(`/api/quiz/${match.params.id}`)
        .then(({data})=>{
            setQuiz(data)
            setQuizImage(quizReducer.setUserQuiz.quizImage)
            setType(quizReducer.setUserQuiz.type)
            setDescription(quizReducer.setUserQuiz.description)
            setTitle(quizReducer.setUserQuiz.title)
        })
        .catch(err=>console.log(err))
    },[match.params.id, setQuiz, quizReducer.setUserQuiz.quizImage, quizReducer.setUserQuiz.type, quizReducer.setUserQuiz.description, quizReducer.setUserQuiz.title])

    const editQuiz=()=>{
        axios.put(`/api/quiz/${match.params.id}`, {quizImage, type, description, title})
        .then(({data})=>editUserQuiz(data))
        .catch(err=>console.log(err))
    }
    
    const deleteQuiz=()=>{
        axios.delete(`/api/quiz/${match.params.id}`)
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
            value={quizImage}
            onChange={(e)=>setQuizImage(e.target.value)}
            placeholder='quiz image'/>
            <h1>Quiz Type:</h1>
            <input
            value={type}
            onChange={(e)=>setType(e.target.value)}
            placeholder='type'/>
            <h1>Quiz Description</h1>
            <input
            value={description}
            onChange={(e)=>setDescription(e.target.value)}
            placeholder='description'/>
            <h1>Quiz Title</h1>
            <input
            value={title}
            onChange={(e)=>setTitle(e.target.value)}
            placeholder='title'/>
            <Link to='/myquizzes'>
                <button onClick={()=>{editQuiz()}}>Submit Edit</button>
            </Link>
            <Link to='/myquizzes'>
                <button onClick={()=>{deleteQuiz()}}>Delete Quiz</button>
            </Link>
        </div>
    )
}

const mapStateToProps=(store)=>{return store}

export default connect(mapStateToProps, {editUserQuiz, setQuiz, deleteUserQuiz})(EditQuiz)