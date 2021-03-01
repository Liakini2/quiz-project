import {useState} from 'react'

const AddQuestions=(props)=>{
    const [questionImage, setQuestionImage] = useState('')
    const [question, setQuestion] = useState('')
    const [answerA, setAnswerA] = useState('')
    const [answerB, setAnswerB] = useState('')
    const [answerC, setAnswerC] = useState('')
    const [answerD, setAnswerD] = useState('')
    
    return(
        <div>
            <input
            placeholder='question image'
            value={questionImage}
            onChange={(e)=>{setQuestionImage(e.target.value)}}
            />
            <input
            placeholder='question'
            value={question}
            onChange={(e)=>{setQuestion(e.target.value)}}
            />
            <input
            placeholder='Answer A'
            value={answerA}
            onChange={(e)=>{setAnswerA(e.target.value)}}
            />
            <input
            placeholder='Answer B'
            value={answerB}
            onChange={(e)=>{setAnswerB(e.target.value)}}
            />
            <input
            placeholder='Answer C'
            value={answerC}
            onChange={(e)=>{setAnswerC(e.target.value)}}
            />
            <input
            placeholder='Answer D'
            value={answerD}
            onChange={(e)=>{setAnswerD(e.target.value)}}
            />
            <button>
                Add Another Question
            </button>
            <button>
                Submit & Next
            </button>
        </div>
    )
}

export default AddQuestions