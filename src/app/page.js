"use client"
import { useTable, useSortBy, useFilters } from 'react-table';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel, TextField, Paper } from '@mui/material';

// Define a default UI for filtering
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
  const defaultColumn = {
    Filter: DefaultColumnFilter,
  };

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
    <TableContainer component={Paper}>
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

const Home = () => {
  const columns = [
    {
      Header: 'Name',
      accessor: 'name',
    },
    {
      Header: 'Age',
      accessor: 'age',
    },
    {
      Header: 'City',
      accessor: 'city',
    },
  ];

  const data = [
    { name: 'John Doe', age: 28, city: 'New York' },
    { name: 'Jane Smith', age: 22, city: 'Los Angeles' },
    { name: 'Sam Johnson', age: 35, city: 'Chicago' },
    { name: 'Alice Brown', age: 30, city: 'San Francisco' },
  ];

  return (
    <div>
      <h1>React Table Example</h1>
      <React_Table columns={columns} data={data} />
    </div>
  );
};

export default Home;
