//imported to use state and lifecycle methods
import axios from 'axios'
import {useState, useEffect} from 'react'

//Redux
import {connect} from 'react-redux'
import {setQuestion} from '../../../Redux/questionReducer'
import {addAnswer} from '../../../Redux/answersReducer'

//Routing
// import {Redirect} from 'react-router-dom'

//material ui styling and form
import Container from '@material-ui/core/Container'
import TextField from '@material-ui/core/TextField'
import {makeStyles} from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
// import IconButton from '@material-ui/core/IconButton'
// import RemoveIcon from '@material-ui/icons/Remove'
// import AddIcon from '@material-ui/icons/Add'

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

const AddAnswers=({setQuestion, questionReducer, answersReducer, addAnswers, match, history, ...props})=>{
    const classes= useStyles()
    const [questionId, setQuestionId] = useState('')
    const [quizId, setQuizId] = useState('')
    const [answerA, setAnswerA] = useState('')
    const [answerB, setAnswerB] = useState('')
    const [answerC, setAnswerC] = useState('')
    const [answerD, setAnswerD] = useState('')


    useEffect(()=>{
        axios.get(`/api/question/${match.params.question_id}`)
        .then(({data})=>{
            setQuestion(data)
            setQuestionId(questionReducer.setQuestion.question_id)
            setQuizId(questionReducer.setQuestion.quiz_id)
        })
    },[match.params.question_id, questionReducer.setQuestion.question_id, questionReducer.setQuestion.quiz_id, setQuestion])  

    const submitAndQuestions=()=>{
        axios.post(`/api/answer/${questionId}`, {quizId, answerA, answerB, answerC, answerD})
            .then(({data})=>{
                addAnswer(data)
                history.push(`/addquestions/${questionReducer.setQuestion.quiz_id}`)
            })
            .catch((err)=>console.log(err))
    }

    const submitAndResults=()=>{
        axios.post(`/api/answer/${questionId}`, {quizId, answerA, answerB, answerC, answerD})
        .then(({data})=>{
            addAnswer(data)
            // history.push(`/addresults/${questionReducer.setQuestion.quiz_id}`)
        })
        .catch((err)=>console.log(err))
    }
     
    const handleSubmit=(e)=>{
        e.preventDefault()
    }

    return(
        <Container>
            <h1>Add Your Answers Here:</h1>
            <form 
            onSubmit={handleSubmit}
            className={classes.root}>
                <TextField
                name='answer'
                label='Answer A'
                variant='filled'
                value={answerA}
                onChange={(e)=>setAnswerA(e.target.value)}
                />
                <TextField
                name='answer'
                label='Answer B'
                variant='filled'
                value={answerB}
                onChange={(e)=>setAnswerB(e.target.value)}
                />
                <TextField
                name='answer'
                label='Answer C'
                variant='filled'
                value={answerC}
                onChange={(e)=>setAnswerC(e.target.value)}
                />
                <TextField
                name='answer'
                label='Answer D'
                variant='filled'
                value={answerD}
                onChange={(e)=>setAnswerD(e.target.value)}
                />
                <Button
                className={classes.button} 
                variant='contained' 
                color='primary' 
                type='submit' 
                onClick={()=>{submitAndQuestions()}}>
                    Submit and Add Another Question
                </Button>
                <Button
                className={classes.button}
                variant='contained'
                color='primary'
                type='submit'
                onClick={()=>{submitAndResults()}}>
                    Submit and Results
                </Button>
            </form>
        </Container>
    )
}

const mapStateToProps=(store)=>{return store}

export default connect(mapStateToProps, {setQuestion, addAnswer})(AddAnswers)


// const AddAnswers=({setQuestion, questionReducer, answersReducer, addAnswers, match, history, ...props})=>{
//     const classes= useStyles()
//     const [questionId, setQuestionId] = useState('')
//     const [answers, setAnswers] = useState([{answer: ''},])


//     useEffect(()=>{
//         axios.get(`/api/question/${match.params.question_id}`)
//         .then(({data})=>{
//             setQuestion(data)
//             setQuestionId(questionReducer.setQuestion.question_id)
//         })
//     },[match.params.question_id, questionReducer.setQuestion.question_id, setQuestion])  

//     // if(!props.username){
//     //     return <Redirect to={{
//     //         pathname: '/',
//     //         state: {from: props.location}
//     //     }}/>
//     // }


//     const addAnswer=(props)=>{
//         axios.post(`/api/answer/${questionId}`, {answers})
//         .then(({data})=>{
//             addAnswers(data)
//         })
//     }

//     const handleChangeInput=(index, e)=>{
//         console.log(index, e.target.name)
//         const values =[...answers]
//         values[index][e.target.name] = e.target.value
//         setAnswers(values)
//     }
     
//     const handleSubmit=(e)=>{
//         e.preventDefault()
//     }

//     const handleAddAnswer=()=>{
//         setAnswers([...answers, {answer: ''}])
//     }

//     const handleRemoveAnswer=(index)=>{
//         const values = [...answers]
//         values.splice(index, 1)
//         setAnswers(values)
//     }

//     console.log(props)
//     return(
//         <Container>
//             <h1>Add Your Answers Here:</h1>
//             <form 
//             onSubmit={handleSubmit}
//             className={classes.root}>
//                 {answers.map((answer, index)=>(
//                     <div key={index}>
//                         <TextField
//                         name='answer'
//                         label='Answer'
//                         variant='filled'
//                         value={answer.answer}
//                         onChange={(e)=>handleChangeInput(index, e)}
//                         />
//                     <IconButton onClick={()=>{handleRemoveAnswer(index)}}>
//                         <RemoveIcon/>
//                     </IconButton>
//                     <IconButton onClick={()=>{handleAddAnswer()}}>
//                         <AddIcon/>
//                     </IconButton>
//                     </div>
//                 ))}
//                 <Button
//                 className={classes.button} 
//                 variant='contained' 
//                 color='primary' 
//                 type='submit' 
//                 onClick={()=>{
//                     // handleSubmit()
//                     addAnswers()
//                 }}>
//                     Submit and Add Another Question
//                 </Button>
//                 <Button
//                 className={classes.button}
//                 variant='contained'
//                 color='primary'
//                 type='submit'
//                 onClick={()=>{
//                     // handleSubmit()
//                     addAnswer()
//                     history.push('/myquizzes')
//                 }}
//                 >
//                     Submit and Finish
//                 </Button>
//             </form>
//         </Container>
//     )
// }

// const mapStateToProps=(store)=>{return store}

// export default connect(mapStateToProps, {setQuestion, addAnswer})(AddAnswers)