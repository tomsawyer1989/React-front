import React, { useState } from 'react';

function Navegar () {

    const [isNavOpen, setIsNavOpen] = useState(false);

    return (
        <div className="navbar navbar-expand-sm navbar-dark">
            <button className="navbar-toggler" type="button" onClick={()=>setIsNavOpen(!isNavOpen)}>
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className={(isNavOpen ? 'show' : '') + ' collapse navbar-collapse'}>
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <a className="nav-link" href="/home"><span className="fa fa-home fa-lg"></span> Home</a>
                    </li>
                </ul>
            </div>
        </div>
    );

}

export default Navegar;