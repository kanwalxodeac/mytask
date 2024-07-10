"use client"
import React_Table from "../app/components/React_Table"
import { useMemo } from "react";
const data = useMemo(
  () => [
    { name: 'John Doe', age: 28, city: 'New York' },
    { name: 'Jane Smith', age: 22, city: 'Los Angeles' },
    { name: 'Sam Johnson', age: 35, city: 'Chicago' },
    { name: 'Alice Brown', age: 30, city: 'San Francisco' },
  ],
  []
);

const columns = useMemo(
  () => [
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
  ],
  []
);

const Home = () => {
  return (
    <div>
      <h1>Simple Table wit</h1>
      <React_Table columns={columns} data={data} />
    </div>
  );
};

export default Home;
