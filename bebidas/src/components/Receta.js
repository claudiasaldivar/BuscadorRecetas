import React,{useContext, useState} from 'react';
import { MondalContext } from '../context/ModalContext';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';

function getModalStyle() {
    const top = 60 ;
    const left = 50;
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles(theme => ({
    paper: {
      position: 'absolute',
      width: 450,
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
}));

const Receta = ({receta}) => {

    //Configuracion del modal de material-ui
    const [ modalStyle ] = useState(getModalStyle);
    const [ open, setOpen ] = useState(false);

    const classes = useStyles();

    const handleOpen = () => {

        setOpen(true);
    }

    const handleClose = () => {

        setOpen(false);
    }

    const {strDrink, strDrinkThumb, idDrink} = receta;

    //Extraer datos del context
    const {guardarIdReceta, info, guardarReceta}=useContext(MondalContext);

    const mostrarIngredientes = info => {
        let ingredientes = [];

        for(let i=1; i < 16 ; i++){
            if(info[`strIngredient${i}`]){
                ingredientes.push(
                    <li>
                        {info[`strIngredient${i}`]}
                        {info[`strMeasure${i}`]}
                    </li>
                )
            }
        }
        return ingredientes;
    }
    return ( 
        <div className="col-md-4 mb-3">
            <div className="card">
                <h2 className="card-header">{strDrink}</h2>
                <img className="card-img-top" src={strDrinkThumb} alt={`Imagen de ${strDrink}`}/>
            </div>
            <div className="card-body">
                <button
                    type="button"
                    className="btn btn-block btn-primary"
                    onClick={() =>{
                        guardarIdReceta(idDrink);
                        handleOpen()
                    }}
                >
                    Ver receta
                </button>
                <Modal
                    open={open}
                    onClose={() => {
                        guardarIdReceta(null)
                        guardarReceta({})
                        handleClose();
                    }}
                >
                    <div 
                        style={modalStyle} 
                        className={classes.paper}
                    >
                        <h2>{info.strDrink}</h2>
                        <h3 className="mt-4">Instrucciones</h3>
                        <p>
                            {info.strInstructions}
                        </p>
                        <img className="img-fluid my-4" src={info.strDrinkThumb} alt={info.strDrink}/>
                        <h3>Ingredientes y cantidades</h3>
                        <ul>
                            {mostrarIngredientes(info)}
                        </ul>
                    </div>
                </Modal>
            </div>
        </div>
     );
}
 
export default Receta;