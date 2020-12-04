import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';
import { useForm } from 'react-hook-form';
import Sidebar from './SidebarComponent';
import { getMedicamentos } from '../fetch/medicamentosFetch';
import { getLaboratorios } from '../fetch/laboratoriosFetch';
import { getInventarios } from '../fetch/inventariosFetch';
import { putInventario } from '../fetch/inventariosFetch';

function Inventario () {
    const [inventario, setInventario] = useState([]);
    const [medicamentos, setMedicamentos] = useState([]);
    const [laboratorios, setLaboratorios] = useState([]);
    const [show, setShow] = useState(false);
    const [pedido, setPedido] = useState();

    const {handleSubmit, register, errors} = useForm();
    const {handleSubmit: pedidoSubmit, register: pedidoRegister, errors: pedidoErrors} = useForm();
    
    const columns = [
        {
            title: "Medicamento",
            field: "medicamento_id",
        },
        {
            title: "Laboratorio",
            field: "laboratorio_id",
        },
        {
            title: "Cantidad",
            field: "cantidad",
        },
    ];

    const actions = [
        {
            icon: 'add',
            tooltip: 'Nuevo Pedido',
            onClick: (event, rowData) => newRegister(rowData)
        },
    ];
    
    useEffect (() => {
        getMedicamentos()
        .then(response => response.json())
        .then(response => setMedicamentos(response))
        .catch(error => (error.message));
        
        getLaboratorios()
        .then(response => response.json())
        .then(response => setLaboratorios(response))
        .catch(error => (error.message));
    }, []);

    const consultar = (values) => {
        const params = {
            laboratorio_id: values.laboratorio_id,
            medicamento_id: values.medicamento_id
        }
        getInventarios(params)
        .then(response => response.json())
        .then(response => setInventario(response))
        .catch(error => (error.message));
    }

    const newRegister = (pedido) => {
        setShow(!show);
        setPedido(pedido);
    }

    const crearPedido = (values) => {
        const newPedido = Object.assign(values, pedido);
        putInventario(newPedido)
        .then(response => response.json())
        .then(response => setInventario(response))
        .catch(error => (error.message));
    }

    return(
        <>
        <Sidebar/>
        <div className="container">
            <div className="row">
                <div className="col-12 mt-2">
                    <form onSubmit={handleSubmit(consultar)}>
                        <div className="row">
                            <div className="col-2">
                                <select name="medicamento_id" ref={register}>
                                    {medicamentos.map(item => {return(<option key={item.id} value={item.id}>{item.nombre}</option>)})}
                                </select>
                            </div>
                            <div className="col-3">
                                <select name="laboratorio_id" ref={register}>
                                    {laboratorios.map(item => {return(<option key={item.id} value={item.id}>{item.nombre}</option>)})}
                                </select>
                            </div>
                            <div className="col-2">
                                <button type="submit" className="btn btn-light"><i className="fa fa-search"></i> Consultar</button>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="col-12 mt-2">
                    <div className="card">
                        <div className="card-body">
                            <div className="card-text">
                                <MaterialTable
                                    title="Consolidado del Inventario"
                                    data={inventario}
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
                        Datos del Pedido
                        <button className="close" onClick={()=>setShow(!show)}>&times;</button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={pedidoSubmit(crearPedido)}>
                            <div className="row offset-1">
                                <div className="col-12">
                                    <input type="number" min="1" placeholder="Seleccione la cantidad" name="unidades" ref={pedidoRegister({
                                                required: "Required"
                                            })}
                                        />
                                        {pedidoErrors.unidades && pedidoErrors.unidades.message}
                                </div>
                                <div className="col-12 mt-3">
                                    <button type="submit" className="btn btn-light"><i className="fa fa-shopping-cart"></i> Solicitar</button>
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

export default Inventario;