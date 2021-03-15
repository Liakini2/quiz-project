//imported to use state and lifecycle methods
import axios from 'axios'
import {useState, useEffect} from 'react'
import './CreateQuiz.css'

//Redux
import {connect} from 'react-redux'
import {setQuiz} from '../../Redux/quizReducer'
import {addQuestion} from '../../Redux/questionReducer'

//Routing
// import {Redirect} from 'react-router-dom'

//material ui styling and form
import TextField from '@material-ui/core/TextField'
import {makeStyles} from '@material-ui/core/styles'

//spacing for form
const useStyles = makeStyles((theme)=>({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1)
        }
    }
}))

const AddQuestions=({setQuiz, quizReducer, questionReducer, addQuestion, match, history, ...props})=>{
    const classes= useStyles()
    const [quizId, setQuizId] = useState('')
    const [question, setQuestion] = useState('')
    
    useEffect(()=>{
        axios.get(`/api/quiz/${match.params.quiz_id}`)
        .then(({data})=>{
            setQuiz(data)
            setQuizId(quizReducer.setQuiz.quiz_id)
        })
    },[match.params.quiz_id, quizReducer.setQuiz.quiz_id, setQuiz])  

    // if(!props.username){
    //     return <Redirect to={{
    //         pathname: '/',
    //         state: {from: props.location}
    //     }}/>
    // }

    const addQuestions=(props)=>{
        axios.post(`/api/question/${quizId}`, {question})
        .then(({data})=>{
            addQuestion(data)
            history.push(`/addanswers/${data.question_id}`)
        })
    }

    const handleSubmit=(e)=>{
        e.preventDefault()
    }

    return(
        <container className='createQuiz'>
            <div className='pageDescription'>
                <h1 className='introText'>Add Your Question Here:</h1>
            </div>
            <form 
            onSubmit={handleSubmit}
            className={classes.root}
            id='altInputFields'>
                <TextField
                name='question'
                label='Type your Question Here'
                variant='filled'
                value={question}
                onChange={(e)=>{setQuestion(e.target.value)}}
                />
                <button
                className='buttons'
                type='submit' 
                onClick={()=>{
                    addQuestions()
                }}>
                    Submit and Next
                </button>
            </form>
            <footer>
                <p>
                You will have the option to add more questions on the next page.
                </p>
            </footer>
        </container>
    )
}

const mapStateToProps=(store)=>{return store}

export default connect(mapStateToProps, {setQuiz, addQuestion})(AddQuestions)