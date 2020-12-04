import React, { useState, useEffect, useRef } from 'react';
import Sidebar from './SidebarComponent';
import { useForm } from 'react-hook-form';
import MaterialTable from 'material-table';
import { getMedicos } from '../fetch/medicosFetch';
import { postMedico } from '../fetch/medicosFetch';
import { putMedico } from '../fetch/medicosFetch';
import { deleteMedico } from '../fetch/medicosFetch';
import { getBarrios } from '../fetch/barriosFetch';

function Medico (){
    const [medicos, setMedicos] = useState([]);
    const [barrios, setBarrios] = useState([]);
    const [id, setId] = useState([]);
    const [show, setShow] = useState(false);

    const {handleSubmit, register, errors} = useForm();

    const formulario = useRef();

    const columns = [
        {
            title: "Nombre",
            field: "nombre",
        },
        {
            title: "Cédula",
            field: "cedula",
        },
        {
            title: "Dirección",
            field: "direccion",
        },
        {
            title: "Barrio",
            field: "barrio_id",
        },
        {
            title: "Universidad",
            field: "universidad",
        },
        {
            title: "E.P.S",
            field: "eps",
        },
    ];
    const actions=[
        {
            icon: 'add',
            tooltip: 'Crear',
            isFreeAction: true,
            onClick: (event) => newRegister()
        },
        {
            icon: 'edit',
            tooltip: 'Editar',
            onClick: (event, rowData) => setFormulario(rowData)
        },
        {
            icon: 'delete',
            tooltip: 'Eliminar',
            onClick: (event, rowData) => removeMedico(rowData)
        }
    ];

    useEffect (() => {
        getMedicos()
        .then(response => response.json())
        .then(response => setMedicos(response))
        .catch(error => (error.message));

        getBarrios()
        .then(response => response.json())
        .then(response => setBarrios(response))
        .catch(error => (error.message));
    }, []);

    const onSubmit = (values) => {
        postMedico(values)
        .then(() => {
            const newMedicos = [...medicos];
            newMedicos.push(values);
            setMedicos(newMedicos);
        })
        .catch(error => (error.message));
    }

    const editarMedico = (values) => {
        values.id = id;             // Para agregar el id del medico en el objeto values
        putMedico(values)
        .then(() => {
            const aux = [...medicos];
            const newMedicos = aux.map(medico => {
                if(medico.id === values.id) {
                    medico.nombre = values.nombre;
                    medico.cedula = values.cedula;
                    medico.direccion = values.direccion;
                    medico.barrio_id = values.barrio_id;
                    medico.universidad = values.universidad;
                    medico.eps = values.eps;
                }
                return medico;
            });
            setMedicos(newMedicos);
        })
        .catch(error => (error.message));
    }

    const removeMedico = (medico) => {
        deleteMedico(medico)
        .then(() => {
            const newMedicos = [...medicos];
            const index = newMedicos.indexOf(medico);
            newMedicos.splice(index, 1);
            setMedicos(newMedicos);
        })
        .catch(error => (error.message));
    }
    
    /*     Gestionando campos visuales del modal     */
    const newRegister = () => {
        setShow(!show);
        formulario.current.reset();
        formulario.current[6].style.display = 'block';
        formulario.current[7].style.display = 'none';
    }

    const setFormulario = (medico) => {
        setShow(!show);
        setId(medico.id);
        formulario.current[0].value = medico.nombre;
        formulario.current[1].value = medico.cedula;
        formulario.current[2].value = medico.direccion;
        formulario.current[3].value = medico.barrio_id;
        formulario.current[4].value = medico.universidad;
        formulario.current[5].value = medico.eps;
        formulario.current[7].style.display = 'block';
        formulario.current[6].style.display = 'none';
    }

    return (
        <>
        <Sidebar/>
        <div className="container">
            <div className="row">
                <div className="col-12 mt-2">
                    <div className="card">
                        <div className="card-body">
                            <div className="card-text">
                                <MaterialTable
                                    title="Consolidado de Médicos"
                                    data={medicos}
                                    columns={columns}
                                    options={{ search: true, paging: true, filtering: false, actionsColumnIndex: -1, exportButton: true }}
                                    actions={actions}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="modal" style={{display: (show ? 'block' : 'none')}}>
            <div className="modal-dialog modal-sm">
                <div className="modal-content">
                    <div className="modal-header">
                        Datos del Médico
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
                                    <input placeholder="Dirección" name="direccion" ref={register({
                                            required: "Required"
                                        })}
                                    />
                                    {errors.direccion && errors.direccion.message}
                                </div>
                                <div className="col-12 mt-1">
                                    <select name="barrio_id" ref={register}>
                                        {barrios.map(item => {return(<option key={item.id} value={item.id}>{item.nombre}</option>)})}
                                    </select>
                                </div>
                                <div className="col-12 mt-1">
                                    <input placeholder="Universidad" name="universidad" ref={register({
                                            required: "Required"
                                        })}
                                    />
                                    {errors.universidad && errors.universidad.message}
                                </div>
                                <div className="col-12 mt-1">
                                    <input placeholder="E.P.S" name="eps" ref={register({
                                            required: "Required"
                                        })}
                                    />
                                    {errors.eps && errors.eps.message}
                                </div>
                                <div className="col-12 mt-3">
                                    <button type="submit" className="btn btn-light"><i className="fa fa-plus"></i> Crear</button>
                                    <button onClick={handleSubmit(editarMedico)} className="btn btn-light"><i className="fa fa-pencil"></i> Editar</button>
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

export default Medico;