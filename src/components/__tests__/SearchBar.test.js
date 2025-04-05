
import React from 'react';
/*Se importan tres funciones clave de la biblioteca ReactTesting Library render Esta función renderiza el componente React en un contenedor DOM simulado. screen Es una herramienta que nos permite acceder a los elementos que se han renderizado en el DOM. fireEvent Se utiliza para simular eventos (como clics o cambios de valor) en los elementos del DOM*/
import { render, screen, fireEvent } from '@testing-library/react';
// Este componente se usa para envolver la aplicación y pasar el store de Redux a los componentes.
import { Provider } from 'react-redux';
//para envolver la aplicación con el tema definido (el archivo theme.js).
import { ThemeProvider } from 'styled-components';
//Se importa configureStore, que es la función que se utiliza para crear un store de Redux de manera más sencilla.
import { configureStore } from '@reduxjs/toolkit';
//Importa el componente SearchBar que estamos probando.
import SearchBar from '../SearchBar/SearchBar';
//Importa el objeto theme que contiene las configuraciones de estilo de la aplicación. Este tema se pasa a través de ThemeProvider.
import { theme } from '../../Styles/theme';
//Importa el reducer de Redux para la funcionalidad de búsqueda responsable de manejar el estado de la búsqueda de canciones.
import searchReducer from '../../redux/slices/searchSlice';
//Importa la función fetchSongs, que es un thunk de Redux para realizar una solicitud asincrónica para buscar canciones. 
import { fetchSongs } from '../../redux/slices/searchSlice';

//Mocker del thunk. mockea la función fetchSongs usando jest.fn() para que no realice la acción real de buscar canciones. En lugar de eso, devuelve un objeto con el tipo y la carga útil del payload que espera la acción en Redux.
jest.mock('../../redux/slices/searchSlice', () => ({
  fetchSongs: jest.fn((term) => ({ type: 'search/fetchSongs', payload: term })), //Se crea una función mock para fetchSongs que simplemente retorna una acción con el tipo search/fetchSongs y el término de búsqueda (term) como su payload. Esto simula lo que ocurre en Redux sin hacer llamadas a la API.
}));

// Store de prueba. createTestStore define una función que crea un store de Redux para las pruebas. Utiliza configureStore con el reducer searchReducer, que maneja el estado de la búsqueda.
const createTestStore = () =>
  configureStore({
    reducer: { search: searchReducer },
  });

// Renderizador con proveedores Esta función envuelve el componente que queremos probar (en este caso SearchBar) con los proveedores necesarios. 
// Provider: Envuelve el componente con el store de Redux para que el componente tenga acceso a él. 
// ThemeProvider: Envuelve el componente con el ThemeProvider para proporcionar los estilos temáticos.

const renderWithProviders = (ui, store) =>
  render(  //La función render de React Testing Library se utiliza para renderizar el componente de la interfaz de usuario (UI) dentro de estos proveedores.
    <Provider store={store}>
      <ThemeProvider theme={theme}>{ui}</ThemeProvider>
    </Provider>
  );

//renderiza input de búsqueda correctamente. 
describe('SearchBar', () => {
  test('renderiza input de búsqueda correctamente', () => { //Define una prueba para verificar que el input de búsqueda se renderiza correctamente en el DOM.
    const store = createTestStore();  //Crea un store de prueba.
    renderWithProviders(<SearchBar />, store);  //Renderiza el componente SearchBar con el store de prueba.
    expect(screen.getByPlaceholderText(/busca un artista/i)).toBeInTheDocument(); //tiliza screen.getByPlaceholderText para buscar el input de búsqueda por su texto de marcador de posición ("busca un artista") y luego espera que esté presente en el documento.
  });

  test('permite escribir en el input', () => {  //Define una prueba para simular que el usuario escribe en el input de búsqueda.
    const store = createTestStore();  
    renderWithProviders(<SearchBar />, store);  
    const input = screen.getByPlaceholderText(/busca un artista/i); //Busca el input de búsqueda por su placeholder.
    fireEvent.change(input, { target: { value: 'Nirvana' } }); //Utiliza fireEvent.change para simular que el usuario cambia el valor del input a 'Nirvana'.
    expect(input.value).toBe('Nirvana');  // Verifica si el valor del input es igual a 'Nirvana', lo que confirma que la escritura funciona.
  });

  test('ejecuta búsqueda al hacer clic en el botón', () => { //Define una prueba que simula el clic en el botón "Buscar" y verifica que la acción de búsqueda se ejecuta correctamente.
    const store = createTestStore();
    renderWithProviders(<SearchBar />, store);
    const input = screen.getByPlaceholderText(/busca un artista/i);
    fireEvent.change(input, { target: { value: 'Muse' } }); //Cambia el valor del input a 'Muse'.
    fireEvent.click(screen.getByText(/buscar/i)); //Simula un clic en el botón Buscar.
    expect(fetchSongs).toHaveBeenCalledWith('Muse');  //Verifica que la función fetchSongs fue llamada con el término de búsqueda 'Muse'.
  });

  test('ejecuta búsqueda al presionar Enter (simulando submit)', () => { //Define una prueba que simula el envío del formulario al presionar Enter (lo cual dispara la acción de búsqueda).
    const store = createTestStore(); //función usada para crear una instancia del store de Redux. Este store se configura con el reducer de búsqueda que importado. La constante store contiene el objeto del store creado, se pasa luego a la función de renderizado para permitir que el componente tenga acceso al estado de Redux.
    renderWithProviders(<SearchBar />, store);  //funcion definida para envolver searchBar. renderiza el componente SearchBar dentro de estos proveedores para que pueda acceder tanto al estado global de la aplicación (Redux) como a los estilos definidos en el tema.
    const input = screen.getByPlaceholderText(/busca un artista/i); // Utiliza React Testing Library para buscar un input de búsqueda en el DOM renderizado por el componente. El /busca un artista/i es una expresión regular que busca el placeholder del input con el texto "Busca un artista". El i al final significa que la búsqueda no distingue entre mayúsculas y minúsculas. La constante input guarda la referencia al input encontrado en el DOM, para poder interactuar con él más tarde (en este caso, para simular la escritura).
    fireEvent.change(input, { target: { value: 'Queen' } });  //fireEvent.change: Es una función de React Testing Library que simula un evento de cambio (change) en un elemento del DOM. En este caso, simula que el usuario escribe algo en el input de búsqueda. input: Es el elemento al que se le aplicará el evento (el input encontrado en la línea anterior). { target: { value: 'Queen' } }: Este es el objeto de evento simulado que se pasa a fireEvent.change. target es el objeto que genera el evento (en este caso, el input). value es el valor que el input tendrá después del cambio, lo que simula que el usuario ha escrito "Queen" en el campo de búsqueda.
    fireEvent.submit(input.closest('form'));  //Simula el submit del formulario cuando el usuario presiona Enter.

    expect(fetchSongs).toHaveBeenCalledWith('Queen'); //Verifica que la función fetchSongs fue llamada con el término de búsqueda 'Queen'.
  });
});
