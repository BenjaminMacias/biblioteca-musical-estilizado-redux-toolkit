import React from 'react';
 import { useSelector, useDispatch } from 'react-redux';
 import { removeSong } from '../../redux/slices/librarySlice';
 import Song from '../Song/Song';
 import { LibraryContainer, Message, SongsList } from './Library.styles';
 
 const Library = () => {
   const songs = useSelector((state) => state.library);
   const dispatch = useDispatch();
   const hasManySongs = songs.length > 5;
 
   const handleRemove = (id) => {
     dispatch(removeSong(id));
   };
 
   return (
     // se usa $hasManySongs en lugar de hasManySongs para evitar que llegue al DOM
     <LibraryContainer $hasManySongs={hasManySongs}>
       <h2>Mi Biblioteca</h2>
       {songs.length === 0 ? (
         <Message>No has agregado canciones aún.</Message>
       ) : (
         <SongsList>
           {songs.map((song) => (
             <div key={song.id}>
               <Song 
                 id={song.id}
                 title={song.title}
                 artist={song.artist}
                 duration="N/A"
                 onRemove={() => handleRemove(song.id)}
               />
             </div>
           ))}
         </SongsList>
       )}
     </LibraryContainer>
   );
 };
 
 export default Library;