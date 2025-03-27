import React from 'react';
import { useParams } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import './styles.css';

const SongDetail = () => {
  const { id } = useParams();

  // Usar proxy temporal para evitar CORS en desarrollo
  const proxy = 'https://cors-anywhere.herokuapp.com/';
  const apiUrl = `${proxy}https://theaudiodb.com/api/v1/json/2/album.php?m=${id}`;

  const { data, loading, error, refetch } = useFetch(id ? apiUrl : null);

  if (loading) return <p>Cargando detalles...</p>;

  if (error) {
    return (
      <div>
        <p>Hubo un error al cargar los detalles del álbum.</p>
        <button onClick={refetch}>Reintentar</button>
      </div>
    );
  }

  if (!data || !data.album) {
    return <p>No se encontraron detalles para esta canción.</p>;
  }

  const album = data.album[0];

  return (
    <div className="song-detail">
      <h2>{album.strAlbum}</h2>
      <p><strong>Artista:</strong> {album.strArtist}</p>
      <p><strong>Año:</strong> {album.intYearReleased}</p>
      <p><strong>Género:</strong> {album.strGenre}</p>
      {album.strAlbumThumb && (
        <img src={album.strAlbumThumb} alt={album.strAlbum} />
      )}
      <p><strong>Descripción:</strong></p>
      <p>{album.strDescriptionEN || 'No hay descripción disponible.'}</p>
    </div>
  );
};

export default SongDetail;
