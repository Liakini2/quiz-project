import './TakeAQuiz.css'
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

const TakeAQuiz=({match, history, ...props})=>{
    const classes = useStyles()
    const [questions, setQuestions] = useState([])
    const [answers, setAnswers] = useState([])
    const [index, setIndex] = useState(0)
    const [results, setResults] = useState([])
    const [userResults, setUserResults] = useState([])
    const [result, setResult] = useState(0)

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
    
    useEffect(() => {
        let copyArr = []
        answers.forEach((answer, index)=>{
            if(answer.result===true){
                copyArr.push(index)
                setResults([...results, ...copyArr])
            }
        })
    }, [answers])

    const handleUserResult=(id, i)=>{
        let copyArrTwo = []
        if(document.getElementById(id).checked){
            copyArrTwo.push(i)
            setUserResults([...userResults, ...copyArrTwo])
            document.getElementById(id).checked=false
        }
        if(index<questions.length-1){
            setIndex(index+1)
        } else {
            let showButton = document.getElementsByClassName('calculate')
            for (let i=0; i<showButton.length; i+=1){
                showButton[i].style.display='block'
            }
             
        }
    }

    const hideButton=()=>{
        let showButton = document.getElementsByClassName('calculate')
        for (let i=0; i<showButton.length; i+=1){
            showButton[i].style.display='none'
        }
    }
    
    const findResult=()=>{
        let rightAnswers = []
        for(let i=0; i<results.length; i++){
            if(results[i]===userResults[i]){
                rightAnswers.push(results[i])
            }
        }
        setResult(Math.round((rightAnswers.length/results.length)*100))
        let showButton = document.getElementsByClassName('results')
        for (let i=0; i<showButton.length; i+=1){
            showButton[i].style.display='block'
        }
    }
    
    const sendResult=()=>{
        axios.post(`/api/result/${match.params.quiz_id}`, {result})
        .then(({data})=>{
            history.push(`/quizresult/${data.result_id}`)
        })
        .catch(err=>console.log(err))
    }

    return (
        <div className='takeAQuiz'>
            <section className='quiz'>
                <p className='question'>{questions[index]?questions[index].question:''}</p>
                {answers.map((e, i)=>{
                    return <Button 
                    className={classes.button}
                    variant='contained'
                    type='submit'
                    key={i}>
                        <input  
                        type='radio'
                        value={e.answer}
                        id={e.answer_id} 
                        name='userResult'
                        onChange={()=>{handleUserResult(e.answer_id, i)}}
                        />
                        <label htmlFor={e.answer_id}>{e.answer}</label>
                    </Button>
                })}
            </section>
            <button
            className='calculate buttons'
            variant='contained'
            type='submit'
            onClick={()=>{
                findResult()
                hideButton()
            }}>
                Calculate Your Results!
            </button>
            <button
            className='results buttons'
            variant='contained'
            type='submit'
            onClick={()=>{
                sendResult()
            }}>
                Get Results
            </button>
            <footer>
                <p>Select an answer to move on to the next question.</p>
            </footer>
        </div>
    )
}

export default TakeAQuiz
