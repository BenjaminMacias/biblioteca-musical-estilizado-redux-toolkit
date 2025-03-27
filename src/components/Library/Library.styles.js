import styled from 'styled-components';

//se usa `$hasManySongs` para evitar warning en React DOM
export const LibraryContainer = styled.div`
  text-align: center;
  margin: 40px auto;
  padding: 2rem;
  max-width: 1000px;
  width: 90%;
  background-color: ${({ $hasManySongs }) => ($hasManySongs ? '#e8f5e9' : 'transparent')};
  border-top: 2px solid ${({ theme }) => theme.colors.primary};
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  transition: background-color 0.3s ease;
`;

export const Message = styled.p`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.text};
  margin-top: 2rem;
`;

export const SongsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  justify-content: center;
  margin-top: 2rem;
`;
