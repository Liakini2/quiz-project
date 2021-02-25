const initialState ={
    quizzes: [],
    userQuizzes: [],
    quiz: {}
}

const SET_QUIZZES = "SET_QUIZZES"
export const setQuizzes=(quizzes)=>{
    return{
        type: SET_QUIZZES,
        payload: quizzes
    }
}

const SET_USER_QUIZZES = "SET_USER_QUIZZES"
export const setUserQuizzes=(quizzes)=>{
    return{
        type: SET_USER_QUIZZES,
        payload: quizzes
    }
}

const SUBMIT_QUIZ = "SUBMIT_QUIZ"
export const submitQuiz=(quiz)=>{
    return{
        type: SUBMIT_QUIZ,
        payload: quiz
    }
}

export default function quizReducer(state = initialState, action){
    const {type, payload} = action
    switch(type){
        case SET_QUIZZES: 
            return {...state, quizzes: payload}
        case SUBMIT_QUIZ:
            return {...state, quiz: payload}
        case SET_USER_QUIZZES: 
        return {...state, userQuizzes: payload}
        default: 
            return state
    }
}