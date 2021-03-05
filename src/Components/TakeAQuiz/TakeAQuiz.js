import {useState, useEffect} from 'react'
import axios from 'axios'

import Button from '@material-ui/core/Button'
import {makeStyles} from '@material-ui/core/styles'
const useStyles = makeStyles((theme)=>({
    button: {
        margin: theme.spacing(1)
    }
}))

const TakeAQuiz=({match, ...props})=> {
    const classes = useStyles()
    const [questions, setQuestions] = useState([])

    useEffect(()=>{
        axios.get(`/api/questions/${match.params.quiz_id}`)
        .then(({data})=>{
            console.log(data)
            setQuestions(data)
        })
        .catch(err=>console.log(err))
    },[match.params.quiz_id])



    return (
        <div>
            {questions.map((question, index)=>(
                <div key={question.question_id}>
                    <h1>{question.question}</h1>
                    <img src={question.question_image} alt='quiz question'/>
                </div>
            ))}
            <Button
            className={classes.button}
            variant='contained'
            color='primary'
            type='submit'
            // onClick={}
            >
                Answer and Next Question
            </Button>
        </div>
    )
}

export default TakeAQuiz
