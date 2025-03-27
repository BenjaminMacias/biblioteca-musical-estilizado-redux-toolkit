import React from 'react';
import {
  SongContainer,
  SongTitle,
  SongInfo,
  AddButton,
  RemoveButton,
  SongLink,
} from './Song.styles';

const Song = ({ id, title, artist, duration, onAdd, onRemove }) => {
  return (
    <SongContainer>
      <SongTitle>
        {id ? <SongLink to={`/song/${id}`}>{title}</SongLink> : title}
      </SongTitle>

      <SongInfo><strong>Artista:</strong> {artist}</SongInfo>
      <SongInfo><strong>Duración:</strong> {duration}</SongInfo>

      {onAdd && (
        <AddButton onClick={onAdd} aria-label="Agregar a mi biblioteca">
          Agregar a mi biblioteca
        </AddButton>
      )}

      {onRemove && (
        <RemoveButton onClick={onRemove} aria-label="Eliminar canción">
          Eliminar
        </RemoveButton>
      )}
    </SongContainer>
  );
};

export default Song;
