import React from 'react';

import Header from './components/Header';
import Formulario from './components/Formulario';
import ListRecetas from './components/ListasRecetas';

import CategoriasProvider  from './context/CategoriasContext';
import RecetaProvider from './context/RecetasContext';
import ModalProvider from './context/ModalContext';

function App() {
  return (
    <CategoriasProvider>
      <RecetaProvider>
        <ModalProvider>
        <Header />
          <div className="container">
            <div className="row">
              <Formulario />
            </div>
            <ListRecetas/>
          </div>
        </ModalProvider>
      </RecetaProvider>
    </CategoriasProvider>
  );
}

export default App;
