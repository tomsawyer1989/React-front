import React from 'react';
import Navegar from './NavComponent';
import Home from './HomeComponent';
import Admin from './AdminComponent';
import Medico from './MedicoComponent';
import Paciente from './PacienteComponent';
import Inventario from './InventarioComponent';
import { Switch, Route, Redirect } from 'react-router-dom';

function Main () {

    return(
        <>
        <Navegar/>
        <Switch>
            <Route exact path="/home" component={() => <Home/>}/>
            <Route exact path="/admin" component={() => <Admin/>}/>
            <Route exact path="/admin/medicos" component={() => <Medico/>}/>
            <Route exact path="/admin/pacientes" component={() => <Paciente/>}/>
            <Route exact path="/admin/inventario" component={() => <Inventario/>}/>
            <Redirect to="/home"/>
        </Switch>
        </>
    );
}

export default Main;