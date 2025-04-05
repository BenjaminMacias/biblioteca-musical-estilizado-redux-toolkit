import React from 'react'; //para usar JSX y crear componentes.
import { render, screen, fireEvent } from '@testing-library/react'; //render, screen, fireEvent: Herramientas de @testing-library/react para renderizar componentes, interactuar con el DOM y hacer pruebas.
import configureStore from 'redux-mock-store'; //configureStore: Función de redux-mock-store para crear un store simulado en las pruebas.
import { Provider } from 'react-redux'; //Provider: Proveedor de Redux para que el componente tenga acceso al store.
import { ThemeProvider } from 'styled-components'; //ThemeProvider: Proveedor de styled-components para aplicar un tema a los componentes.
import { theme } from '../../Styles/theme'; //theme: El tema de la aplicación que se pasa a través de ThemeProvider.
import SearchResults from '../SearchResults/SearchResults'; // El componente que se esta probando, que muestra los resultados de búsqueda.
import { fetchSongs } from '../../redux/slices/searchSlice'; //fetchSongs: Acción que se llama cuando se busca canciones, que queremos simular.


jest.mock('../../redux/slices/searchSlice', () => ({ //Mocks la importación de fetchSongs para evitar realizar una llamada a la API real./
  ...jest.requireActual('../../redux/slices/searchSlice'), //Importa el módulo real, y luego sobrescribe solo fetchSongs para evitar efectos secundarios y controlar el comportamiento de la función.
  fetchSongs: jest.fn(() => ({ type: 'search/fetchSongs' })), // Se simula como una función que simplemente devuelve un action con el tipo 'search/fetchSongs'. No se hace la llamada a la API real, pero podemos verificar si se ha llamado correctamente en las pruebas.
}));

const mockStore = configureStore([]);  //Crea una instancia de un store de prueba con el middleware necesario para simular el comportamiento de Redux. El store no tiene ningún estado inicial, solo se configura con el middleware de Redux.


const renderWithStore = (store) => // función auxiliar que renderiza el componente SearchResults dentro de dos proveedores: Provider de Redux, que da acceso al store. y ThemeProvider de styled-components, que aplica el tema de la aplicación. 
  render(
    <Provider store={store}>  
      <ThemeProvider theme={theme}>
        <SearchResults />
      </ThemeProvider>
    </Provider>
  );

describe('SearchResults', () => {  //agrupa las pruebas relacionadas con el componente SearchResults.
  test('renderiza la lista de resultados', () => {  //Configura un store simulado con resultados de búsqueda de canciones (dos canciones).
    const store = mockStore({
      search: {
        results: [
          { idAlbum: '1', strAlbum: 'Song A', strArtist: 'Artist A', strAlbumThumb: '' },
          { idAlbum: '2', strAlbum: 'Song B', strArtist: 'Artist B', strAlbumThumb: '' },
        ],
        loading: false,
        error: null,
      },
    });

    renderWithStore(store);  //renderiza el componente con ese store simulado.
    expect(screen.getByText('Song A')).toBeInTheDocument();
    expect(screen.getByText('Song B')).toBeInTheDocument(); //verifican si las canciones "Song A" y "Song B" se muestran en el DOM.
  });

  test('botón agregar ejecuta función sin errores', () => { 
    const store = mockStore({ //Configura un store con una canción.
      search: {
        results: [
          { idAlbum: '1', strAlbum: 'Song A', strArtist: 'Artist A', strAlbumThumb: '' },
        ],
        loading: false,
        error: null,
      },
    });

    renderWithStore(store);  //renderiza el componente.
    const addButton = screen.getByText(/agregar/i); //obtiene el botón "Agregar".
    fireEvent.click(addButton); // simula un clic en el botón de agregar.
    expect(addButton).toBeInTheDocument(); //asegura que el botón sigue en el DOM después del clic.
  });

  test('muestra mensaje cuando no hay resultados', () => { 
    const store = mockStore({  //Configura un store con sin resultados de búsqueda.
      search: {
        results: [],
        loading: false,
        error: null,
      },
    });

    renderWithStore(store); //renderiza el componente.
    expect(screen.getByText(/no hay resultados/i)).toBeInTheDocument(); //verifica que se muestra el mensaje de "No hay resultados" cuando no hay canciones.
  });

  test('muestra mensaje de carga', () => { //Configura un store con loading en true y sin resultados.
    const store = mockStore({
      search: {
        results: [],
        loading: true,
        error: null,
      },
    });

    renderWithStore(store); //renderiza el componente.
    expect(screen.getByText(/cargando/i)).toBeInTheDocument(); //asegura que el mensaje de "Cargando..." aparece mientras se están cargando los resultados.
  });

  test('muestra mensaje de error y botón de reintento', () => {
    localStorage.setItem('lastSearchTerm', 'Daft Punk'); //guarda un término de búsqueda previo.

    const store = mockStore({ //Configura un store con un error en la búsqueda.
      search: {
        results: [],
        loading: false,
        error: 'Algo salió mal',
      },
    });

    renderWithStore(store); //renderiza el componente.

    expect(screen.getByText(/algo salió mal/i)).toBeInTheDocument(); //asegura que se muestra el mensaje de error.
    const retryButton = screen.getByText(/reintentar/i); 

    fireEvent.click(retryButton); // simula un clic en el botón de reintento.
    expect(fetchSongs).toHaveBeenCalledWith('Daft Punk'); //verifica que fetchSongs se llama con el término de búsqueda anterior.
  });
});
