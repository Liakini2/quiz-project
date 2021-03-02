//imported to use state and lifecycle methods
import axios from 'axios'
import {useState, useEffect} from 'react'

//Redux
import {connect} from 'react-redux'
import {setQuiz} from '../../Redux/quizReducer'

//Routing
// import {Redirect} from 'react-router-dom'

//material ui styling and form
import Container from '@material-ui/core/Container'
import TextField from '@material-ui/core/TextField'
import {makeStyles} from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import RemoveIcon from '@material-ui/icons/Remove'
import AddIcon from '@material-ui/icons/Add'
import Icon from '@material-ui/core/icon'

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


const AddQuestions=({setQuiz, quizReducer, match, ...props})=>{
    const classes= useStyles()
    const [quizId, setQuizId] = useState('')
    const [questions, setQuestions] = useState([{question: '', questionImage: '', answers:[]}])
    const [inputFields, setInputFields] = useState([{answer: ''},])
    
    useEffect(()=>{
        axios.get(`/api/quiz/${match.params.id}`)
        .then(({data})=>{
            setQuiz(data)
            setQuizId(quizReducer.setUserQuiz.quiz_id)
        })
    },[match.params.id, quizReducer.setUserQuiz.quiz_id, setQuiz])  

    //if I have time add Protected Routes
    // if(!props.username){
    //     return <Redirect to={{
    //         pathname: '/',
    //         state: {from: props.location}
    //     }}/>
    // }

    //handle functions for questions
    const handleQuestion=(index, e)=>{
        console.log(index, e.target.name)
        const values=[...questions]
        values[index][e.target.name] = e.target.value
        setQuestions(values)
    }

    const handleAddQuestion=()=>{
        setQuestions([...questions, {question: '', questionImage: '', answers:[]}])
    }

    const handleRemoveQuestion=(index)=>{
        const values = [...questions]
        values.splice(index, 1)
        setQuestions(values)
    }


    //handle functions for answers
    const handleChangeInput=(index, e)=>{
        console.log(index, e.target.name)
        const values =[...inputFields]
        values[index][e.target.name] = e.target.value
        setInputFields(values)
    }
     
    const handleAddAnswer=()=>{
        setInputFields([...inputFields, {answer: ''}])
    }
    
    const handleRemoveAnswer=(index)=>{
        const values = [...inputFields]
        values.splice(index, 1)
        setInputFields(values)
    }
    
    const handleSubmit=(e)=>{
        e.preventDefault()
    }

    console.log(props)
    return(
        <Container>
            <h1>Add Your Questions Here:</h1>
            <form 
            onSubmit={handleSubmit}
            className={classes.root}>
                {questions.map((question, index)=>(
                    <div key={index}>
                        <TextField
                        name='question'
                        label='Type your Question Here'
                        variant='filled'
                        value={question.question}
                        onChange={(e)=>{handleQuestion(index, e)}}
                        />
                        <TextField
                        name='questionImage'
                        label='Question Image as URL'
                        variant='filled'
                        value={question.questionImage}
                        onChange={(e)=>{handleQuestion(index, e)}}
                        />
                        <IconButton onClick={()=>{handleRemoveQuestion(index)}}>
                                <RemoveIcon/>
                            </IconButton>
                            <IconButton onClick={()=>{handleAddQuestion()}}>
                                <AddIcon/>
                            </IconButton>
                        {inputFields.map((inputField, i)=>(
                            <div key={i}>
                                <TextField
                                name='answer'
                                label='Type Your Answers Here'
                                variant='filled'
                                value={inputField.answer}
                                onChange={(e)=>handleChangeInput(i, e)}
                                />
                            <IconButton onClick={()=>{handleRemoveAnswer(i)}}>
                                <RemoveIcon/>
                            </IconButton>
                            <IconButton onClick={()=>{handleAddAnswer()}}>
                                <AddIcon/>
                            </IconButton>
                            </div>
                        ))}
                    </div>
                ))}
                <Button
                onClick={handleSubmit}
                className={classes.button} 
                variant='contained' 
                color='primary' 
                type='submit' 
                endIcon={<Icon>send</Icon>}>
                    Send
                </Button>
            </form>
        </Container>
    )
}

const mapStateToProps=(store)=>{return store}

export default connect(mapStateToProps, {setQuiz})(AddQuestions)




//Previous version single question

// const AddQuestions=({setQuiz, quizReducer, match, ...props})=>{
//     const classes= useStyles()
//     const [questionImage, setQuestionImage] = useState('')
//     const [question, setQuestion] = useState('')
//     const [quizId, setQuizId] = useState('')
//     const [inputFields, setInputFields] = useState([{answer: ''},])
    
//     useEffect(()=>{
//         axios.get(`/api/quiz/${match.params.id}`)
//         .then(({data})=>{
//             setQuiz(data)
//             setQuizId(quizReducer.setUserQuiz.quiz_id)
//         })
//     },[match.params.id, quizReducer.setUserQuiz.quiz_id, setQuiz])  

//     // if(!props.username){
//     //     return <Redirect to={{
//     //         pathname: '/',
//     //         state: {from: props.location}
//     //     }}/>
//     // }


//     // const addQuestion=(props)=>{
//     //     axios.post(`/api/question/${quizId}`, [ ])
//     //     .then(({data})=>{

//     //     })
//     // }

//     const handleChangeInput=(index, e)=>{
//         const values =[...inputFields]
//         values[index][e.target.name] = e.target.value
//         setInputFields(values)
//     }
     
//     const handleSubmit=(e)=>{
//         e.preventDefault()
//     }

//     const handleAddAnswer=()=>{
//         setInputFields([...inputFields, {answer: ''}])
//     }

//     const handleRemoveAnswer=(index)=>{
//         const values = [...inputFields]
//         values.splice(index, 1)
//         setInputFields(values)
//     }

//     console.log(props)
//     return(
//         <Container>
//             <h1>Add Your Questions Here:</h1>
//             <form 
//             onSubmit={handleSubmit}
//             className={classes.root}>
//                 <TextField
//                 name='question'
//                 label='Type your Question Here'
//                 variant='filled'
//                 value={question}
//                 onChange={(e)=>{setQuestion(e.target.value)}}
//                 />
//                 <TextField
//                 name='questionImage'
//                 label='Question Image as URL'
//                 variant='filled'
//                 value={questionImage}
//                 onChange={(e)=>{setQuestionImage(e.target.value)}}
//                 />
//                 {inputFields.map((inputField, index)=>(
//                     <div key={index}>
//                         <TextField
//                         name='answer'
//                         label='Answer'
//                         variant='filled'
//                         value={inputField.answer}
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
//                 onClick={handleSubmit}
//                 className={classes.button} 
//                 variant='contained' 
//                 color='primary' 
//                 type='submit' 
//                 endIcon={<Icon>send</Icon>}>
//                     Send
//                 </Button>
//             </form>
//         </Container>
//     )
// }

// const mapStateToProps=(store)=>{return store}

// export default connect(mapStateToProps, {setQuiz})(AddQuestions)