import {createStore, combineReducers} from 'redux'
import authReducer from './authReducer'
import quizReducer from './quizReducer'
import questionReducer from './questionReducer'

const rootReducer = combineReducers({
    authReducer,
    quizReducer,
    questionReducer
})

export default createStore(rootReducer)