import React, { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { getPacientes } from '../fetch/pacientesFetch';
import { postPaciente } from '../fetch/pacientesFetch';
import { putPaciente } from '../fetch/pacientesFetch';
import { deletePaciente } from '../fetch/pacientesFetch';

function Home () {

    const [pacientes, setPacientes] = useState([]);
    const [show, setShow] = useState(false);

    const {handleSubmit, register, errors} = useForm();

    const formulario = useRef();

    useEffect (() => {
            getPacientes()
            .then(response => response.json())
            .then(response => setPacientes(response))
            .catch(error => (error.message));
        }, []
    );

    const onSubmit = (values) => {
        postPaciente(values)
        .then(() => {
            const newPacientes = [...pacientes];
            newPacientes.push(values);
            setPacientes(newPacientes);
        })
        .catch(error => (error.message));
    }

    const editarPaciente = (values) => {
        putPaciente(values)
        .then(() => {
            const aux = [...pacientes];
            const newPacientes = aux.map(paciente => {
                if(paciente.cedula === values.cedula)
                    paciente.nombre = values.nombre;
                    return paciente;
            });
            setPacientes(newPacientes);
        })
        .catch(error => (error.message));
    }

    const removePaciente = (paciente, i) => {
        deletePaciente(paciente)
        .then(() => {
            const newPacientes = [...pacientes];
            newPacientes.splice(i, 1);
            setPacientes(newPacientes);
        })
        .catch(error => (error.message));
    }
    
    /*     Gestionando campos visuales del modal     */
    const newRegister = () => {
        setShow(!show);
        formulario.current.reset();
        formulario.current[3].style.display = 'block';
        formulario.current[4].style.display = 'none';
    }

    const setFormulario = (paciente) => {
        setShow(!show);
        formulario.current[0].value = paciente.nombre;
        formulario.current[1].value = paciente.cedula;
        formulario.current[2].value = paciente.edad;
        formulario.current[4].style.display = 'block';
        formulario.current[3].style.display = 'none';
    }

    const RenderPacientes = () => {
        return (
            pacientes.map((paciente, i) => {
                return (
                    <tr key={i}>
                        <td>{paciente.nombre}</td>
                        <td>{paciente.cedula}</td>
                        <td>{paciente.edad}</td>
                        <td>
                            <button className="btn-success" onClick={() => setFormulario(paciente)}><i className="fa fa-pencil"></i></button>
                            <button className="btn-danger" onClick={() => {removePaciente(paciente, i)}}><i className="fa fa-trash"></i></button>
                        </td>
                    </tr>
                );
            })
        );
    }

    return(
        <>
        <div className="container">
            <div className="row">
                <div className="col mt-4 offset-1">
                    <button className="btn-primary" onClick={() => {newRegister()}}><i className="fa fa-plus"></i></button>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Nombre</th>
                                <th scope="col">Cédula</th>
                                <th scope="col">Edad</th>
                                <th scope="col">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            <RenderPacientes/>
                        </tbody>
                        <tfoot>
                            <tr>
                                <th>Total</th>
                                <th>{pacientes.length}</th>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        </div>
        <div className="modal" style={{display: (show ? 'block' : 'none')}}>
            <div className="modal-dialog modal-sm">
                <div className="modal-content">
                    <div className="modal-header">
                        Datos del paciente
                        <button className="close" onClick={()=>setShow(!show)}>&times;</button>
                    </div>
                    <div className="modal-body">
                        <form ref={formulario} onSubmit={handleSubmit(onSubmit)}>
                            <div className="row offset-1">
                                <div className="col-12">
                                    <input placeholder="Nombre" name="nombre" ref={register({
                                            required: "Required"
                                        })}
                                    />
                                    {errors.nombre && errors.nombre.message}
                                </div>
                                <div className="col-12 mt-1">
                                    <input placeholder="Cédula" name="cedula" ref={register({
                                            required: "Required"
                                        })}
                                    />
                                    {errors.cedula && errors.cedula.message}
                                </div>
                                <div className="col-12 mt-1">
                                    <input placeholder="Edad" name="edad" ref={register({
                                            required: "Required"
                                        })}
                                    />
                                    {errors.edad && errors.edad.message}
                                </div>
                                <div className="col-12 mt-3">
                                    <button type="submit" className="btn btn-primary"><i className="fa fa-plus"></i></button>
                                    <button onClick={handleSubmit(editarPaciente)} className="btn btn-success"><i className="fa fa-pencil"></i></button>
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

export default Home;