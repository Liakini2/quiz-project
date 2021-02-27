import React from 'react'
import {Switch, Route} from 'react-router-dom'
import Auth from './Components/Auth/Auth'
import CreateQuiz from './Components/CreateQuiz/CreateQuiz'
import EditQuiz from './Components/EditQuiz/EditQuiz'
import Explore from './Components/Explore/Explore'
import MyQuizzes from './Components/MyQuizzes/MyQuizzes'
import Profile from './Components/Profile/Profile'
import Register from './Components/Register/Register'

export default(
    <Switch>
        <Route exact path='/' component={Auth}/>
        <Route path='/register' component={Register}/>
        <Route path='/explore' component={Explore}/>
        <Route path='/profile' component={Profile}/>
        <Route path='/createquiz' component={CreateQuiz}/>
        <Route path='/myquizzes' component={MyQuizzes}/>
        <Route path='/editquiz/id' component={EditQuiz}/>
    </Switch>
)