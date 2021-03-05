const initialState = {
    answers : [],
    addAnswer: {}
}

const ADD_ANSWER = "ADD_ANSWER"
export const addAnswer=(payload)=>{
    return{
        type: ADD_ANSWER,
        payload
    }
}

export default function answersReducer(state=initialState, action){
    const{type, payload} = action
    switch(type){
        case ADD_ANSWER: 
            return{...state, addAnswer: payload}
        default: 
            return state
    }
}