"use client"
import { useTable, useSortBy, useFilters } from 'react-table';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel, TextField, Paper,AppBar,Toolbar, Box } from '@mui/material';
import { Margarine } from 'next/font/google';

const DefaultColumnFilter = ({ column: { filterValue, preFilteredRows, setFilter } }) => {
  const count = preFilteredRows.length;

  return (
    <TextField
      value={filterValue || ''}
      onChange={e => setFilter(e.target.value || undefined)} 
      placeholder={`Search ${count} records...`}
      variant="standard"
      fullWidth
      className="mb-4"
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
    <TableContainer component={Paper} className="shadow-lg rounded-lg mt-3">
      <Table {...getTableProps()} className="min-w-full divide-y divide-gray-200">
        <TableHead className="bg-gray-50">
          {headerGroups.map(headerGroup => (
            <TableRow {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <TableCell
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
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
        <TableBody {...getTableBodyProps()} className="bg-white divide-y divide-gray-200">
          {rows.map(row => {
            prepareRow(row);
            return (
              <TableRow {...row.getRowProps()} className="hover:bg-gray-100">
                {row.cells.map(cell => (
                  <TableCell {...cell.getCellProps()} className="px-6 py-4 whitespace-nowrap">
                    {cell.render('Cell')}
                  </TableCell>
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
    <div className="container mx-auto p-4">
      <Box sx={{
        marginBottom:'3rem'
      }}>
      <AppBar>
        <Toolbar >
          

          
      <h1 className="text-2xl font-bold mb-4  ">React Table Example With MUI and Tailwind Using NextJs</h1></Toolbar>
      </AppBar>
      </Box>
      <React_Table columns={columns} data={data} />
    </div>
  );
};

export default Home;
