import {Link} from 'react-router-dom'
import {Line} from 'react-chartjs-2'
import {useState, useEffect} from 'react'
import axios from 'axios'
import './Profile.css'

const Profile=(props)=>{
    const [results, setResults] = useState([])

    useEffect(() => {
        axios.get('/api/results/')
        .then(({data})=>{
            setResults(data)
        })
        .catch(err=>console.log(err))
    }, [])

    let newResults = results.map(result=>result.result)
    let newTaken = results.map((r, index)=>index+1)
    return(
        <div className='profile'>
            <div className='options'>
                <Link to='/createquiz'>
                    <button className='buttons'>Create A Quiz</button>
                </Link>
                <Link to='/myquizzes'>
                    <button className='buttons'>My Quizzes</button>
                </Link>
            </div>
            
            <h1 className='myResults'>My Results</h1>
            <Line
            height={400}
            width={600}
            options={{
                maintainAspectRatio: false
            }}
            data={{
                labels: [0, ...newTaken], 
                datasets: [{
                    label: `results as percentages`,
                    data: [0, ...newResults],
                }],
                backgroundColor: [
                    'rgba(54, 162, 235, 0.2)'
                ],
            }}
            />
            <footer>
                <p>Don't see any results in your chart? Try taking a quiz in the explore page.</p>
            </footer>
        </div>
    )
}

export default Profile