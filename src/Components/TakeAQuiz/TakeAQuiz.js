import {useState, useEffect} from 'react'
import axios from 'axios'

//Redux

//Material UI
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
    const [answers, setAnswers] = useState([])
    const [index, setIndex] = useState(0)

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
            })
        }
    },[questions, index])

    return (
        <div>
            <section>
                <p>{questions[index]?questions[index].question:''}</p>
                {answers.map((e, i)=>{
                    return <span key={i}>
                        <input  
                        type='radio'
                        value={e.answer}
                        id={e.answer_id} 
                        name='answers'
                        />
                        <label htmlFor={e.answer_id}>{e.answer}</label>
                    </span>
                })}
            </section>
            {index<questions.length-1?
            <Button
            className={classes.button}
            variant='contained'
            color='primary'
            type='submit'
            onClick={()=>setIndex(index+1)}
            >
                Answer and Next Question
            </Button>:
            <Button
            className={classes.button}
            variant='contained'
            color='primary'
            type='submit'
            // onClick={}
            >
                Get Results    
            </Button>}
        </div>
    )
}

export default TakeAQuiz
