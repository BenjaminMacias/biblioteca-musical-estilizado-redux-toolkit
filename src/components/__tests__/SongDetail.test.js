import React from 'react'; 
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import SongDetail from '../SongDetail/SongDetail'; // Importa el componente que se va a probar, que en este caso es SongDetail.
import { MemoryRouter, Route } from 'react-router-dom'; // Para simular la navegación, MemoryRouter: Se utiliza para simular la navegación en las pruebas sin necesidad de un navegador real, permitiendo que las rutas funcionen de manera programática. Este componente se usa para configurar las rutas, pero en este caso no parece ser necesario ya que MemoryRouter maneja la ruta internamente.


// Simula el módulo useFetch para poder controlarlo durante las pruebas, evitando que haga llamadas reales a la API. 
// jest.fn() crea una función simulada que se puede configurar con respuestas específicas. __esModule: true asegura que Jest maneje el mock como un módulo ES6.
jest.mock('../../hooks/useFetch', () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe('Componente SongDetail', () => {
  const mockUseFetch = require('../../hooks/useFetch').default;


  // Define una prueba para verificar si se muestra el mensaje "Cargando detalles..." 
  // mientras los datos de la canción se están cargando.
  test('Muestra mensaje de carga mientras los datos se están cargando', () => {
    mockUseFetch.mockReturnValue({ // Configura el comportamiento simulado de useFetch. En este caso, simula que los datos están siendo cargados (loading: true), sin error ni datos disponibles.
      data: null,
      loading: true,
      error: null,
      refetch: jest.fn(),
    });

    render(  // Renderiza el componente SongDetail dentro de un MemoryRouter, que simula la ruta /song/1.
      <MemoryRouter initialEntries={['/song/1']}>
        <SongDetail />
      </MemoryRouter>
    );

    expect(screen.getByText(/Cargando detalles.../i)).toBeInTheDocument(); // Realiza una aserción para verificar que el texto "Cargando detalles..." esté presente en el DOM mientras los datos se cargan.
  });


  // Define una prueba donde se verifica que se muestre un mensaje de error si ocurre un problema 
  // durante la carga de los datos.
  test('Muestra mensaje de error cuando ocurre un error', async () => {
    mockUseFetch.mockReturnValue({ // Configura useFetch para simular una carga fallida, con un error específico.
      data: null,
      loading: false,
      error: 'Error al cargar',
      refetch: jest.fn(),
    });

    render(  // Vuelve a renderizar el componente SongDetail en la ruta /song/1.
      <MemoryRouter initialEntries={['/song/1']}>
        <SongDetail />
      </MemoryRouter>
    );

    expect(screen.getByText(/Hubo un error al cargar los detalles del álbum/i)).toBeInTheDocument(); // Verifica que el mensaje de error "Hubo un error al cargar los detalles del álbum" esté presente en el DOM.
    const retryButton = screen.getByText(/Reintentar/i);
    fireEvent.click(retryButton); // Simula un clic en el botón de "Reintentar".
    expect(mockUseFetch).toHaveBeenCalledTimes(2); // Verifica que la función refetch se haya llamado dos veces, una inicial y otra después de hacer clic en "Reintentar".
  });


  // Define una prueba para verificar que los detalles de la canción se muestren correctamente cuando los datos están disponibles.
  test('Muestra los detalles del álbum cuando los datos están disponibles', async () => {
    const mockData = { // Define los datos simulados que se devolverán de la API, representando los detalles de un álbum de Daft Punk.
      album: [
        {
          strAlbum: 'Homework',
          strArtist: 'Daft Punk',
          intYearReleased: 1997,
          strGenre: 'Electronic',
          strAlbumThumb: 'https://linktoalbumthumb.com',
          strDescriptionEN: 'Un album muy famoso.',
        },
      ],
    };

    mockUseFetch.mockReturnValue({ // Simula que useFetch devuelve los datos correctos, con loading: false y sin error.
      data: mockData,
      loading: false,
      error: null,
      refetch: jest.fn(),
    });

    render(  // Vuelve a renderizar SongDetail con la ruta /song/1.
      <MemoryRouter initialEntries={['/song/1']}>
        <SongDetail />
      </MemoryRouter>
    );

    await waitFor(() => expect(screen.getByText(/Homework/i)).toBeInTheDocument());  // Espera a que los detalles del álbum estén disponibles en el DOM, y luego verifica que "Homework" esté presente.
   
   // Realiza varias aserciones para verificar que la información de la canción (título, artista, año, género, descripción y portada del álbum) esté correctamente mostrada.
    expect(screen.getByText(/Daft Punk/i)).toBeInTheDocument();
    expect(screen.getByText(/1997/i)).toBeInTheDocument();
    expect(screen.getByText(/Electronic/i)).toBeInTheDocument();
    expect(screen.getByAltText('Homework')).toBeInTheDocument();
    expect(screen.getByText(/Un album muy famoso./i)).toBeInTheDocument();
  });


  //  Define una prueba para verificar que se muestra un mensaje si no se encuentran detalles para la canción.
  test('Muestra un mensaje cuando no hay datos disponibles', () => {
    mockUseFetch.mockReturnValue({ // Simula que no hay datos disponibles, y useFetch devuelve null para data.
      data: null,
      loading: false,
      error: null,
      refetch: jest.fn(),
    });

    render( //  Vuelve a renderizar SongDetail con la ruta /song/1.
      <MemoryRouter initialEntries={['/song/1']}>
        <SongDetail />
      </MemoryRouter>
    );

    expect(screen.getByText(/No se encontraron detalles para esta canción/i)).toBeInTheDocument(); // Verifica que el mensaje "No se encontraron detalles para esta canción" esté presente en el DOM.
  });
});
