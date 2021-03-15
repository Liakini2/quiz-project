import {useEffect, useState} from 'react'
import axios from 'axios'
import './EditQuiz.css'

//Redux
import {connect} from 'react-redux'
import {addQuestion} from '../../Redux/questionReducer'



//Material UI
import {makeStyles} from '@material-ui/core/styles'
import { TextField } from '@material-ui/core'
import { Checkbox } from '@material-ui/core'

const useStyles = makeStyles((theme)=>({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1)
        }
    }
}))

const EditQuestions=({history, ddQuestion, addAnswer, match, ...props})=>{
    const classes = useStyles()
    const [index, setIndex] = useState(0)
    const [questions, setQuestions] = useState([])
    const [question, setQuestion] = useState('')
    const [question_id, setQuestionId] = useState(0)
    const [answers, setAnswers] = useState([])
    const [altAnswers, setAltAnswers] = useState([])

    useEffect(()=>{
        axios.get(`/api/questions/${match.params.quiz_id}`)
        .then(({data})=>{
            setQuestions(data)
        })
        .catch(err=>console.log(err))
    },[match.params.quiz_id])

    useEffect(()=>{
        if(questions[index]){
            axios.get(`/api/answers/${questions[index].question_id}`)
            .then(({data})=>{
                setAnswers(data)
                setQuestionId(questions[index].question_id)
                setQuestion(questions[index].question)
            })
        } 
    },[questions, index])

    useEffect(()=>{
        setAltAnswers(answers)
    },[answers])

    const handleSubmit=(e)=>{
        e.preventDefault()
    }

    //Input field edits
    const submitQuestion=()=>{
        axios.put(`/api/question/${question_id}`, {question, answers: altAnswers})
        .then(({data})=>{
            // addQuestion(data)
            if(index+1===questions.length){
                history.push('/myquizzes')
            } else {
                setIndex((i)=>i+1)
            }
        })
        .catch(err=>console.log(err))
    }

    const changeAnswer=(index, value)=>{
        let copyArr = altAnswers.slice()
        copyArr.splice(index, 1, {...altAnswers[index], answer: value})
        setAltAnswers(copyArr)
    }

    const changeResult=(index)=>{
        let copyArr = altAnswers.slice()
        copyArr.splice(index, 1, {...altAnswers[index], result: !altAnswers[index].result})
        setAltAnswers(copyArr)
    }

    const deleteQuestion=()=>{
        axios.delete(`/api/question/${question_id}`)
        .then(({data})=>{
            axios.get(`/api/questions/${match.params.quiz_id}`)
        .then(({data})=>{
            setQuestions(data)
            setIndex(0)
        })
        .catch(err=>console.log(err))
        })
        .catch(err=>console.log(err))
    }

    return (
        <container className='editQuestions'>
            <form
            onSubmit={handleSubmit}
            className={classes.root}>
                <div className='aboutEditQuiz'>
                    <p className='introText'>Edit Your Question</p>
                </div>
                <p className='currentValue'>{questions[index]?questions[index].question:''}</p>
                <TextField
                name='question'
                label='Change Question Here'
                variant='filled'
                value={question}
                onChange={(e)=>setQuestion(e.target.value)}
                />

                <div className='aboutEditQuiz'>
                    <p className='introText'>Edit Your Answers</p>
                </div>

                {altAnswers.map((answer, index)=>{
                    return <section key={answer.answer_id}>
                        <p className='currentValue'>{answers[index].answer}</p>
                        <div className='answerInput altAnswerInput'>
                            <TextField
                            name='answer'
                            label={`answer ${String.fromCharCode(65+index)}`}
                            variant='filled'
                            value={answer.answer}
                            onChange={(e)=>changeAnswer(index, e.target.value)}
                            />
                            <h1>Correct?</h1>
                            <Checkbox
                            name='checked'
                            color='primary'
                            value={answer.result}
                            checked={answer.result}
                            onChange={()=>changeResult(index)}
                            />
                        </div>
                    </section>
                })}

                <button
                className='buttons'
                type='submit'
                onClick={()=>{
                    submitQuestion()
                }}
                >
                    {index<questions.length-1? 'Submit and Next' : 'Submit Changes'}
                </button>

                <br></br>

                {questions.length>1? 
                <button
                id='deleteButton'
                className='buttons'
                type='submit'
                onClick={()=>{
                    deleteQuestion()
                }}>
                    Delete Question
                </button>:
                console.log(questions.length)    
                }
            </form>
        </container>
    )
}

const mapStateToProps=(store)=>{return store}

export default connect(mapStateToProps, {addQuestion})(EditQuestions)