const initialState ={
    setQuizzes: [],
    submitQuiz: {},
    setUserQuizzes: [],
    editUserQuiz: {},
    setQuiz: {},
    updatedUserQuizzes: []
}

const SET_QUIZZES = "SET_QUIZZES"
export const setQuizzes=(payload)=>{
    return{
        type: SET_QUIZZES,
        payload
    }
}

const SET_QUIZ = "SET_QUIZ"
export const setQuiz=(payload)=>{
    return{
        type: SET_QUIZ,
        payload
    }
}

const SET_USER_QUIZZES = "SET_USER_QUIZZES"
export const setUserQuizzes=(payload)=>{
    return{
        type: SET_USER_QUIZZES,
        payload
    }
}

const SUBMIT_QUIZ = "SUBMIT_QUIZ"
export const submitQuiz=(payload)=>{
    return{
        type: SUBMIT_QUIZ,
        payload
    }
}

const EDIT_USER_QUIZ = "EDIT_USER_QUIZ"
export const editUserQuiz=(payload)=>{
    return{
        type: EDIT_USER_QUIZ,
        payload
    }
}

const DELETE_USER_QUIZ = "DELETE_USER_QUIZ"
export const deleteUserQuiz=(payload)=>{
    return{
        type: DELETE_USER_QUIZ,
        payload
    }
}

export default function quizReducer(state = initialState, action){
    const {type, payload} = action
    switch(type){
        case SET_QUIZZES: 
            return {...state, setQuizzes: payload}
        case SET_USER_QUIZZES: 
            return {...state, setUserQuizzes: payload}
        case SET_QUIZ:
            return {...state, setQuiz: payload}
        case SUBMIT_QUIZ:
            return {...state, submitQuiz: payload}
        case EDIT_USER_QUIZ: 
            return {...state, editUserQuiz: payload}
        case DELETE_USER_QUIZ: 
            return {...state, updatedUserQuizzes: payload}
        default: 
            return state
    }
}