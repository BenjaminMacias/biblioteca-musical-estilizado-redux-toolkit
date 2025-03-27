import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchSongs } from '../../redux/slices/searchSlice';
import { SearchForm, SearchInput, SearchButton } from './SearchBar.styles';

const SearchBar = () => {
  const [input, setInput] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const term = input.trim();
    if (term !== '') {
      localStorage.setItem('lastSearchTerm', term); // Guarda el término para reintentar
      dispatch(fetchSongs(term));
    }
  };

  return (
    <SearchForm onSubmit={handleSubmit}>
      <SearchInput
        type="text"
        placeholder="Busca un artista..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <SearchButton type="submit">Buscar</SearchButton>
    </SearchForm>
  );
};

export default SearchBar;
