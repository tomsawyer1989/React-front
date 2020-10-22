import React from 'react';
import Navegar from './NavComponent';
import Home from './HomeComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';

function Main () {
    return(
        <>
        <Navegar/>
        <Switch>
            <Route exact path="/home" component={() => <Home/>}/>
            <Redirect to="/home"/>
        </Switch>
        </>
    );
}

export default Main;