import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addSong } from '../../redux/slices/librarySlice';
import { fetchSongs } from '../../redux/slices/searchSlice';
import Song from '../Song/Song';
import {
  ResultsContainer,
  ResultsList,
  Message,
  ErrorContainer,
  RetryButton,
} from './SearchResults.styles';

const SearchResults = () => {
  const dispatch = useDispatch();
  const { results, loading, error } = useSelector((state) => state.search);

  const handleAdd = (album) => {
    const songData = {
      id: album.idAlbum,
      title: album.strAlbum,
      artist: album.strArtist,
      album: album.strAlbum,
    };
    dispatch(addSong(songData));
  };

  const handleRetry = () => {
    const lastSearch = localStorage.getItem('lastSearchTerm');
    if (lastSearch) {
      dispatch(fetchSongs(lastSearch));
    }
  };

  if (loading) return <Message>Cargando...</Message>;

  if (error) {
    return (
      <ErrorContainer>
        <p>{error}</p>
        <RetryButton onClick={handleRetry}>Reintentar</RetryButton>
      </ErrorContainer>
    );
  }

  if (!results || results.length === 0) {
    return <Message>No hay resultados.</Message>;
  }

  return (
    <ResultsContainer>
      <h2>Resultados de búsqueda</h2>
      <ResultsList>
        {results.map((album) => (
          <div key={album.idAlbum}>
            <Song
              title={album.strAlbum}
              artist={album.strArtist}
              duration="N/A"
              onAdd={() => handleAdd(album)}
            />
          </div>
        ))}
      </ResultsList>
    </ResultsContainer>
  );
};

export default SearchResults;
