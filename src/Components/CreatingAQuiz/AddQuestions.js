//imported to use state and lifecycle methods
import axios from 'axios'
import {useState, useEffect} from 'react'

//Redux
import {connect} from 'react-redux'
import {setQuiz} from '../../Redux/quizReducer'
import {addQuestion} from '../../Redux/questionReducer'

//Routing
// import {Redirect} from 'react-router-dom'

//material ui styling and form
import Container from '@material-ui/core/Container'
import TextField from '@material-ui/core/TextField'
import {makeStyles} from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'

//spacing for form
const useStyles = makeStyles((theme)=>({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1)
        }
    },
    button: {
        margin: theme.spacing(1)
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
        <Container>
            <h1>Add Your Questions Here:</h1>
            <form 
            onSubmit={handleSubmit}
            className={classes.root}>
                <TextField
                name='question'
                label='Type your Question Here'
                variant='filled'
                value={question}
                onChange={(e)=>{setQuestion(e.target.value)}}
                />
                <Button
                className={classes.button} 
                variant='contained' 
                color='primary' 
                type='submit' 
                onClick={()=>{
                    // handleSubmit()
                    addQuestions()
                }}>
                    Submit and Next
                </Button>
            </form>
        </Container>
    )
}

const mapStateToProps=(store)=>{return store}

export default connect(mapStateToProps, {setQuiz, addQuestion})(AddQuestions)