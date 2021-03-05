const initialState = {
    setQuestions: [],
    setQuestion: {},
    setQuestionId: {},
    addQuestion: {},
}

// const SET_QUESTIONS = "SET_QUESTIONS"

const SET_QUESTIONS = "SET_QUESTIONS"
export const setQuestions=(payload)=>{
    return{
        type: SET_QUESTIONS,
        payload
    }
}

const SET_QUESTION = "SET_QUESTION"
export const setQuestion=(payload)=>{
    return{
        type: SET_QUESTION,
        payload
    }
}

const ADD_QUESTION = "ADD_QUESTION"
export const addQuestion=(payload)=>{
    return{
        type: ADD_QUESTION,
        payload
    }
}

// const EDIT_QUESTION = "EDIT_QUESTION"
// const DELETE_QUESTION = "DELETE_QUESTION"

export default function questionReducer(state = initialState, action){
    const{type, payload} = action
    switch(type){
        case SET_QUESTIONS: 
            return {...state, setQuestions: payload}
        case SET_QUESTION: 
            return {...state, setQuestion: payload}
        case ADD_QUESTION:
            return {...state, addQuestion: payload}
        default: 
            return state
    }
}