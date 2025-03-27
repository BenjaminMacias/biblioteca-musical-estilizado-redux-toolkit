import styled from 'styled-components';

export const SearchForm = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 30px auto;
  max-width: 600px;
  width: 90%;
`;

export const SearchInput = styled.input`
  flex: 1;
  padding: 12px;
  font-size: 1rem;
  border: 2px solid ${({ theme }) => theme.colors.primary};
  border-radius: 8px 0 0 8px;
  outline: none;
  transition: border-color 0.3s;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primaryHover || '#0056b3'};
  }
`;

export const SearchButton = styled.button`
  padding: 12px 20px;
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  font-size: 1rem;
  border: none;
  border-radius: 0 8px 8px 0;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryHover || '#0056b3'};
  }
`;
