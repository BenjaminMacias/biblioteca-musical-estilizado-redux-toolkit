//Esta función se importa desde @reduxjs/toolkit y se usa para configurar el store de Redux. 
// Facilita la creación de un store con una configuración sencilla y 
// adecuada para proyectos modernos con Redux.
import { configureStore } from '@reduxjs/toolkit'; 
//Es una librería popular para hacer solicitudes HTTP. 
// Se usa aquí para simular las solicitudes a una API.
import axios from 'axios';
//Son acciones creadas por el slice searchSlice. 
// fetchSongs es una acción asíncrona (un "thunk") que se utiliza para obtener canciones de una API.
// resetResults se usa para restablecer los resultados y el estado de la búsqueda.
import { fetchSongs, resetResults } from '../../redux/slices/searchSlice'; // Ajusta la ruta según sea necesario
// Es el reductor que maneja el estado de la búsqueda (resultados, errores, y estado de carga).
import searchReducer from '../../redux/slices/searchSlice'; // Ajusta la ruta según sea necesario
//para simular todas las funciones de axios, de manera que no se realicen solicitudes HTTP reales durante las pruebas. 
// Esto permite controlar las respuestas de la API para probar cómo se comporta el sistema en diferentes escenarios.
jest.mock('axios');  // Simula las llamadas a axios

describe('searchSlice', () => {
  let store; //Declara una variable store que se usará en cada prueba para acceder al estado de la aplicación.

  beforeEach(() => { //Esta función se ejecuta antes de cada prueba para configurar el store de prueba. Se inicializa con el reducer de búsqueda (searchReducer) y se almacena en la variable store para poder usarla en las pruebas.
    store = configureStore({
      reducer: {
        search: searchReducer,
      },
    });
  });

  it('debería cargar los datos correctamente', async () => {
    const mockData = { album: [{ idAlbum: '123', strAlbum: 'Album1' }] }; //Crea datos simulados (mock) para la respuesta de la API, representando un álbum con el id '123' y el nombre 'Album1'.
    
    axios.get.mockResolvedValue({ data: mockData });  // Utiliza jest.mock para simular una respuesta exitosa de la API. Cuando se haga una llamada con axios.get, se devolverán los datos simulados (mockData).

    await store.dispatch(fetchSongs('artistName'));  // Despacha la acción asíncrona fetchSongs con el término de búsqueda 'artistName'. La acción realiza la llamada a la API, que se simula con la respuesta de mockData. Llama al async thunk

    const state = store.getState().search;  //  Obtiene el estado de la búsqueda del store después de que se haya ejecutado la acción. Este estado contiene los resultados, el estado de carga y los errores.
    
    expect(state.loading).toBe(false);  //Verifica que el estado de carga esté desactivado (false), lo que indica que la solicitud ha finalizado.
    expect(state.results).toEqual(mockData.album);  // Verifica que los resultados de búsqueda sean iguales a los datos simulados (mockData.album), confirmando que la acción ha cargado correctamente los resultados.
  });

  // Define una prueba para verificar que el sistema maneje correctamente los errores de carga.
  it('debería mostrar un mensaje de error cuando hay un fallo en la carga', async () => {
    const errorMessage = 'Ocurrió un error al buscar canciones.'; //Define el mensaje de error simulado que se mostrará cuando la API falle.

    axios.get.mockRejectedValue(new Error(errorMessage));  // Simula que la solicitud a la API falla, rechazando la promesa con un error que tiene el mensaje errorMessage.

    await store.dispatch(fetchSongs('artistName'));  // Despacha la acción asíncrona fetchSongs para realizar la solicitud. Llama al async thunk

    const state = store.getState().search; //Obtiene el estado de la búsqueda después de que se haya ejecutado la acción.

    expect(state.loading).toBe(false); //Verifica que el estado de carga esté desactivado (false), lo que indica que la solicitud falló.
    expect(state.error).toBe(errorMessage); // Verifica que el estado de error contenga el mensaje de error simulado, asegurando que el sistema maneja correctamente los errores.
  });

  // Define una prueba para verificar cómo se maneja una respuesta vacía de la API.
  it('debería manejar la carga correctamente', async () => {
    axios.get.mockResolvedValue({ data: { album: [] } });  // Simula una respuesta exitosa con datos vacíos

    await store.dispatch(fetchSongs('artistName'));  // Despacha la acción asíncrona fetchSongs para realizar la solicitud. Llama al async thunk

    const state = store.getState().search; //Obtiene el estado de la búsqueda después de que se haya ejecutado la acción.

    expect(state.loading).toBe(false);  // Verifica que el estado de carga esté desactivado (false), lo que indica que la solicitud ha finalizado.
    expect(state.results).toEqual([]);  // Verifica que los resultados de búsqueda sean un array vacío ([]), confirmando que no hubo resultados.
  });

  // Define una prueba para verificar que la acción resetResults resetee el estado de la búsqueda.
  it('debería resetear los resultados cuando se llama resetResults', () => {
    store.dispatch(resetResults());  // Despacha la acción resetResults, que debería restablecer los resultados de la búsqueda, los errores y el estado de carga.

    const state = store.getState().search; // Obtiene el estado de la búsqueda después de que se haya ejecutado la acción.

    expect(state.results).toEqual([]);  // Verifica que los resultados estén vacíos ([]), lo que significa que se han restablecido.
    expect(state.error).toBeNull(); // Verifica que el error esté vacío (null), lo que significa que se ha restablecido.
    expect(state.loading).toBe(false);  // Verifica que el estado de carga esté desactivado (false), lo que indica que no hay solicitud en curso.
  });
});
