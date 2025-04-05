// src/components/__tests__/Library.test.js
import React from 'react'; //Importa React, necesario para poder trabajar con JSX.
import { render, screen, fireEvent } from '@testing-library/react'; //fireEvent: Permite simular eventos como clics o cambios en los valores de los inputs. screen: Se usa para acceder a los elementos renderizados en el DOM de prueba. render: Se utiliza para renderizar el componente en el DOM de prueba.
import { Provider } from 'react-redux'; //El componente Provider es utilizado para envolver el componente que se está probando y darle acceso al store de Redux.
import { ThemeProvider } from 'styled-components'; //Proveedor de styled-components que permite aplicar un tema a los componentes.
import { configureStore } from '@reduxjs/toolkit'; //Función de @reduxjs/toolkit que se usa para configurar el store de Redux.
import { MemoryRouter } from 'react-router-dom'; //Se utiliza para envolver el componente dentro de un router de memoria, permitiendo la navegación sin necesidad de un navegador real.

import { theme } from '../../Styles/theme';
import Library from '../Library/Library';
import libraryReducer from '../../redux/slices/librarySlice';

const createTestStore = (preloadedState) =>  //Esta es una función que crea una instancia de un store de prueba para las pruebas. Acepta un estado pre-cargado (preloadedState), lo que permite establecer un estado inicial específico para las pruebas.
  configureStore({
    reducer: { library: libraryReducer },
    preloadedState,
  });

const renderWithProviders = (store) =>  //Función que envuelve el componente Library con los proveedores necesarios:
  render( // Provider: Proveedor de Redux para que el componente tenga acceso al store. ThemeProvider: Proveedor de styled-components para aplicar el tema de la aplicación. MemoryRouter: Envoltorio de react-router-dom para proporcionar navegación en memoria (sin necesidad de navegador real). Luego de envolver el componente con estos proveedores, se renderiza en el DOM.
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <MemoryRouter>
          <Library />
        </MemoryRouter>
      </ThemeProvider>
    </Provider>
  );

describe('Library component', () => {
  test('muestra mensaje si no hay canciones', () => { //Función que define una prueba para el componente Library.
    const store = createTestStore({ library: [] }); //Crea un store de prueba con un estado vacío en la propiedad library.

    renderWithProviders(store); //Renderiza el componente Library con el store simulado.

    expect(
      screen.getByText(/no has agregado canciones aún/i)
    ).toBeInTheDocument(); //Verifica que el mensaje "No has agregado canciones aún" se muestra cuando la biblioteca está vacía.
  });

  test('renderiza canciones cuando existen en la biblioteca', () => {
    const store = createTestStore({  //Crea un store con una canción en la library.
      library: [
        { id: '1', title: 'Canción X', artist: 'Artista X' },
      ],
    });

    renderWithProviders(store); //Renderiza el componente Library con ese store.

    expect(screen.getByText('Canción X')).toBeInTheDocument(); //Verifica que el nombre de la canción "Canción X" esté en el documento.
    expect(screen.getByText(/Artista X/i)).toBeInTheDocument(); // Verifica que el nombre del artista "Artista X" esté en el documento.
  });

  test('elimina una canción al hacer clic en el botón', () => {
    const store = createTestStore({ //Crea un store con una canción.
      library: [
        { id: '1', title: 'Canción X', artist: 'Artista X' },
      ],
    });
  
    renderWithProviders(store); //Renderiza el componente Library con el store.
  
    expect(screen.getByText('Canción X')).toBeInTheDocument(); //Verifica que "Canción X" está en el documento antes de la eliminación.
    const removeButton = screen.getByText(/eliminar/i);
    fireEvent.click(removeButton);  //Simula un clic en el botón "Eliminar".
  
    // 🔥 Esperamos que ya no esté
    expect(screen.queryByText('Canción X')).not.toBeInTheDocument(); //Verifica que "Canción X" ya no está en el documento después del clic, usando queryByText, que devuelve null si no encuentra el elemento.
  });
  

  test('usa $hasManySongs si hay más de 5 canciones', () => { 
    const store = createTestStore({  //Crea un store con 6 canciones en la library.
      library: Array.from({ length: 6 }, (_, i) => ({ //Crea un array de 6 elementos representando canciones.
        id: `${i + 1}`,
        title: `Canción ${i + 1}`,
        artist: `Artista ${i + 1}`,
      })),
    });

    renderWithProviders(store); //Renderiza el componente Library con ese store.

    expect(screen.getByText('Mi Biblioteca')).toBeInTheDocument(); //Verifica que el título "Mi Biblioteca" esté en el documento.
    expect(screen.getByText('Canción 6')).toBeInTheDocument(); //Verifica que "Canción 6" esté en el documento, lo que indica que todas las canciones están renderizadas.
  });
});
