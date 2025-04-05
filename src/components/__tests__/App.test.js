
import React from 'react'; //Importa la librería React para poder escribir JSX en los componentes. render: Permite renderizar el componente en el entorno de prueba. screen: Sirve para acceder a los elementos que fueron renderizados. fireEvent: Permite simular interacciones del usuario como clics o cambios en los valores de los inputs. waitFor: Permite esperar hasta que un elemento sea encontrado, lo cual es útil en pruebas asíncronas.
import { render, screen, fireEvent, waitFor } from '@testing-library/react'; //Funciones de @testing-library/react:
import { Provider } from 'react-redux'; //Un componente de Redux para envolver el componente que estamos probando y darle acceso al store.
import { BrowserRouter as Router } from 'react-router-dom'; //Un envoltorio de react-router-dom que permite realizar pruebas de navegación.
import { ThemeProvider } from 'styled-components'; // Un envoltorio de styled-components que proporciona el tema para los componentes.
import { configureStore } from '@reduxjs/toolkit'; //Función de @reduxjs/toolkit que permite configurar el store de Redux.
import App from '../../App'; //App: El componente principal que estamos probando.
import { theme } from '../../Styles/theme'; //El tema de la aplicación que se pasa a ThemeProvider.
import libraryReducer from '../../redux/slices/librarySlice'; //Reducers de Redux que controlan el estado de la biblioteca y de la búsqueda.
import searchReducer from '../../redux/slices/searchSlice'; //Reducers de Redux que controlan el estado de la biblioteca y de la búsqueda.
import axios from 'axios'; //Librería para realizar solicitudes HTTP. En este caso, está siendo simulada con jest.mock.

// Simula la API para la búsqueda de canciones
jest.mock('axios'); //Simula el módulo axios para evitar realizar una solicitud HTTP real durante las pruebas.
axios.get.mockResolvedValue({ //Configura la función axios.get para que devuelva una respuesta simulada cuando sea llamada. Esta respuesta contiene datos de un álbum llamado Album1.
  data: {
    album: [
      { idAlbum: '123', strAlbum: 'Album1', strArtist: 'Artist1' },
    ],
  },
});

describe('App Component', () => {
  const mockStore = configureStore({  // Crea una instancia de un store de prueba utilizando configureStore de @reduxjs/toolkit. Este store tiene dos reducers: libraryReducer: Maneja el estado de la biblioteca. searchReducer: Maneja el estado de la búsqueda.
    reducer: {
      library: libraryReducer,
      search: searchReducer,
    },
  });

  it('renderiza los componentes Header, SearchBar, SearchResults y Library', () => {
    render( //Renderiza el componente App envolviéndolo con los proveedores necesarios: Provider: Proporciona el store de Redux. Router: Proporciona el entorno de navegación. ThemeProvider: Proporciona el tema.
      <Provider store={mockStore}>
        <Router>
          <ThemeProvider theme={theme}>
            <App />
          </ThemeProvider>
        </Router>
      </Provider>
    );

    // Verificar que los componentes principales se renderizan correctamente
    expect(screen.getByText('Mi Biblioteca')).toBeInTheDocument(); // Verifica que el texto "Mi Biblioteca" esté presente en el documento, lo que indica que el componente Library se ha renderizado correctamente.
    expect(screen.getByPlaceholderText('Busca un artista...')).toBeInTheDocument(); // Verifica que el SearchBar se ha renderizado correctamente, buscando un input con el texto "Busca un artista..." como placeholder.
  });

  it('simula buscar canciones y verificar que los resultados se muestran correctamente', async () => {
    render( //Renderiza el componente App con el store.
      <Provider store={mockStore}>
        <Router>
          <ThemeProvider theme={theme}>
            <App />
          </ThemeProvider>
        </Router>
      </Provider>
    );

    // Simula la escritura en el input de búsqueda
    const searchInput = screen.getByPlaceholderText('Busca un artista...'); //Obtiene el input de búsqueda por su placeholder.
    fireEvent.change(searchInput, { target: { value: 'Album1' } }); //Simula un cambio en el input de búsqueda escribiendo "Album1".

    // Simula el submit del formulario
    fireEvent.submit(screen.getByRole('button', { name: /buscar/i })); //Simula un submit del formulario, haciendo clic en el botón de búsqueda.

    // Espera a que los resultados de la búsqueda aparezcan
    await waitFor(() => screen.getByText('Album1')); // Verifica que "Album1" aparece en los resultados de búsqueda y Espera hasta que el texto "Album1" aparezca en la pantalla.

    // Verifica que la canción 'Album1' aparece en los resultados de búsqueda
    const albumElement = screen.getByText('Album1');
    expect(albumElement).toBeInTheDocument();  // Asegura de que "Album1" aparece en los resultados de búsqueda
  });
});
