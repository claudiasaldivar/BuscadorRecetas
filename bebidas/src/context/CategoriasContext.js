import React, {createContext, useState, useEffect} from 'react';
import axios from 'axios';

//Create context
export const CategoriasConext=createContext();

//Provider en donde se encuentran las funciones y el state
const CategoriasProvider = (props) => {

    //Crear un state
    const [categorias, guardarCategorias] = useState([]);

    //Ejecutar el llamado a la api
    useEffect(() => {

        const obtenerReceta = async () => {
            const url = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';

            const categorias = await axios.get(url);
            guardarCategorias(categorias.data.drinks)
        }
        obtenerReceta();
    }, [])

    return (
        <CategoriasConext.Provider
            value={{
                categorias
            }}
        >
            {props.children}
        </CategoriasConext.Provider>
    )
}

export default CategoriasProvider;