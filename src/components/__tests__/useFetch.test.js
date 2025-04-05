import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils'; // Para las actualizaciones asíncronas
import useFetch from '../../hooks/useFetch';  // Ajusta la ruta según sea necesario

// Componente para probar el hook
const MockComponent = ({ url }) => {
  const { data, loading, error } = useFetch(url);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (data) return <div>{JSON.stringify(data)}</div>;

  return null;
};

describe('useFetch hook', () => {
  it('debería cargar los datos correctamente', async () => {
    const fakeData = { message: 'Hello, World!' };
    const mockUrl = 'https://api.example.com/data';

    // Simulamos una respuesta exitosa de la API
    global.fetch = jest.fn().mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(fakeData),
    });

    render(<MockComponent url={mockUrl} />);

    // Verifica que el componente muestra el mensaje cuando la API responde
    await waitFor(() => screen.getByText(/Hello, World!/));

    // Limpieza de la simulación
    global.fetch.mockRestore();
  });

  it('debería mostrar un mensaje de error cuando hay un fallo en la carga', async () => {
    const mockUrl = 'https://api.example.com/data';

    // Simulamos un error en la API
    global.fetch = jest.fn().mockRejectedValueOnce(new Error('Error al cargar los datos'));

    render(<MockComponent url={mockUrl} />);

    // Verifica que el mensaje de error se muestra
    await waitFor(() => screen.getByText('Hubo un error al cargar los datos'));

    // Limpieza de la simulación
    global.fetch.mockRestore();
  });

  it('debería manejar la carga correctamente', async () => {
    const mockUrl = 'https://api.example.com/data';

    // Simulamos una llamada a fetch con retraso
    global.fetch = jest.fn().mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce({ message: 'Hello, World!' }),
    });

    render(<MockComponent url={mockUrl} />);

    // Verifica que el texto de carga aparece antes de los datos
    expect(screen.getByText('Loading...')).toBeInTheDocument();

    // Limpieza de la simulación
    global.fetch.mockRestore();
  });
});
