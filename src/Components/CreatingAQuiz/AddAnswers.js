//imported to use state and lifecycle methods
import axios from 'axios'
import {useState, useEffect} from 'react'
import './CreateQuiz.css'

//Redux
import {connect} from 'react-redux'
import {setQuestion} from '../../Redux/questionReducer'
import {addAnswer} from '../../Redux/answersReducer'


//Routing
// import {Redirect} from 'react-router-dom'

//material ui styling and form
import TextField from '@material-ui/core/TextField'
import {makeStyles} from '@material-ui/core/styles'
import { Checkbox } from '@material-ui/core'

const useStyles = makeStyles((theme)=>({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1)
        }
    }
}))


const AddAnswers=({setQuestion, questionReducer, answersReducer, addAnswers, match, history, ...props})=>{
    const classes= useStyles()
    const [questionId, setQuestionId] = useState('')
    const [quizId, setQuizId] = useState('')
    const [answerA, setAnswerA] = useState('')
    const [answerB, setAnswerB] = useState('')
    const [answerC, setAnswerC] = useState('')
    const [answerD, setAnswerD] = useState('')
    const [resultA, setResultA] = useState(false)
    const [resultB, setResultB] = useState(false)
    const [resultC, setResultC] = useState(false)
    const [resultD, setResultD] = useState(false)

    useEffect(()=>{
        axios.get(`/api/question/${match.params.question_id}`)
        .then(({data})=>{
            setQuestion(data)
            setQuestionId(questionReducer.setQuestion.question_id)
            setQuizId(questionReducer.setQuestion.quiz_id)
        })
    },[match.params.question_id, questionReducer.setQuestion.question_id, questionReducer.setQuestion.quiz_id, setQuestion])  

    const submitAndQuestions=()=>{
        axios.post(`/api/answer/${questionId}`, {quizId, answerA, resultA, answerB, resultB, answerC, resultC, answerD, resultD})
            .then(({data})=>{
                addAnswer(data)
                history.push(`/addquestions/${questionReducer.setQuestion.quiz_id}`)
            })
            .catch((err)=>console.log(err))
    }

    const submitAndResults=()=>{
        axios.post(`/api/answer/${questionId}`, {quizId, answerA, resultA, answerB, resultB, answerC, resultC, answerD, resultD})
        .then(({data})=>{
            addAnswer(data)
            history.push(`/myquizzes`)
        })
        .catch((err)=>console.log(err))
    }
     
    const handleSubmit=(e)=>{
        e.preventDefault()
    }

    const handleA=()=>{
        if(resultA===false){
            setResultA(true)
        } else {
            setResultA(false)
        }
    }
    const handleB=()=>{
        if(resultB===false){
            setResultB(true)
        } else {
            setResultB(false)
        }
    }
    const handleC=()=>{
        if(resultC===false){
            setResultC(true)
        } else {
            setResultC(false)
        }
    }
    const handleD=()=>{
        if(resultD===false){
            setResultD(true)
        } else {
            setResultD(false)
        }
    }

    return(
        <container className='createQuiz'>
            <div className='pageDescription'>
                <h1 className='introText'>Add Your Answers Here:</h1>
            </div>
            <form 
            onSubmit={handleSubmit}
            className={classes.root}
            id='copyInputFields'>
                <div className='answerInput'>
                    <TextField
                    name='answer'
                    label='Answer A'
                    variant='filled'
                    value={answerA}
                    onChange={(e)=>setAnswerA(e.target.value)}
                    />
                    <h1>Correct?</h1>
                    <Checkbox
                    name='checked'
                    color='primary'
                    value={resultA}
                    onChange={()=>handleA()}
                    />
                </div>
                {/* answer B */}
                <div className='answerInput'>
                    <TextField
                    name='answer'
                    label='Answer B'
                    variant='filled'
                    value={answerB}
                    onChange={(e)=>setAnswerB(e.target.value)}
                    />
                    <h1>Correct?</h1>
                    <Checkbox
                    name='checked'
                    color='primary'
                    value={resultB}
                    onChange={()=>handleB()}
                    />
                </div>
                {/* answer C */}
                <div className='answerInput'>
                    <TextField
                    name='answer'
                    label='Answer C'
                    variant='filled'
                    value={answerC}
                    onChange={(e)=>setAnswerC(e.target.value)}
                    />
                    <h1>Correct?</h1>
                    <Checkbox
                    name='checked'
                    color='primary'
                    value={resultC}
                    onChange={()=>handleC()}
                    />
                </div>
                {/* answer D */}
                <div className='answerInput'>
                <TextField
                name='answer'
                label='Answer D'
                variant='filled'
                value={answerD}
                onChange={(e)=>setAnswerD(e.target.value)}
                />
                <h1>Correct?</h1>
                <Checkbox
                name='checked'
                color='primary'
                value={resultD}
                onChange={()=>handleD()}
                />
                </div>
                
                <button
                className='buttons'
                type='submit' 
                onClick={()=>{submitAndQuestions()}}>
                    Add Another Question
                </button>
                <button
                className='buttons'
                type='submit'
                onClick={()=>{submitAndResults()}}>
                    Submit and Finish
                </button>
            </form>
            <footer>
                <p>Remember to check the checkbox if your answer is a correct answer.</p>
            </footer>
        </container>
    )
}

const mapStateToProps=(store)=>{return store}

export default connect(mapStateToProps, {setQuestion, addAnswer})(AddAnswers)

