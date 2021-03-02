import {Link} from 'react-router-dom'
import {useState} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import {submitQuiz} from '../../Redux/quizReducer'

const CreateQuiz=(props)=>{
    const [quizImage, setQuizImage] = useState('')
    //eventually modify this to be a drop down menu
    const [type, setType] = useState('')
    const [description, setDescription] = useState('') 
    const [title, setTitle] = useState('')

    const addQuiz=()=>{
        axios.post('/api/quizzes', {quizImage, type, description, title})
        .then(({data})=>{
            console.log(data)
            console.log(props)
            props.submitQuiz(data)
            props.history.push(`/addquestions/${data.quiz_id}`)
        })
        .catch(err=>console.log(err))
    }
    console.log(props)
    return(
        <div>
            <h1>Create a quiz</h1>
            <Link to='/profile'>
                <button>Cancel</button>
            </Link>
            <input
            value={quizImage}
            onChange={(e)=>setQuizImage(e.target.value)}
            placeholder='quiz image'/>
            <input
            value={type}
            onChange={(e)=>setType(e.target.value)}
            placeholder='type'/>
            <input
            value={description}
            onChange={(e)=>setDescription(e.target.value)}
            placeholder='description'/>
            <input
            value={title}
            onChange={(e)=>setTitle(e.target.value)}
            placeholder='title'/>
            <button onClick={()=>{
                addQuiz()
                setQuizImage('')
                setType('')
                setDescription('') 
                setTitle('')
            }}>
                Submit & Next
            </button>
        </div>
    )
}

export default connect(null, {submitQuiz})(CreateQuiz)