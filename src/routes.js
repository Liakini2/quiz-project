import React from 'react'
import {Switch, Route} from 'react-router-dom'

//components
import AddAnswers from './Components/CreatingAQuiz/AddAnswers'
import AddQuestions from './Components/CreatingAQuiz/AddQuestions'
import Auth from './Components/Authentication/Auth/Auth'
import CreateQuiz from './Components/CreatingAQuiz/CreateQuiz'
import EditQuiz from './Components/EditQuiz/EditQuiz'
import Explore from './Components/Explore/Explore'
import MyQuizzes from './Components/MyQuizzes/MyQuizzes'
import Profile from './Components/Profile/Profile'
import Register from './Components/Authentication/Register/Register'
import TakeAQuiz from './Components/TakeAQuiz/TakeAQuiz'
import EditQuestions from './Components/EditQuiz/EditQuestions'
import Result from './Components/TakeAQuiz/Result'


export default(
    <Switch>

        {/* User Authentication */}
        <Route exact path='/' component={Auth}/>
        <Route path='/register' component={Register}/>
        
        {/* other pages and paths */}
        <Route path='/explore' component={Explore}/>
        <Route path='/profile' component={Profile}/>
        <Route path='/myquizzes' component={MyQuizzes}/>
        
        {/* take a quiz */}
        <Route path='/takequiz/:quiz_id' component={TakeAQuiz}/>
        <Route path='/quizresult/:quiz_id' component={Result}/>

        {/* adding quiz information */}
        <Route path='/createquiz' component={CreateQuiz}/>
        <Route path='/addquestions/:quiz_id' component={AddQuestions}/>
        <Route path='/addanswers/:question_id' component={AddAnswers}/>
        
        {/* editing quiz information */}
        <Route path='/editquiz/:quiz_id' component={EditQuiz}/>
        <Route path='/editquestions/:quiz_id' component={EditQuestions}/>
        
    </Switch>
)