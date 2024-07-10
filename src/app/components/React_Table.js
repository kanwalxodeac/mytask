import React from 'react';
import { useTable, useSortBy, useFilters } from 'react-table';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel, TextField, Paper } from '@mui/material';

const DefaultColumnFilter = ({ column: { filterValue, preFilteredRows, setFilter } }) => {
  const count = preFilteredRows.length;

  return (
    <TextField
      value={filterValue || ''}
      onChange={e => setFilter(e.target.value || undefined)} // Set undefined to remove the filter entirely
      placeholder={`Search ${count} records...`}
      variant="standard"
      fullWidth
    />
  );
};

const React_Table = ({ columns, data }) => {
  const defaultColumn = React.useMemo(
    () => ({
      Filter: DefaultColumnFilter,
    }),
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
    },
    useFilters,
    useSortBy
  );

  return (
    <TableContainer component={Paper} sx={{position:'relative'}}>
      <Table {...getTableProps()}>
        <TableHead>
          {headerGroups.map(headerGroup => (
            <TableRow {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <TableCell {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render('Header')}
                  <TableSortLabel
                    active={column.isSorted}
                    direction={column.isSortedDesc ? 'desc' : 'asc'}
                  />
                  <div>{column.canFilter ? column.render('Filter') : null}</div>
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableHead>
        <TableBody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row);
            return (
              <TableRow {...row.getRowProps()}>
                {row.cells.map(cell => (
                  <TableCell {...cell.getCellProps()}>{cell.render('Cell')}</TableCell>
                ))}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default React_Table;
