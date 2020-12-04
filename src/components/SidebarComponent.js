import React from 'react';
import { Link } from 'react-router-dom';

function Sidebar (){
    return(
        <div id="sidebar">
            <ul className="items">
                <li>
                    <Link to="/admin/medicos"><span className="fa fa-heartbeat fa-lg"></span> Médicos</Link>
                </li>
                <li>
                    <Link to="/admin/pacientes"><span className="fa fa-virus fa-lg"></span> Pacientes</Link>
                </li>
                <li>
                    <Link to="/admin/inventario"><span className="fa fa-inventory fa-lg"></span> Inventario</Link>
                </li>
            </ul>
        </div>
    );
}

export default Sidebar;