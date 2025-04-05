import React from 'react'; 
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter } from 'react-router-dom';  // Es un componente que provee funcionalidad de enrutamiento en una aplicación React. Usamos esto para simular el enrutamiento en pruebas sin necesidad de un navegador real
import Song from '../Song/Song';  //Es el componente que se está probando. Este componente muestra información sobre una canción, como el título, el artista y un botón de agregar o eliminar.
import { theme } from '../../Styles/theme'; // Importa el objeto de configuración de temas de estilo que se aplicará a los componentes envueltos por ThemeProvider.

describe('Componente Song', () => {
  const songData = { // Crea un objeto con los datos simulados de una canción que se pasará como props al componente Song en cada prueba.
    id: 1,
    title: 'Homework',
    artist: 'Daft Punk',
    duration: '1:00',
  };

  test('Renderiza la canción con los datos correctos', () => {
    render( // Renderiza el componente Song envuelto en ThemeProvider y BrowserRouter. Estos proveedores son necesarios para que el componente reciba el tema y el contexto de enrutamiento adecuado.
      <ThemeProvider theme={theme}>
        <BrowserRouter>  {/* Envuelve con BrowserRouter */}
          <Song {...songData} />
        </BrowserRouter>
      </ThemeProvider>
    );

    // Verifica si el título de la canción, el artista y la duración se muestran correctamente
    expect(screen.getByText(/Homework/i)).toBeInTheDocument(); // getByText. Busca los elementos en el DOM renderizado que contengan los textos "Homework", "Daft Punk", y "1:00".
    expect(screen.getByText(/Daft Punk/i)).toBeInTheDocument();  
    expect(screen.getByText(/1:00/i)).toBeInTheDocument(); //toBeInTheDocument. Asegura que esos textos estén presentes en el documento, verificando que el componente se haya renderizado correctamente con los datos de la canción.
  });

  test('Renderiza un enlace a la página de detalles si el id está presente', () => {
    render(
      <ThemeProvider theme={theme}>
        <BrowserRouter>  {/* Envuelve con BrowserRouter */}
          <Song {...songData} />
        </BrowserRouter>
      </ThemeProvider>
    );

    const songLink = screen.getByRole('link'); // Busca el elemento de tipo enlace (<a>).
    expect(songLink).toHaveAttribute('href', '/song/1');  // Verifica que el enlace tenga el atributo href con el valor /song/1, lo que indica que el enlace lleva a la página de detalles de esa canción en particular.
    expect(songLink).toHaveTextContent('Homework'); // Verifica que el enlace contenga el texto Homework, confirmando que el título de la canción está correctamente representado.
  });


  // Define una prueba para verificar que el botón de "agregar" se renderice cuando la función onAdd se pasa como prop.
  test('Renderiza el botón de agregar si onAdd se pasa como prop', () => {
    const onAddMock = jest.fn(); // Crea una función simulada (mock) que se pasará al componente Song como la función onAdd para simular la acción de agregar la canción.
    render(  //Renderiza el componente Song con la función onAddMock pasada como prop.
      <ThemeProvider theme={theme}>
        <BrowserRouter>  {/* Envuelve con BrowserRouter */}
          <Song {...songData} onAdd={onAddMock} />
        </BrowserRouter>
      </ThemeProvider>
    );

    const addButton = screen.getByRole('button', { name: /Agregar a mi biblioteca/i }); // Busca el botón que contiene el texto "Agregar a mi biblioteca".
    expect(addButton).toBeInTheDocument(); // Verifica que el botón esté presente en el documento.
    fireEvent.click(addButton);  // Simula un clic en el botón de agregar.
    expect(onAddMock).toHaveBeenCalledTimes(1); // Verifica que la función onAddMock haya sido llamada una vez después de hacer clic en el botón.
  });


  // Define una prueba para verificar que el botón de "eliminar" se renderice cuando la función onRemove se pasa como prop.
  test('Renderiza el botón de eliminar si onRemove se pasa como prop', () => {
    const onRemoveMock = jest.fn(); // Crea una función simulada (mock) que se pasará al componente Song como la función onRemove para simular la acción de eliminar la canción.
    render(  // Renderiza el componente Song con la función onRemoveMock pasada como prop.
      <ThemeProvider theme={theme}>
        <BrowserRouter>  {/* Envuelve con BrowserRouter */}
          <Song {...songData} onRemove={onRemoveMock} />
        </BrowserRouter>
      </ThemeProvider>
    );

    const removeButton = screen.getByRole('button', { name: /Eliminar canción/i });  // Busca el botón que contiene el texto "Eliminar canción".
    expect(removeButton).toBeInTheDocument(); // Verifica que el botón esté presente en el documento.
    fireEvent.click(removeButton); //  Simula un clic en el botón de eliminar.
    expect(onRemoveMock).toHaveBeenCalledTimes(1); // Verifica que la función onRemoveMock haya sido llamada una vez después de hacer clic en el botón.
  });


  // Define una prueba para verificar que el botón de agregar no se renderice si la función onAdd no se pasa como prop.
  test('No renderiza el botón de agregar si onAdd no se pasa', () => {
    render( // Renderiza el componente Song sin pasar la función onAdd.
      <ThemeProvider theme={theme}>
        <BrowserRouter>  {/* Envuelve con BrowserRouter */}
          <Song {...songData} />
        </BrowserRouter>
      </ThemeProvider>
    );

    const addButton = screen.queryByRole('button', { name: /Agregar a mi biblioteca/i });  // Busca el botón de agregar, pero en lugar de getByRole (que arroja error si no encuentra el elemento), usa queryByRole para que devuelva null si no lo encuentra.
    expect(addButton).not.toBeInTheDocument();  // Verifica que el botón no esté en el documento.
  });


  // Define una prueba para verificar que el botón de eliminar no se renderice si la función onRemove no se pasa como prop.
  test('No renderiza el botón de eliminar si onRemove no se pasa', () => {
    render(  // Renderiza el componente Song sin pasar la función onRemove.
      <ThemeProvider theme={theme}>
        <BrowserRouter>  {/* Envuelve con BrowserRouter */}
          <Song {...songData} />
        </BrowserRouter>
      </ThemeProvider>
    );

    const removeButton = screen.queryByRole('button', { name: /Eliminar canción/i }); // Busca el botón de eliminar.
    expect(removeButton).not.toBeInTheDocument(); // Verifica que el botón no esté en el documento.
  });
});
