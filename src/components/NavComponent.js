import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { loginUser } from '../fetch/loginFetch';

function Navegar () {

    const [isNavOpen, setIsNavOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLogin, setIsLogin] = useState(false);

    const {handleSubmit, register, errors} = useForm();

    useEffect(() => {
        if(localStorage.getItem('token')){
            setIsLogin(true);
        }
    }, []);

    const onSubmit = (values) =>{
        loginUser(values)
        .then(response => response.json())
        .then(response => {
            if(response.success === true){
                localStorage.setItem('token', response.token);
                localStorage.setItem('id', response.id);
                localStorage.setItem('username', response.username);
                setIsLogin(true);
                setIsModalOpen(false);
            }
            else {
                alert(response.status);
            }
        });
    }

    const closeSession = () => {
        localStorage.removeItem('token');
        setIsLogin(false);
    }

    return (
        <>
        <div className="navbar navbar-expand-sm navbar-dark">
            <button className="navbar-toggler" type="button" onClick={() => setIsNavOpen(!isNavOpen)}>
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className={(isNavOpen ? 'show' : '') + ' collapse navbar-collapse'}>
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <a className="nav-link" href="/home"><span className="fa fa-home fa-lg"></span> Home</a>
                    </li>
                    {isLogin ?
                    <li className="nav-item">
                        <a className="nav-link" href="/admin"><span className="fa fa-user fa-lg"></span> Admin</a>
                    </li>
                    : null}
                </ul>
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        {!isLogin ? 
                        <button className="btn btn-outline-light" onClick={() => setIsModalOpen(true)}><span className="fa fa-sign-in fa-lg"></span> Login</button>
                        :
                        <div>
                            <div className="navbar-text mr-3">{localStorage.getItem('username')}</div>
                            <button className="btn btn-outline-light" onClick={() => closeSession()}><span className="fa fa-sign-out fa-lg"></span> Logout</button>
                        </div>
                        }
                    </li>
                </ul>
            </div>
        </div>
        <div className="modal" style={{display: (isModalOpen ? 'block' : 'none')}}>
            <div className="modal-dialog modal-sm">
                <div className="modal-content">
                    <div className="modal-header">
                        Login
                        <button className="close" onClick={() => setIsModalOpen(false)}>&times;</button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="row offset-1">
                                <div className="col-12">
                                    <input placeholder="Username" name="username" ref={register({
                                            required: "Required"
                                        })}
                                    />
                                    {errors.username && errors.username.message}
                                </div>
                                <div className="col-12 mt-1">
                                    <input placeholder="Password" name="password" ref={register({
                                            required: "Required"
                                        })}
                                    />
                                    {errors.password && errors.password.message}
                                </div>
                                <div className="col-12 mt-4">
                                    <button type="submit" className="btn btn-light"><i className="fa fa-sign-in fa-lg"></i> Login</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        </>
    );

}

export default Navegar;