import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { getPacientesByBarrios } from '../fetch/barriosFetch';
import { getPacientesByEdades } from '../fetch/pacientesFetch';
import { getVisitasByMes } from '../fetch/visitasFetch';
import { getVisitasBySemana } from '../fetch/visitasFetch';
import BarChart from './charts/BarChart';

function Home () {
    const [pacientesByBarrios, setPacientesByBarrios] = useState([]);
    const [pacientesByEdades, setPacientesByEdades] = useState([]);
    const [selectorPeriodo, setSelectorPeriodo] = useState([]);
    const [visitasByPeriodo, setVisitasByPeriodo] = useState([]);

    const [pacByBarChart, setPacByBarChart] = useState([]);
    const [pacByEdadChart, setPacByEdadChart] = useState([]);
    const [visByPerChart, setVisByPerChart] = useState([]);

    const {handleSubmit, register, errors} = useForm();

    useEffect(() => {
        getPacientesByBarrios()
        .then(response => response.json())
        .then(response => setPacientesByBarrios(response))
        .catch(error => (error.message));

        getPacientesByEdades()
        .then(response => response.json())
        .then(response => setPacientesByEdades(response))
        .catch(error => (error.message));
    }, []);

    useEffect(() => {
        const coordenadasBarrios = pacientesByBarrios.map(item => {
            return {
                x: item.nombre,
                y: item.cantidad
            }
        });

        const coordenadasEdades = pacientesByEdades.map(item => {
            return {
                x: item.edad.toString(),
                y: item.cantidad
            }
        });

        setPacByBarChart(coordenadasBarrios);
        setPacByEdadChart(coordenadasEdades);

        switch (selectorPeriodo) {
            // case 'diario': alert('diario');
            //     break;
            case 'semanal': const dias = ['', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
                            const coordenadasDias = visitasByPeriodo.map(item => {
                                return {
                                    x: dias[item.dia],
                                    y: item.cantidad
                                }
                            });
                            setVisByPerChart(coordenadasDias);
                break;
            case 'mensual': const meses = ['', 'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
                            const coordenadasMes = visitasByPeriodo.map(item => {
                                return {
                                    x: meses[item.mes],
                                    y: item.cantidad
                                }
                            });
                            setVisByPerChart(coordenadasMes);
                break;
            default: console.log('No existe la opción.');
        }
    }, [pacientesByBarrios, pacientesByEdades, visitasByPeriodo]);

    const getPeriodo = (values) => {
        setSelectorPeriodo(values.periodo);
        switch (values.periodo) {
            // case 'diario': alert('diario');
            //     break;
            case 'semanal': getVisitasBySemana()
                            .then(response => response.json())
                            .then(response => setVisitasByPeriodo(response))
                            .catch(error => (error.message));
                break;
            case 'mensual': getVisitasByMes()
                            .then(response => response.json())
                            .then(response => setVisitasByPeriodo(response))
                            .catch(error => (error.message));
                break;
            default: console.log('No existe la opción.');
        } 
    }

    return(
        <>
        <div className="container">
            <div className="row">
                <div className="col-10 mt-2">
                    <div className="card">
                        <div className="card-body">
                            <h4 class="card-title">Contagiados por Barrio</h4>
                            <div className="card-text">
                                <div className="row">
                                    <div className="col-12 mt-5">
                                        <BarChart
                                            title1='Contagiados'
                                            data1={pacByBarChart}
                                            color1='#acbf61'
                                            height={350}
                                            margin={{ bottom: 100, left: 120, top: 70, right: 80}}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-10 mt-2">
                    <div className="card">
                        <div className="card-body">
                            <h4 class="card-title">Contagiados por Edades</h4>
                            <div className="card-text">
                                <div className="row">
                                    <div className="col-12 mt-5">
                                        <BarChart
                                            title1='Contagiados'
                                            data1={pacByEdadChart}
                                            color1='#acbf61'
                                            height={350}
                                            margin={{ bottom: 100, left: 120, top: 70, right: 80}}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-10 mt-2">
                    <div className="card">
                        <div className="card-body">
                            <h4 class="card-title">Informe de Visitas</h4>
                            <div className="card-text">
                                <div className="row">
                                    <div className="col-12 mt-5 offset-1">
                                        <form onSubmit={handleSubmit(getPeriodo)}>
                                            <div className="row">
                                                <div className="col-12">
                                                    <select name="periodo" ref={register}>
                                                        {/* <option value="diario">Diario</option> */}
                                                        <option value="semanal">Semanal</option>
                                                        <option value="mensual">Mensual</option>
                                                    </select>
                                                    <button type="submit" className="btn btn-light"><i className="fa fa-search"></i> Consultar</button>
                                                </div>
                                            </div>   
                                        </form>
                                    </div>
                                    <div className="col-12 mt-5">
                                        <BarChart
                                            title1='Visitados'
                                            data1={visByPerChart}
                                            color1='#acbf61'
                                            height={350}
                                            margin={{ bottom: 100, left: 120, top: 70, right: 80}}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}

export default Home;