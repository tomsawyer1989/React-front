import React, { useState, useEffect, useRef } from 'react';
import Sidebar from './SidebarComponent';
import { useForm } from 'react-hook-form';
import MaterialTable from 'material-table';
import { getPacientes } from '../fetch/pacientesFetch';
import { postPaciente } from '../fetch/pacientesFetch';
import { putPaciente } from '../fetch/pacientesFetch';
import { deletePaciente } from '../fetch/pacientesFetch';
import { getMedicos } from '../fetch/medicosFetch';
import { getBarrios } from '../fetch/barriosFetch';
import { getCiudades } from '../fetch/ciudadesFetch';
import { getVisitas } from '../fetch/visitasFetch';
import { postVisita } from '../fetch/visitasFetch';
import { getFormulaciones } from '../fetch/formulacionesFetch';
import { postFormulacion } from '../fetch/formulacionesFetch';
import { getMedicamentos } from '../fetch/medicamentosFetch';
import { getIntegrantes } from '../fetch/integrantesFetch';
import { postIntegrante } from '../fetch/integrantesFetch';
import { getContactos } from '../fetch/contactosFetch';
import { postContacto } from '../fetch/contactosFetch';

function Paciente (){
    const [pacientes, setPacientes] = useState([]);
    const [medicos, setMedicos] = useState([]);
    const [barrios, setBarrios] = useState([]);
    const [ciudades, setCiudades] = useState([]);
    const [visitas, setVisitas] = useState([]);
    const [formulaciones, setFormulaciones] = useState([]);
    const [medicamentos, setMedicamentos] = useState([]);
    const [integrantes, setIntegrantes] = useState([]);
    const [contactos, setContactos] = useState([]);
    const [id, setId] = useState([]);
    const [visitaId, setVisitaId] = useState([]);
    const [show, setShow] = useState(false);
    const [showVisita, setShowVisita] = useState(false);
    const [showFormulacion, setShowFormulacion] = useState(false);
    const [showIntegrante, setShowIntegrante] = useState(false);
    const [showContacto, setShowContacto] = useState(false);
    const [showConsulta, setShowConsulta] = useState(false);
    const [showCase, setShowCase] = useState('');

    const {handleSubmit, register, errors} = useForm();
    const {handleSubmit: visitaSubmit, register: visitaRegister, errors: visitaErrors} = useForm();
    const {handleSubmit: formulacionSubmit, register: formulacionRegister, errors: formulacionErrors} = useForm();
    const {handleSubmit: integranteSubmit, register: integranteRegister, errors: integranteErrors} = useForm();
    const {handleSubmit: contactoSubmit, register: contactoRegister, errors: contactoErrors} = useForm();

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
            title: "Edad",
            field: "edad",
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
            title: "Ciudad",
            field: "ciudad_id",
        },
        {
            title: "Médico",
            field: "medico_id",
        },
    ];
    const actions = [
        {
            icon: 'add',
            tooltip: 'Crear',
            isFreeAction: true,
            onClick: (event) => newRegister()
        },
        {
            icon: 'add',
            tooltip: 'Registrar Visita',
            onClick: (event, rowData) => getVisitaItem(rowData)
        },
        {
            icon: 'search',
            tooltip: 'Listar Visitas',
            onClick: (event, rowData) => visitasByPaciente_idList(rowData)
        },
        {
            icon: 'add',
            tooltip: 'Registrar Integrante',
            onClick: (event, rowData) => getIntegranteItem(rowData)
        },
        {
            icon: 'search',
            tooltip: 'Listar Integrantes',
            onClick: (event, rowData) => integrantesByPaciente_idList(rowData)
        },
        {
            icon: 'add',
            tooltip: 'Registrar Contacto',
            onClick: (event, rowData) => getContactoItem(rowData)
        },
        {
            icon: 'search',
            tooltip: 'Listar Contactos',
            onClick: (event, rowData) => contactosByPaciente_idList(rowData)
        },
        {
            icon: 'edit',
            tooltip: 'Editar',
            onClick: (event, rowData) => setFormulario(rowData)
        },
        {
            icon: 'delete',
            tooltip: 'Eliminar',
            onClick: (event, rowData) => removePaciente(rowData)
        }
    ];

    const columnsVisitas = [
        {
            title: "Temperatura",
            field: "temperatura",
        },
        {
            title: "Peso",
            field: "peso",
        },
        {
            title: "Presión",
            field: "presion",
        },
        {
            title: "Observaciones",
            field: "observaciones",
        },
        {
            title: "Paciente",
            field: "paciente_id",
        },
        {
            title: "Fecha",
            field: "fecha",
        },
    ];
    const actionsVisitas=[
        {
            icon: 'add',
            tooltip: 'Registrar Formulación',
            onClick: (event, rowData) => getFormulacionItem(rowData)
        },
        {
            icon: 'search',
            tooltip: 'Listar Formulaciones',
            onClick: (event, rowData) => formulacionesByVisita_idList(rowData)
        },
        // {
        //     icon: 'edit',
        //     tooltip: 'Editar',
        //     onClick: (event, rowData) => alert('editando')
        // },
        // {
        //     icon: 'delete',
        //     tooltip: 'Eliminar',
        //     onClick: (event, rowData) => alert('eliminando')
        // }
    ];

    const columnsFormulaciones = [
        {
            title: "Medicamento",
            field: "medicamento_id",
        },
        {
            title: "Visita",
            field: "visita_id",
        },
        {
            title: "Dosis",
            field: "dosis",
        },
    ];

    const actionsFormulaciones = [
        // {
        //     icon: 'edit',
        //     tooltip: 'Editar',
        //     onClick: (event, rowData) => alert('editando')
        // },
        // {
        //     icon: 'delete',
        //     tooltip: 'Eliminar',
        //     onClick: (event, rowData) => alert('eliminando')
        // }
    ];

    const columnsIntegrantes = [
        {
            title: "Nombre",
            field: "nombre",
        },
        {
            title: "Cédula",
            field: "cedula",
        },
        {
            title: "Parentesco",
            field: "parentesco",
        },
        {
            title: "Paciente",
            field: "paciente_id",
        },
    ];

    const actionsIntegrantes = [
        // {
        //     icon: 'edit',
        //     tooltip: 'Editar',
        //     onClick: (event, rowData) => alert('editando')
        // },
        // {
        //     icon: 'delete',
        //     tooltip: 'Eliminar',
        //     onClick: (event, rowData) => alert('eliminando')
        // }
    ];

    const columnsContactos = [
        {
            title: "Nombre",
            field: "nombre",
        },
        {
            title: "Teléfono",
            field: "telefono",
        },
        {
            title: "Email",
            field: "email",
        },
        {
            title: "Parentesco",
            field: "parentesco",
        },
        {
            title: "Paciente",
            field: "paciente_id",
        },
    ];

    const actionsContactos = [
        // {
        //     icon: 'edit',
        //     tooltip: 'Editar',
        //     onClick: (event, rowData) => alert('editando')
        // },
        // {
        //     icon: 'delete',
        //     tooltip: 'Eliminar',
        //     onClick: (event, rowData) => alert('eliminando')
        // }
    ];

    useEffect (() => {
        getPacientes()
        .then(response => response.json())
        .then(response => setPacientes(response))
        .catch(error => (error.message));

        getMedicos()
        .then(response => response.json())
        .then(response => setMedicos(response))
        .catch(error => (error.message));

        getMedicamentos()
        .then(response => response.json())
        .then(response => setMedicamentos(response))
        .catch(error => (error.message));

        getBarrios()
        .then(response => response.json())
        .then(response => setBarrios(response))
        .catch(error => (error.message));

        getCiudades()
        .then(response => response.json())
        .then(response => setCiudades(response))
        .catch(error => (error.message));
    }, []);

    const visitasByPaciente_idList = (paciente) => {
        getVisitas(paciente.id)
        .then(response => response.json())
        .then(response => {
            setVisitas(response);
            setShowConsulta(true);
            setShowCase('visitas');
        })
        .catch(error => (error.message));
    }

    const formulacionesByVisita_idList = (visita) => {
        getFormulaciones(visita.id)
        .then(response => response.json())
        .then(response => setFormulaciones(response))
        .catch(error => (error.message));
    }

    const integrantesByPaciente_idList = (paciente) => {
        getIntegrantes(paciente.id)
        .then(response => response.json())
        .then(response => {
            setIntegrantes(response);
            setShowConsulta(true);
            setShowCase('integrantes');
        })
        .catch(error => (error.message));
    }

    const contactosByPaciente_idList = (paciente) => {
        getContactos(paciente.id)
        .then(response => response.json())
        .then(response => {
            setContactos(response);
            setShowConsulta(true);
            setShowCase('contactos');
        })
        .catch(error => (error.message));
    }

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
        values.id = id;         // Para agregar el id del paciente en el objeto values
        putPaciente(values)
        .then(() => {
            const aux = [...pacientes];
            const newPacientes = aux.map(paciente => {
                if(paciente.id === values.id) {
                    paciente.medico_id = values.medico_id;
                    paciente.barrio_id = values.barrio_id;
                    paciente.ciudad_id = values.ciudad_id;
                    paciente.nombre = values.nombre;
                    paciente.cedula = values.cedula;
                    paciente.edad = values.edad;
                    paciente.direccion = values.direccion;
                }
                return paciente;
            });
            setPacientes(newPacientes);
        })
        .catch(error => (error.message));
    }

    const removePaciente = (paciente) => {
        deletePaciente(paciente)
        .then(() => {
            const newPacientes = [...pacientes];
            const index = newPacientes.indexOf(paciente);
            newPacientes.splice(index, 1);
            setPacientes(newPacientes);
        })
        .catch(error => (error.message));
    }
    
    /*     Gestionando campos visuales del modal     */
    const newRegister = () => {
        setShow(!show);
        formulario.current.reset();
        formulario.current[7].style.display = 'block';
        formulario.current[8].style.display = 'none';
    }

    const setFormulario = (paciente) => {
        setShow(!show);
        setId(paciente.id);
        formulario.current[0].value = paciente.medico_id;
        formulario.current[1].value = paciente.barrio_id;
        formulario.current[2].value = paciente.ciudad_id;
        formulario.current[3].value = paciente.nombre;
        formulario.current[4].value = paciente.cedula;
        formulario.current[5].value = paciente.edad;
        formulario.current[6].value = paciente.direccion;
        formulario.current[8].style.display = 'block';
        formulario.current[7].style.display = 'none';
    }

    /*      Visitas        */
    const crearVisita = (values) => {
        values.paciente_id = id;         // Para agregar el id del paciente en el objeto values
        postVisita(values)
        .then(() => {
            const newVisitas = [...visitas];
            newVisitas.push(values);
            setVisitas(newVisitas);
        })
        .catch(error => (error.message));
        setShowVisita(false);
    }

    const getVisitaItem = (paciente) => {
        setShowVisita(true);
        setId(paciente.id);
    }

    /*      Formulaciones        */
    const crearFormulacion = (values) => {
        values.visita_id = visitaId;         // Para agregar el id del paciente en el objeto values
        postFormulacion(values)
        .then(() => {
            const newFormulaciones = [...formulaciones];
            newFormulaciones.push(values);
            setFormulaciones(newFormulaciones);
        })
        .catch(error => (error.message));
        setShowFormulacion(false);
    }

    const getFormulacionItem = (visita) => {
        setShowFormulacion(true);
        setVisitaId(visita.id);
    }

    /*      Integrantes        */
    const crearIntegrante = (values) => {
        values.paciente_id = id;         // Para agregar el id del paciente en el objeto values
        postIntegrante(values)
        .then(() => {
            const newIntegrantes = [...integrantes];
            newIntegrantes.push(values);
            setIntegrantes(newIntegrantes);
        })
        .catch(error => (error.message));
        setShowIntegrante(false);
    }

    const getIntegranteItem = (paciente) => {
        setShowIntegrante(true);
        setId(paciente.id);
    }

    /*      Contactos       */
    const crearContacto = (values) => {
        values.paciente_id = id;         // Para agregar el id del paciente en el objeto values
        postContacto(values)
        .then(() => {
            const newContactos = [...contactos];
            newContactos.push(values);
            setContactos(newContactos);
        })
        .catch(error => (error.message));
        setShowContacto(false);
    }

    const getContactoItem = (paciente) => {
        setShowContacto(true);
        setId(paciente.id);
    }

    const RenderConsulta = () => {
        switch (showCase) {
            case 'visitas':
                return(
                    <>
                    <MaterialTable
                        title="Consolidado de Visitas"
                        data={visitas}
                        columns={columnsVisitas}
                        options={{ search: true, paging: true, filtering: false, actionsColumnIndex: -1, exportButton: true }}
                        actions={actionsVisitas}
                    />
                    <MaterialTable
                        title="Formulaciones al Paciente"
                        data={formulaciones}
                        columns={columnsFormulaciones}
                        options={{ search: true, paging: true, filtering: false, actionsColumnIndex: -1, exportButton: true }}
                        actions={actionsFormulaciones}
                    />
                    </>
                );
            case 'integrantes':
                return(
                    <MaterialTable
                        title="Integrantes del Paciente"
                        data={integrantes}
                        columns={columnsIntegrantes}
                        options={{ search: true, paging: true, filtering: false, actionsColumnIndex: -1, exportButton: true }}
                        actions={actionsIntegrantes}
                    />
                );
            case 'contactos':
                return(
                    <MaterialTable
                        title="Contactos del Paciente"
                        data={contactos}
                        columns={columnsContactos}
                        options={{ search: true, paging: true, filtering: false, actionsColumnIndex: -1, exportButton: true }}
                        actions={actionsContactos}
                    />
                );
            default:
                return null;
        }
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
                                    title="Consolidado de Pacientes"
                                    data={pacientes}
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
        <div className="modal" style={{display: (showConsulta ? 'block' : 'none')}}>
            <div className="modal-dialog modal-dialog-scrollable modal-xl">
                <div className="modal-content">
                    <div className="modal-header">
                        Consultando...
                        <button className="close" onClick={()=>setShowConsulta(!showConsulta)}>&times;</button>
                    </div>
                    <div className="modal-body">
                        <div className="row">
                            <div className="col-12 mt-2">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="card-text">
                                            <RenderConsulta/>
                                        </div>
                                    </div>
                                </div>
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
                        Datos del paciente
                        <button className="close" onClick={()=>setShow(!show)}>&times;</button>
                    </div>
                    <div className="modal-body">
                        <form ref={formulario} onSubmit={handleSubmit(onSubmit)}>
                            <div className="row offset-1">
                                <div className="col-12">
                                    <select name="medico_id" ref={register}>
                                        {medicos.map(item => {return(<option key={item.id} value={item.id}>{item.nombre}</option>)})}
                                    </select>
                                </div>
                                <div className="col-12 mt-1">
                                    <select name="barrio_id" ref={register}>
                                        {barrios.map(item => {return(<option key={item.id} value={item.id}>{item.nombre}</option>)})}
                                    </select>
                                </div>
                                <div className="col-12 mt-1">
                                    <select name="ciudad_id" ref={register}>
                                        {ciudades.map(item => {return(<option key={item.id} value={item.id}>{item.nombre}</option>)})}
                                    </select>
                                </div>
                                <div className="col-12 mt-1">
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
                                <div className="col-12 mt-1">
                                    <input placeholder="Dirección" name="direccion" ref={register({
                                            required: "Required"
                                        })}
                                    />
                                    {errors.direccion && errors.direccion.message}
                                </div>
                                <div className="col-12 mt-3">
                                    <button type="submit" className="btn btn-light"><i className="fa fa-plus"></i> Crear</button>
                                    <button onClick={handleSubmit(editarPaciente)} className="btn btn-light"><i className="fa fa-pencil"></i> Editar</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <div className="modal" style={{display: (showVisita ? 'block' : 'none')}}>
            <div className="modal-dialog modal-sm">
                <div className="modal-content">
                    <div className="modal-header">
                        Datos de la Visita
                        <button className="close" onClick={()=>setShowVisita(false)}>&times;</button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={visitaSubmit(crearVisita)}>
                            <div className="row offset-1">
                                <div className="col-12">
                                    <input type="date" placeholder="Fecha" name="fecha" ref={visitaRegister({
                                            required: "Required"
                                        })}
                                    />
                                    {visitaErrors.fecha && visitaErrors.fecha.message}
                                </div>
                                <div className="col-12 mt-1">
                                    <input placeholder="Temperatura" name="temperatura" ref={visitaRegister({
                                            required: "Required"
                                        })}
                                    />
                                    {visitaErrors.temperatura && visitaErrors.temperatura.message}
                                </div>
                                <div className="col-12 mt-1">
                                    <input placeholder="Peso" name="peso" ref={visitaRegister({
                                            required: "Required"
                                        })}
                                    />
                                    {visitaErrors.peso && visitaErrors.peso.message}
                                </div>
                                <div className="col-12 mt-1">
                                    <input placeholder="Presión" name="presion" ref={visitaRegister({
                                            required: "Required"
                                        })}
                                    />
                                    {visitaErrors.presion && visitaErrors.presion.message}
                                </div>
                                <div className="col-12 mt-1">
                                    <input placeholder="Observaciones" name="observaciones" ref={visitaRegister({
                                            required: "Required"
                                        })}
                                    />
                                    {visitaErrors.observaciones && visitaErrors.observaciones.message}
                                </div>
                                <div className="col-12 mt-3">
                                    <button type="submit" className="btn btn-light"><i className="fa fa-plus"></i> Crear</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <div className="modal" style={{display: (showFormulacion ? 'block' : 'none')}}>
            <div className="modal-dialog modal-sm">
                <div className="modal-content">
                    <div className="modal-header">
                        Datos de la Formulación
                        <button className="close" onClick={()=>setShowFormulacion(false)}>&times;</button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={formulacionSubmit(crearFormulacion)}>
                            <div className="row offset-1">
                                <div className="col-12 mt-1">
                                    <select name="medicamento_id" ref={formulacionRegister}>
                                        {medicamentos.map(item => {return(<option key={item.id} value={item.id}>{item.nombre}</option>)})}
                                    </select>
                                </div>
                                <div className="col-12 mt-1">
                                    <input placeholder="Dosis" name="dosis" ref={formulacionRegister({
                                            required: "Required"
                                        })}
                                    />
                                    {formulacionErrors.dosis && formulacionErrors.dosis.message}
                                </div>
                                <div className="col-12 mt-3">
                                    <button type="submit" className="btn btn-light"><i className="fa fa-plus"></i> Crear</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <div className="modal" style={{display: (showIntegrante ? 'block' : 'none')}}>
            <div className="modal-dialog modal-sm">
                <div className="modal-content">
                    <div className="modal-header">
                        Datos del Integrante
                        <button className="close" onClick={()=>setShowIntegrante(false)}>&times;</button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={integranteSubmit(crearIntegrante)}>
                            <div className="row offset-1">
                                <div className="col-12">
                                    <input placeholder="Nombre" name="nombre" ref={integranteRegister({
                                            required: "Required"
                                        })}
                                    />
                                    {integranteErrors.nombre && integranteErrors.nombre.message}
                                </div>
                                <div className="col-12 mt-1">
                                    <input placeholder="Cédula" name="cedula" ref={integranteRegister({
                                            required: "Required"
                                        })}
                                    />
                                    {integranteErrors.cedula && integranteErrors.cedula.message}
                                </div>
                                <div className="col-12 mt-1">
                                    <input placeholder="Parentesco" name="parentesco" ref={integranteRegister({
                                            required: "Required"
                                        })}
                                    />
                                    {integranteErrors.parentesco && integranteErrors.parentesco.message}
                                </div>
                                <div className="col-12 mt-3">
                                    <button type="submit" className="btn btn-light"><i className="fa fa-plus"></i> Crear</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <div className="modal" style={{display: (showContacto ? 'block' : 'none')}}>
            <div className="modal-dialog modal-sm">
                <div className="modal-content">
                    <div className="modal-header">
                        Datos del Contacto
                        <button className="close" onClick={()=>setShowContacto(false)}>&times;</button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={contactoSubmit(crearContacto)}>
                            <div className="row offset-1">
                                <div className="col-12">
                                    <input placeholder="Nombre" name="nombre" ref={contactoRegister({
                                            required: "Required"
                                        })}
                                    />
                                    {contactoErrors.nombre && contactoErrors.nombre.message}
                                </div>
                                <div className="col-12 mt-1">
                                    <input placeholder="Teléfono" name="telefono" ref={contactoRegister({
                                            required: "Required"
                                        })}
                                    />
                                    {contactoErrors.telefono && contactoErrors.telefono.message}
                                </div>
                                <div className="col-12 mt-1">
                                    <input placeholder="Email" name="email" ref={contactoRegister({
                                            required: "Required"
                                        })}
                                    />
                                    {contactoErrors.email && contactoErrors.email.message}
                                </div>
                                <div className="col-12 mt-1">
                                    <input placeholder="Parentesco" name="parentesco" ref={contactoRegister({
                                            required: "Required"
                                        })}
                                    />
                                    {contactoErrors.parentesco && contactoErrors.parentesco.message}
                                </div>
                                <div className="col-12 mt-3">
                                    <button type="submit" className="btn btn-light"><i className="fa fa-plus"></i> Crear</button>
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

export default Paciente;