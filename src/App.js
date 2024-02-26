import './App.css';
import React, { useState } from 'react';
import DataTable from 'react-data-table-component';
import { Resizable } from 'react-resizable';
import { CSVLink } from 'react-csv';
import DatePicker from 'react-datepicker';
import debounce from 'debounce';

import 'react-datepicker/dist/react-datepicker.css';

const ResizableTitle = ({ title, width, onResize }) => {
  return (
    <Resizable
      width={width}
      height={0}
      onResize={(e, { size }) => onResize(size.width)}
      draggableOpts={{ enableUserSelectHack: false }}
    >
      <div>{title}</div>
    </Resizable>
  );
};

function App() {
  const [columns, setColumns] = useState([
    {
      name: 'Name',
      selector: row => row.name,
      sortable: true,
      minWidth: 150,
      filter: true,
    },
    {
      name: 'Email',
      selector: row => row.email,
      sortable: true,
      minWidth: 200,
      filter: true,
    },
    {
      name: 'Age',
      selector: row => row.age,
      sortable: true,
      minWidth: 100,
      filter: true,
    },
    {
      name: 'Date',
      selector: row => row.date,
      sortable: true,
      minWidth: 150,
      filter: 'date',
    },
  ]);

  const data = [
    {
      id: 1,
      name: 'Aira',
      email: 'aira@gmail.com',
      age: '22'
    },
    {
      id: 2,
      name: 'Fira',
      email: 'fira@gmail.com',
      age: '23'
    },
    {
      id: 3,
      name: 'Arif',
      email: 'airf@gmail.com',
      age: '24'
    },
    {
      id: 4,
      name: 'Sonu',
      email: 'sonu@gmail.com',
      age: '22'
    },
    {
      id: 5,
      name: 'Darla',
      email: 'darla@gmail.com',
      age: '23'
    },
    {
      id: 6,
      name: 'Aira',
      email: 'aira@gmail.com',
      age: '22'
    },
    {
      id: 7,
      name: 'Fira',
      email: 'fira@gmail.com',
      age: '23'
    },
    {
      id: 8,
      name: 'Arif',
      email: 'airf@gmail.com',
      age: '24'
    },
    {
      id: 9,
      name: 'Sonu',
      email: 'sonu@gmail.com',
      age: '22'
    },
    {
      id: 10,
      name: 'Darla',
      email: 'darla@gmail.com',
      age: '23'
    },
    {
      id: 11,
      name: 'Aira',
      email: 'aira@gmail.com',
      age: '22'
    },
    {
      id: 12,
      name: 'Fira',
      email: 'fira@gmail.com',
      age: '23'
    },
    {
      id: 13,
      name: 'Arif',
      email: 'airf@gmail.com',
      age: '24'
    },
    {
      id: 14,
      name: 'Sonu',
      email: 'sonu@gmail.com',
      age: '22'
    },
    {
      id: 15,
      name: 'Darla',
      email: 'darla@gmail.com',
      age: '23'
    }
  ];

  const [records, setRecords] = useState(data);
  const [resizable, setResizable] = useState(false);
  const [selectedColumnIndex, setSelectedColumnIndex] = useState(null);

  const [filterText, setFilterText] = useState({});
  const [startDate, setStartDate] = useState(null);

  const debouncedFilter = debounce((text) => {
    const newData = data.filter(row => {
      return Object.entries(filterText).every(([key, value]) =>
        row[key].toLowerCase().includes(value.toLowerCase())
      );
    });
    setRecords(newData);
  }, 300);

  const handleFilter = (e, column) => {
    const { id, value } = e.target;

    setFilterText({
      ...filterText,
      [column]: value,
    });

    debouncedFilter(value);
  };

  const handleDateFilter = (date) => {
    setStartDate(date);

    const newData = data.filter(row => {
      if (!date) return true;
      return new Date(row.date).toDateString() === date.toDateString();
    });

    setRecords(newData);
  };

  const handleResize = (columnIndex) => (newColumnWidth) => {
    const newColumns = [...columns];
    newColumns[columnIndex] = {
      ...newColumns[columnIndex],
      minWidth: newColumnWidth,
    };
    setColumns(newColumns);
  };

  const handleColumnClick = (columnIndex) => {
    setResizable(true);
    setSelectedColumnIndex(columnIndex);
  };

  const csvData = records.map(({ id, ...row }) => row);

  return (
    <>
      <div className='container m-5'>
        <div className='text-end'>
          <button onClick={() => setResizable(false)}>Disable Resizing</button>
          <input type="text" id="Name" onChange={(e) => handleFilter(e, 'name')} placeholder="Filter Name" />
          <input type="text" id="Email" onChange={(e) => handleFilter(e, 'email')} placeholder="Filter Email" />
          <input type="text" id="Age" onChange={(e) => handleFilter(e, 'age')} placeholder="Filter Age" />
          <DatePicker
            selected={startDate}
            onChange={handleDateFilter}
            placeholderText="Filter Date"
          />
        </div>
        <DataTable
          columns={columns.map((col, index) => ({
            ...col,
            title: resizable && selectedColumnIndex === index ? (
              <ResizableTitle title={col.name} width={col.minWidth} onResize={handleResize(index)} />
            ) : (
              <div onClick={() => handleColumnClick(index)}>{col.name}</div>
            ),
            filter: col.filter && col.filter === 'date' ? (
              <DatePicker
                selected={startDate}
                onChange={handleDateFilter}
                placeholderText={`Filter ${col.name}`}
              />
            ) : (
              <input
                type="text"
                id={col.name}
                onChange={(e) => handleFilter(e, col.name)}
                placeholder={`Filter ${col.name}`}
              />
            ),
          }))}
          data={records}
          selectableRows
          fixedHeader
          pagination
        />
      </div>
      <br/>
      <div className='justify-content-center p-3 '>
        <center>
          <CSVLink data={csvData} filename="table-data.csv">
            <button>Export CSV</button>
          </CSVLink>
        </center>
      </div>
    </>
  );
}

export default App;
