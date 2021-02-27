import {Link} from 'react-router-dom'
// import {useState, useEffect} from 'react'
// import axios from 'axios'
// import axios from 'axios'
// import {connect} from 'react-redux'
// import {  } from '../../Redux/quizReducer'

const EditQuiz=(props)=>{
    console.log(props)
    // useEffect(()=>{
    //     axios.get(`/api/quiz/${props.match.params.id}`)
    //     .then(({data}=>))
    // },[])
    return(
        <div>
            <Link to='/myquizzes'>

                <button>Cancel Edit</button>
            </Link>
        </div>
    )
}

export default EditQuiz