import axios from 'axios'
import {useEffect, useState} from 'react'
import './TakeAQuiz.css' 

const Result = ({history, match, ...props}) => {
    const [userResult, setUserResult] = useState(0)
    useEffect(() => {
        axios.get(`/api/result/${match.params.result_id}`)
        .then(({data})=>{
            console.log(data)
            setUserResult(data)
        })
        .catch(err=>console.log(err))
    }, [match.params.result_id])

    return (
        <div className='grandTotal'>
            <h1 className='yourResult'>YOU GOT {userResult.result}%</h1>
        </div>
    )
}

export default Result
