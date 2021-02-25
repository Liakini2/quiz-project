import {createStore, combineReducers} from 'redux'
import authReducer from './authReducer'
import quizReducer from './quizReducer'

const rootReducer = combineReducers({
    authReducer,
    quizReducer
})

export default createStore(rootReducer)