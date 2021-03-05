import {useState, useEffect} from 'react'
import axios from 'axios'

//redux
import {connect} from 'react-redux'
import {setQuizzes} from '../../Redux/quizReducer'

//material-ui
// import Button from '@material-ui/core/Button'
// import {makeStyles} from '@material-ui/core/styles'
// const useStyles = makeStyles((theme)=>({
//     button: {
//         margin: theme.spacing(1)
//     }
// }))

const Explore =({setQuizzes, quizReducer, history, ...props})=>{
    // const classes = useStyles()
    const [search, setSearch] = useState('')

    useEffect(()=>{
        axios.get('/api/quizzes')
        .then(res => setQuizzes(res.data))
        .catch(err=>console.log(err))
    }, [setQuizzes])

    const filterSearch=(search)=>{
        quizReducer.setQuizzes.filter((quiz)=>{
            return quiz.title.toLowerCase().includes(search.toLowerCase())
        })
    }

    return(
        <div>
            <h1>Explorer Page</h1>
            <input 
            placeholder='Search'
            value={search}
            onChange={(e)=>{setSearch(e.target.value)}}
            />
            <button
            onClick={()=>{filterSearch(search)}}
            >
                Search
            </button>

            <div>
                {quizReducer.setQuizzes.map((quiz)=>(
                    <div key={quiz.quiz_id}>
                        <h1>{quiz.title}</h1>
                        <img src={quiz.quiz_image} alt='quiz'/>
                        <h1>{quiz.description}</h1>
                        <h1>{quiz.type}</h1>
                        <button
                        type='submit'
                        onClick={()=>{
                            history.push(`/takequiz/${quiz.quiz_id}`)
                        }}
                        >
                            Take this Quiz!
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}

const mapStateToProps = (store) =>{return store}

export default connect(mapStateToProps, {setQuizzes})(Explore)