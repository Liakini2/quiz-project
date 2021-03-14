import axios from 'axios'
import {useEffect, useState} from 'react'

const Result = ({match, ...props}) => {
    const [userResult, setUserResult] = useState(0)
    useEffect(() => {
        axios.get(`/api/result/${match.params.quiz_id}`)
        .then(({data})=>{
            setUserResult(data)
        })
        .catch(err=>console.log(err))
    }, [match.params.quiz_id])

    return (
        <div>
            <h1>YOU GOT {userResult.result}%</h1>
            <button>

            </button>
        </div>
    )
}

export default Result
