import { TableCell, tableCellClasses } from '@mui/material';
import styled from 'styled-components';

export const StyledTable = styled.table`
  border-spacing: 0;
  border: 1px solid black;
`;

export const StyledTd = styled.td`
  margin: 0;
  padding: 0.5rem;
  border-bottom: 1px solid black;
  border-right: 1px solid black;

  :last-child {
    border-right: 0;
  }
`;

export const StyledTh = styled.th`
  margin: 0;
  padding: 0.5rem;
  border-bottom: 1px solid black;
  border-right: 1px solid black;

  :last-child {
    border-right: 0;
  }
`;

export const StyledTr = styled.tr`
  :last-child {
    td {
      border-bottom: 0;
    }
  }
`;

export const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    fontVariant: 'h2',
    border: '1px solid rgb(224, 224, 224)',
    fontWeight: 'bold',
    fontSize: '16px',
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 16,
    border: '1px solid rgb(224, 224, 224)',
  },
}));
