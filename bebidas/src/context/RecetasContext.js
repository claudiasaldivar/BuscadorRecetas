import React, {createContext, useState, useEffect} from 'react';
import axios from 'axios';

export const RecetasContext=createContext();

const RecetaProvider = (props) => {

    const [recetas, guardarRecetas] = useState([])
    const [busqueda, buscarRecetas] = useState({
        nombre: '',
        categoria:''
    });

    const [consultar, guardarConsultar] = useState(false);

    const {nombre, categoria} = busqueda;

    useEffect(() => {
        if(consultar) {
            const obtenerRecetas = async () => {
                const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${nombre}&?c=${categoria}`;
                const respuesta = await axios.get(url);
    
                guardarRecetas(respuesta.data.drinks);
            }
            obtenerRecetas();
        }
    }, [busqueda, categoria,consultar,nombre])

    return (  
        <RecetasContext.Provider
            value={{
                recetas,
                buscarRecetas,
                guardarConsultar
            }}
        >
            {props.children}
        </RecetasContext.Provider>
    );
}
 
export default RecetaProvider;