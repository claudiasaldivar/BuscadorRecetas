import React, {createContext, useState, useEffect} from 'react';
import axios from 'axios';

export const MondalContext = createContext();

const ModalProvider = (props) => {

    //state del provider
    const [idreceta, guardarIdReceta] = useState(null);
    const [info, guardarReceta] = useState({});

    //Cuando se tenga una receta llamar a la api
    useEffect(() => {
        const obtenerReceta=async() => {
            if(!idreceta) return;

            const url=`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idreceta}`;
            const resultado = await axios.get(url);
            guardarReceta(resultado.data.drinks[0]);
        }
        obtenerReceta();
    }, [idreceta])

    return ( 
        <MondalContext.Provider
            value={{
                info,
                guardarIdReceta,
                guardarReceta
            }}
        >
            {props.children}
        </MondalContext.Provider>
     );
}
 
export default ModalProvider;