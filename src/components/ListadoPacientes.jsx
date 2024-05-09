import React, { useState, useEffect } from 'react';
import { getPacientes, eliminarPaciente } from '../api';

const ListadoPacientes = ({ setPaciente }) => {
    const [pacientes, setPacientes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPacientes = async () => {
            try {
                const data = await getPacientes();
                setPacientes(data);
                setLoading(false);
            } catch (error) {
                setError('Error al recuperar la lista de pacientes');
                setLoading(false);
            }
        };

        fetchPacientes();
    }, []);

    const handleEliminarPaciente = async (id) => {
        try {
            await eliminarPaciente(id);
            const pacientesActualizados = pacientes.filter((paciente) => paciente.id !== id);
            setPacientes(pacientesActualizados);
        } catch (error) {
            setError('Error al eliminar el paciente');
        }
    };

    return (
        <div className="md:w-1/2 lg:w-3/5 md:h-screen overflow-y-scroll">
            {loading ? (
                <p>Cargando pacientes...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <>
                    {pacientes.length > 0 ? (
                        <>
                            <h2 className="font-black text-3xl text-center">Listado de pacientes</h2>
                            <p className="text-xl mt-5 mb-10 text-center">
                                Administra tus{' '}
                                <span className="text-red-500 font-bold">Pacientes y Turnos</span>
                            </p>
                            {pacientes.map((paciente) => (
                                <div key={paciente.id} className="mx-3 my-5 bg-white shadow-md px-5 py-10 rounded-xl">
                                    <p className="font-bold mb-3 text-gray-700 uppercase">Nombre: {''}
                                        <span className="font-normal normal-case">{paciente.nombre}</span>
                                    </p>
                                    <p className="font-bold mb-3 text-gray-700 uppercase">Propietario: {''}
                                        <span className="font-normal normal-case">{paciente.propietario}</span>
                                    </p>
                                    <p className="font-bold mb-3 text-gray-700 uppercase">Email: {''}
                                        <span className="font-normal normal-case">{paciente.email}</span>
                                    </p>
                                    <p className="font-bold mb-3 text-gray-700 uppercase">Fecha alta: {''}
                                        <span className="font-normal normal-case">{paciente.fecha}</span>
                                    </p>
                                    <p className="font-bold mb-3 text-gray-700 uppercase">sintomas: {''}
                                        <span className="font-normal normal-case">{paciente.sintomas}</span>
                                    </p>
                                    {/* Agregar el resto de la información del paciente */}
                                    <div className="flex justify-between">
                                        <button
                                            type="button"
                                            className="py-2 px-9 bg-blue-500 hover:bg-blue-700 text-white font-bold uppercase rounded-md"
                                            onClick={() => setPaciente(paciente)}
                                        >
                                            Editar
                                        </button>
                                        <button
                                            type="button"
                                            className="py-2 px-9 bg-red-500 hover:bg-red-700 text-white font-bold uppercase rounded-md"
                                            onClick={() => handleEliminarPaciente(paciente.id)}
                                        >
                                            Eliminar
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </>
                    ) : (
                        <>
                            <h2 className="font-black text-3xl text-center">No hay pacientes</h2>
                            <p className="text-xl mt-5 mb-10 text-center">
                                Agrega a tus pacientes{' '}
                                <span className="text-red-500 font-bold">y apareceran aqui</span>
                            </p>
                        </>
                    )}
                </>
            )}
        </div>
    );
};

export default ListadoPacientes;