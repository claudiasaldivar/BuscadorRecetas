import React, {useContext, useState} from 'react';
import { CategoriasConext } from '../context/CategoriasContext';
import { RecetasContext } from '../context/RecetasContext';

const Formulario = () => {

    const [busqueda, guardarBusqueda] = useState({
        nombre: '',
        categoria: ''
    });

    const {categorias} = useContext(CategoriasConext);
    const {buscarRecetas, guardarConsultar} = useContext(RecetasContext);

    const obtenerDatosReceta = e => {
        guardarBusqueda({
            ...busqueda,
            [e.target.name] : e.target.value
        })
    }

    
    return ( 
        <form
            className="col-12 mt-4"
            onSubmit={e => {
                e.preventDefault();
                buscarRecetas(busqueda);
                guardarConsultar(true)
            }}
        >
            <fieldset className="text-center">
                <legend>Busca bebidas por categoria o ingredientes</legend>
            </fieldset>

            <div className="row mt-4">
                <div className="col-md-4">
                    <input 
                        name="nombre"
                        className="form-control"
                        type="text"
                        placeholder="Buscar por ingrediente"
                        onChange={obtenerDatosReceta}
                    />
                </div>
                <div className="col-md-4">
                    <select
                       className="form-control"
                       name="categoria"
                       onChange={obtenerDatosReceta} 
                    >
                        <option value="">---Selecciona categoría---</option>
                            {categorias.map(categoria => (
                                <option 
                                    key={categoria.strCategory} 
                                    value={categoria.strCategory}
                                >{categoria.strCategory}</option>
                            )) }
                    </select>
                </div>
                <div className="col-md-4">
                    <input 
                        type="submit"
                        className="btn btn-block btn-primary"
                        value="Buscar bebidas"
                    />
                </div>
            </div>
        </form>
     );
}
 
export default Formulario;