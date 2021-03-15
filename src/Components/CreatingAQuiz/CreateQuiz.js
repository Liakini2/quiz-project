import {useState} from 'react'
import axios from 'axios'
import './CreateQuiz.css'

//Routing
import {Link} from 'react-router-dom'

//Redux
import {connect} from 'react-redux'
import {submitQuiz} from '../../Redux/quizReducer'

//material-ui
import TextField from '@material-ui/core/TextField'
import {makeStyles} from '@material-ui/core/styles'

const useStyles = makeStyles((theme)=>({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1)
        }
    }
}))


const CreateQuiz=(props)=>{
    const classes = useStyles()
    const [quiz_image, setQuizImage] = useState('')
    const [type, setType] = useState('')
    const [description, setDescription] = useState('') 
    const [title, setTitle] = useState('')

    const addQuiz=()=>{
        axios.post('/api/quizzes', {quiz_image, type, description, title})
        .then(({data})=>{
            props.submitQuiz(data)
            props.history.push(`/addquestions/${data.quiz_id}`)
        })
        .catch(err=>console.log(err))
    }

    const handleSubmit=(e)=>{
        e.preventDefault()
    }

    return(
        <div className='createQuiz'>
            <div className='pageDescription'>
                <h1 className='introText'>Create A Quiz</h1>
            <Link to='/profile'>
                <button className='altButtons'>Cancel</button>
            </Link>
            </div>
            <form
            onSubmit={handleSubmit}
            className={classes.root}
            id='inputFields'
            >
                <TextField
                name='quizImage'
                label='Quiz Image'
                variant='filled'
                value={quiz_image}
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
                <button 
                className='buttons'
                type='submit'
                onClick={()=>{addQuiz()}}>
                    Submit & Next
                </button>
            </form>
            <footer>
                <p>
                Use this page to create your own quiz! If you make a mistake don't worry! You can edit your quizzes under the 'My Quizzes' page in your profile.
                </p>
            </footer>
        </div>
    )
}

export default connect(null, {submitQuiz})(CreateQuiz)