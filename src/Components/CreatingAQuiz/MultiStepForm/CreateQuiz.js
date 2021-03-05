import {useState} from 'react'
import axios from 'axios'
//Routing
import {Link} from 'react-router-dom'

//Redux
import {connect} from 'react-redux'
import {submitQuiz} from '../../../Redux/quizReducer'

//material-ui
import Container from '@material-ui/core/Container'
import TextField from '@material-ui/core/TextField'
import {makeStyles} from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'

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

const CreateQuiz=(props)=>{
    const classes = useStyles()
    const [quizImage, setQuizImage] = useState('')
    //eventually modify this to be a drop down menu
    const [type, setType] = useState('')
    const [description, setDescription] = useState('') 
    const [title, setTitle] = useState('')

    const addQuiz=()=>{
        axios.post('/api/quizzes', {quizImage, type, description, title})
        .then(({data})=>{
            console.log(data)
            props.submitQuiz(data)
            props.history.push(`/addquestions/${data.quiz_id}`)
        })
        .catch(err=>console.log(err))
    }

    const handleSubmit=(e)=>{
        e.preventDefault()
    }

    return(
        <Container>
            <h1>Create a quiz</h1>
            <Link to='/profile'>
                <button>Cancel</button>
            </Link>
            <form
            onSubmit={handleSubmit}
            className={classes.root}>
                <TextField
                name='quizImage'
                label='Quiz Image'
                variant='filled'
                value={quizImage}
                onChange={(e)=>setQuizImage(e.target.value)}
                />
                <TextField
                name='quizType'
                label='Quiz Type'
                variant='filled'
                value={type}
                onChange={(e)=>setType(e.target.value)}
                />
                <TextField
                name='quizDescription'
                label='Quiz Description'
                variant='filled'
                value={description}
                onChange={(e)=>setDescription(e.target.value)}
                />
                <TextField
                name='quizTitle'
                label='Quiz Title'
                variant='filled'
                value={title}
                onChange={(e)=>setTitle(e.target.value)}
                />
                <Button 
                className={classes.button}
                variant='contained'
                color='primary'
                type='submit'
                onClick={()=>{addQuiz()}}>
                    Submit & Next
                </Button>
            </form>
        </Container>
    )
}

export default connect(null, {submitQuiz})(CreateQuiz)