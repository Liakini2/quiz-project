import {useEffect, useState} from 'react'
import axios from 'axios'

//Redux
import {connect} from 'react-redux'
import {addQuestion} from '../../Redux/questionReducer'



//Material UI
import Button from '@material-ui/core/Button'
import {makeStyles} from '@material-ui/core/styles'
import { Container, TextField } from '@material-ui/core'
import { Checkbox } from '@material-ui/core'

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
        <Container>
            <form
            onSubmit={handleSubmit}
            className={classes.root}>
                <p>{questions[index]?questions[index].question:''}</p>
                <TextField
                name='question'
                label='Type here to change your question'
                variant='filled'
                value={question}
                onChange={(e)=>setQuestion(e.target.value)}
                />

                {altAnswers.map((answer, index)=>{
                    return <section key={answer.answer_id}>
                        <p>{answers[index].answer}</p>
                        <TextField
                        name='answer'
                        label={`answer ${String.fromCharCode(65+index)}`}
                        variant='filled'
                        value={answer.answer}
                        onChange={(e)=>changeAnswer(index, e.target.value)}
                        />
                        <h1>Correct Answer?</h1>
                        <Checkbox
                        name='checked'
                        color='primary'
                        value={answer.result}
                        checked={answer.result}
                        onChange={()=>changeResult(index)}
                        />
                    </section>
                })}

                <Button
                className={classes.button}
                variant='contained'
                color='primary'
                type='submit'
                onClick={()=>{
                    submitQuestion()
                }}
                >
                    {index<questions.length-1? 'Submit and Next' : 'Submit Changes'}
                </Button>

                <br></br>

                {questions.length>1? 
                <Button
                id='deleteButton'
                className={classes.button}
                variant='contained'
                color='secondary'
                type='submit'
                onClick={()=>{
                    deleteQuestion()
                }}>
                    Delete Question
                </Button>:
                console.log(questions.length)    
                }
            </form>
        </Container>
    )
}

const mapStateToProps=(store)=>{return store}

export default connect(mapStateToProps, {addQuestion})(EditQuestions)