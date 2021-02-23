import React from 'react'
import {Switch, Route} from 'react-router-dom'
import Auth from './Components/Auth/Auth'
import Explore from './Components/Explore/Explore'
import Register from './Components/Register/Register'

export default(
    <Switch>
        <Route exact path='/' component={Auth}/>
        <Route path='/register' component={Register}/>
        <Route path='/explore' component={Explore}/>
        {/* <Route path='/profile'/>
        <Route path='/myquizzes'/>
        <Route path='/createquiz'/>
        <Route path='/editquiz'/> */}
    </Switch>
)