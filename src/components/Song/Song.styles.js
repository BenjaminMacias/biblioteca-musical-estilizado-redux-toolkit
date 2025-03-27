import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const SongContainer = styled.div`
  background-color: white;
  margin: 10px;
  padding: 20px;
  border-radius: 12px;
  width: 300px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
  text-align: left;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const SongTitle = styled.h3`
  margin: 0;
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.text};
`;

export const SongInfo = styled.p`
  margin: 6px 0;
  color: #555;
  font-size: 0.95rem;
`;

export const AddButton = styled.button`
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  padding: 10px;
  border-radius: 6px;
  cursor: pointer;
  margin-top: 15px;
  font-weight: 500;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryHover || '#005fa3'};
  }
`;

export const RemoveButton = styled.button`
  background-color: ${({ theme }) => theme.colors.danger || '#e74c3c'};
  color: white;
  border: none;
  padding: 10px;
  border-radius: 6px;
  cursor: pointer;
  margin-top: 10px;
  font-weight: 500;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.dangerHover || '#c0392b'};
  }
`;

export const SongLink = styled(Link)`
  text-decoration: none;
  color: ${({ theme }) => theme.colors.text};
  font-weight: 600;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;
