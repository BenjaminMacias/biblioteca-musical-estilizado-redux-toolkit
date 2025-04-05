import React from 'react';
import { render, screen } from '@testing-library/react'; //  funciones de @testing-library/react: render: Permite renderizar el componente que vamos a probar. screen: Es un objeto que nos da acceso a los elementos renderizados en la prueba.
import Header from '../Header/Header';

test('muestra el título de la app', () => {
  render(<Header />); //Renderiza el componente Header en el entorno de prueba. 
  expect(screen.getByText(/Biblioteca Musical/i)).toBeInTheDocument(); //Busca un elemento en la pantalla que contenga el texto especificado. "Biblioteca Musical". Estamos comprobando que el título "Biblioteca Musical" esté realmente en el documento cuando se renderiza el componente Header.
});

test('no muestra contenido adicional', () => { //Esta prueba tiene como objetivo asegurarse de que no haya contenido inesperado (como un texto con "algo inesperado") en el componente Header.
  render(<Header />); // renderiza el componente Header en el entorno de prueba.
  expect(screen.queryByText(/algo inesperado/i)).not.toBeInTheDocument(); 
});

//Busca un elemento en la pantalla que contenga el texto especificado. A diferencia de getByText, queryByText devuelve null si no encuentra el texto, lo que es útil cuando queremos verificar que un texto no esté presente.
//algo inesperado/i: Esta es otra expresión regular que busca el texto "algo inesperado", sin importar las mayúsculas o minúsculas.
//not.toBeInTheDocument(): Verifica que el elemento NO esté presente en el documento. En este caso, estamos comprobando que "algo inesperado" no se encuentre en el Header.