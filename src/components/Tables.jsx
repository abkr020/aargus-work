import React, { useState } from 'react';
import { useTable } from '../context/TableContext';
// import { useTable } from './TableContext';

const Tables = () => {
  const {table,activeRow,activeCol,setActiveRow,setActiveCol,updateCellSpan,addHeaderRow,} = useTable();
  const data = [
    { id: 1, firstName: 'John', secondName: 'Doe', age: 25 },
    { id: 2, firstName: 'Jane', secondName: 'Smith', age: 30 },
  ];

  const handleCellClick = (rowIndex, colIndex) => {
    setActiveRow(rowIndex);
    setActiveCol(colIndex);
    const cell = table.headers[rowIndex][colIndex];
    setNewRowSpan(cell.rowSpan || 1);
    setNewColSpan(cell.colSpan || 1);
  };

  const handleSpanUpdate = () => {
    if (activeRow !== null && activeCol !== null) {
      updateCellSpan(activeRow, activeCol, parseInt(newRowSpan), parseInt(newColSpan));
    }
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h3>{table.name}</h3>

      <table border="1" cellPadding="8" cellSpacing="0">
        <thead>
          {table.headers.map((row, rowIndex) => (
            <tr key={`header-row-${rowIndex}`}>
              {row.map((cell, cellIndex) => (
                <th
                  key={`cell-${rowIndex}-${cellIndex}`}
                  rowSpan={cell.rowSpan}
                  colSpan={cell.colSpan}
                  onClick={() => handleCellClick(rowIndex, cellIndex)}
                  style={{
                    backgroundColor:
                      activeRow === rowIndex && activeCol === cellIndex
                        ? '#ffe599'
                        : undefined,
                    cursor: 'pointer',
                    width:'100px',
                    height:'100px'
                  }}
                >
                  {cell.val}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {/* {data.map((entry, index) => (
            <tr key={`row-${index}`}>
              <td>{entry.id}</td>
              <td>{entry.firstName}</td>
              <td>{entry.secondName}</td>
              <td>{entry.age}</td>
            </tr>
          ))} */}
        </tbody>
      </table>
    </div>
  );
};

export default Tables;
