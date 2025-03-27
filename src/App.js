import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import Header from './components/Header/Header';
import SearchResults from './components/SearchResults/SearchResults';
import Library from './components/Library/Library';
import SongDetail from './components/SongDetail/SongDetail';
import SearchBar from './components/SearchBar/SearchBar';

import useFetch from './hooks/useFetch';
import './App.css';

function App() {
  const [searchTerm, setSearchTerm] = useState(''); //Guarda el termino que escribe el usuario en el buscador.
  const [library, setLibrary] = useState([]);  //Guarda las canciones/álbumes que el usuario agrega a su biblioteca personal.

  const proxyUrl = 'https://cors-anywhere.herokuapp.com/';  // Es un servicio temporal para evitar el error de CORS.
  const apiUrl = `https://theaudiodb.com/api/v1/json/2/searchalbum.php?s=${searchTerm}`;  // URL de la API de TheAudioDB que busca álbumes por nombre de artista.
  
  const { data, loading, error, refetch } = useFetch(  //Si searchTerm tiene texto, se construye la URL completa (proxyUrl + apiUrl) y se pasa al hook. useFetch devuelve:    data(los resultados), loading(solicitud en curso), error(si ocurrió un error) y refetch (función para volver a intentar).
    searchTerm ? `${proxyUrl}${apiUrl}` : null
  );


  useEffect(() => { //Cada vez que cambia la biblioteca, imprime su contenido en la consola.
    console.log('Biblioteca actualizada:', library);
  }, [library]);

  const addToLibrary = (song) => { //Función para agregar una canción si no está repetida (usa idAlbum para identificarla).
    const exists = library.find(item => item.idAlbum === song.idAlbum);
    if (!exists) {
      setLibrary([...library, song]);
    }
  };

  //Render de la estructura JSX
  return (
    <div className="App">
      <Header />
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />  {/*Componente de búsqueda con props para leer y cambiar el término.*/}
      <Routes>  
        <Route
          path="/"
          element={
            <SearchResults
              data={data}
              loading={loading}
              error={error}
              onAdd={addToLibrary}
              refetch={refetch}
            /> //  muestra resultado de la busqueda y permite agregar canciones
          }
        />
        <Route path="/song/:id" element={<SongDetail />} /> {/*  muestra resultado de la busqueda y permite agregar canciones y muestra detalles de una canción específica con el ID desde la URL.*/}
      </Routes>
      <Library songs={library} />  {/* Muestra la biblioteca del usuario, pasando las canciones como prop.*/}
    </div>
  );
}

export default App;