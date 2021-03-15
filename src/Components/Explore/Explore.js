import './Explore.css'
import {useState, useEffect} from 'react'
import axios from 'axios'

//redux
import {connect} from 'react-redux'
import {setQuizzes} from '../../Redux/quizReducer'

const Explore =({setQuizzes, quizReducer, history, ...props})=>{
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
        <div className='expore'>
            <div className='aboutExplore'>
                <input 
                className='searchBar'
                placeholder='Search...'
                value={search}
                onChange={(e)=>{setSearch(e.target.value)}}
                />
                <button
                className='altButtons'
                onClick={()=>{filterSearch(search)}}
                >
                    Search 
                </button>
            </div>

            <div className='quizDisplay'>
                {quizReducer.setQuizzes.map((quiz)=>(
                    <div 
                    className='quizCards'
                    key={quiz.quiz_id}>
                        <h1 className='quizTitle'>{quiz.title}</h1>
                        <img className='quizImage' src={quiz.quiz_image} alt='quiz'/>
                        <h1>{quiz.description}</h1>
                        <h1>{quiz.type}</h1>
                        <button
                        className='buttons'
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
            <footer>
                <h1 className='pageDescription'>
                Use this page to find quizzes created by other users and test your knowledge!
                To create a quiz or view your results visit your profile.
                </h1>
            </footer>
        </div>
    )
}

const mapStateToProps = (store) =>{return store}

export default connect(mapStateToProps, {setQuizzes})(Explore)