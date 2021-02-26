import {useState, useEffect} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import {setQuizzes} from '../../Redux/quizReducer'

const Explore =({setQuizzes, quizReducer, ...props})=>{
    const [search, setSearch] = useState('')

    useEffect(()=>{
        axios.get('/api/quizzes')
        .then(res => setQuizzes(res.data))
        .catch(err=>console.log(err))
    }, [setQuizzes])

    const filterSearch=(search)=>{
        quizReducer.quizzes.filter((quiz)=>{
            return quiz.title.toLowerCase().includes(search.toLowerCase())
        })
    }
    console.log(props)
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
                {quizReducer.quizzes.map((quiz)=>(
                    <div key={quiz.quiz_id}>
                        <h1>{quiz.title}</h1>
                        <img src={quiz.quiz_image} alt='quiz'/>
                        <h1>{quiz.description}</h1>
                        <h1>{quiz.type}</h1>
                    </div>
                ))}
            </div>
        </div>
    )
}

const mapStateToProps = (store) =>{return store}

export default connect(mapStateToProps, {setQuizzes})(Explore)