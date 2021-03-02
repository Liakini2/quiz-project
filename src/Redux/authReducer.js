const initialState = {
    username: '',
    email: '',
    profile_pic: '',
}

const UPDATE_USER = 'UPDATE_USER'
export const updateUser=(user)=>{
    return {
        type: UPDATE_USER,
        payload: user
    }
}

const LOGOUT = 'LOGOUT'
export const logout = () =>{
    return {
        type: LOGOUT
    }
}

export default function authReducer(state = initialState, action){
    const {type, payload} = action
    switch(type){
        case UPDATE_USER:
            return {...state, username: payload.username, email: payload.email, profile_pic: payload.profile_pic}
        case LOGOUT:
            return {username: '', email: '', profile_pic: ''}
        default: 
            return state
    }
}
