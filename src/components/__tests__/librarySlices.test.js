//Importa el reductor (reducer) desde el archivo librarySlice.js, 
// que es el encargado de gestionar el estado de la biblioteca de canciones en la aplicación.
import libraryReducer, { addSong, removeSong } from '../../redux/slices/librarySlice';  //addSong y removeSong: Importa las acciones (actions) del slice librarySlice.js. Estas funciones crean acciones para agregar o eliminar canciones en el estado global de la biblioteca.

describe('librarySlice', () => {
  const initialState = []; //Define el estado inicial de la biblioteca como un array vacío. Esto simula que al principio no hay canciones en la biblioteca.

  test('debe agregar una canción correctamente', () => { //Define una prueba que verifica que una canción se pueda agregar correctamente a la biblioteca.
    const newSong = { id: 1, title: 'Song 1', artist: 'Artist 1' };  //Crea un objeto newSong que simula una canción con un id, un title (título) y un artist (artista).
    const action = addSong(newSong); //Crea la acción de agregar la canción usando la función addSong, pasando la canción newSong como argumento.
    const state = libraryReducer(initialState, action); //Ejecuta el reducer con el estado inicial (vacío) y la acción de agregar la canción. El reducer actualiza el estado y devuelve el nuevo estado con la canción agregada.
    
    expect(state).toEqual([newSong]);  //Verifica que el nuevo estado (state) después de ejecutar la acción sea igual a un array que contiene la canción agregada (newSong).
  });

  test('no debe agregar una canción duplicada', () => {  //Define una prueba que asegura que no se agreguen canciones duplicadas a la biblioteca.
    const existingSong = { id: 1, title: 'Song 1', artist: 'Artist 1' }; //Crea un objeto existingSong que simula una canción ya existente en la biblioteca.
    const initialStateWithSong = [existingSong]; //Define el estado inicial con una canción ya existente (existingSong).
    const action = addSong(existingSong); //Crea la acción para intentar agregar la canción existingSong.
    const state = libraryReducer(initialStateWithSong, action); //Ejecuta el reducer con el estado inicial (que ya tiene una canción) y la acción de agregar la misma canción.
    
    expect(state).toEqual([existingSong]); // No se debe agregar duplicado. Verifica que el nuevo estado siga siendo igual al estado inicial (sin agregar la canción duplicada).
  });

  test('debe eliminar una canción correctamente', () => { //Define una prueba para verificar que una canción se pueda eliminar correctamente.
    const songToDelete = { id: 1, title: 'Song 1', artist: 'Artist 1' }; // Crea un objeto songToDelete que simula una canción que será eliminada.
    const initialStateWithSong = [songToDelete];  //Define el estado inicial con la canción songToDelete.
    const action = removeSong(songToDelete.id);  //Crea la acción de eliminar la canción, usando el id de la canción a eliminar.
    const state = libraryReducer(initialStateWithSong, action); //Ejecuta el reducer con el estado que contiene la canción songToDelete y la acción para eliminarla.
    
    expect(state).toEqual([]); // Verifica que el nuevo estado sea un array vacío ([]), lo que indica que la canción fue eliminada correctamente.
  });

  test('debe manejar correctamente el estado inicial', () => { // Define una prueba para verificar que el reductor maneja correctamente el estado inicial.
    const action = { type: 'unknown' }; // Crea una acción desconocida (que no tiene un tipo válido en el reductor).
    const state = libraryReducer(undefined, action); // Ejecuta el reducer sin un estado inicial definido (usando undefined), con la acción desconocida.
    
    expect(state).toEqual(initialState); // Verifica que el nuevo estado sea igual al estado inicial vacío ([]), ya que no hay un caso para la acción desconocida.
  });
});
