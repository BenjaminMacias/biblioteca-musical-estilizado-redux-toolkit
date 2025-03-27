import styled from 'styled-components';

export const ResultsContainer = styled.div`
  text-align: center;
  margin: 30px auto;
  padding: 1rem;
  max-width: 1000px;
  width: 90%;
`;

export const ResultsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  justify-content: center;
  margin-top: 1.5rem;
`;

export const Message = styled.p`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.text};
  margin-top: 2rem;
`;

export const ErrorContainer = styled.div`
  background-color: #ffe6e6;
  border: 1px solid #ff4d4d;
  color: #cc0000;
  padding: 1.5rem;
  border-radius: 10px;
  margin: 2rem auto;
  max-width: 500px;
`;

export const RetryButton = styled.button`
  background-color: #ff4d4d;
  color: white;
  border: none;
  padding: 0.6rem 1.2rem;
  font-size: 1rem;
  border-radius: 8px;
  margin-top: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #cc0000;
  }
`;
