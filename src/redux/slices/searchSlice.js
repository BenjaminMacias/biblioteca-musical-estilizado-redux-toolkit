import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk para buscar álbumes por artista
export const fetchSongs = createAsyncThunk(
  'search/fetchSongs',
  async (term, thunkAPI) => {
    try {
      //  Proxy temporal para evitar errores de CORS en desarrollo
      const proxy = 'https://cors-anywhere.herokuapp.com/';
      const url = `${proxy}https://theaudiodb.com/api/v1/json/2/searchalbum.php?s=${term}`;

      const response = await axios.get(url);
      console.log('API response:', response.data); //  Log opcional para depurar

      return response.data.album || []; // Asegurarse que sea un array aunque no haya resultados
    } catch (error) {
      console.error('Error al buscar canciones:', error);
      return thunkAPI.rejectWithValue('Ocurrió un error al buscar canciones.');
    }
  }
);

const searchSlice = createSlice({
  name: 'search',
  initialState: {
    results: [],
    loading: false,
    error: null,
  },
  reducers: {
    resetResults: (state) => {
      state.results = [];
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSongs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSongs.fulfilled, (state, action) => {
        state.loading = false;
        state.results = action.payload;
      })
      .addCase(fetchSongs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetResults } = searchSlice.actions;
export default searchSlice.reducer;
