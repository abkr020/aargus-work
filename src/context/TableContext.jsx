import React, { createContext, useContext, useState } from 'react';
import { useEffect } from 'react';


const defaultTable = {
    id: 'table-1',
    name: 'My Table',
    headers: [
      [
        { val: 'id' },
        // { val: 'id', rowSpan: 2 },
        // { val: 'name', colSpan: 2 },
        // { val: 'age', rowSpan: 2 },
      ],
      // [
      //   { val: 'first name' },
      //   { val: 'second name' },
      // ]
    ]
  }
const TableContext = createContext();

export const TableProvider = ({ children }) => {

  const [table, setTable] = useState(() => {
    const stored = localStorage.getItem('t3');
    return stored ? JSON.parse(stored) : defaultTable;
  });
  const [activeRow, setActiveRow] = useState(null);
  const [activeCol, setActiveCol] = useState(null);


  useEffect(() => {
    localStorage.setItem('t3', JSON.stringify(table));
  }, [table]);


  const updateCellSpan = (rowIndex, colIndex, rowSpan, colSpan) => {
    const updatedHeaders = [...table.headers];
    const cell = { ...updatedHeaders[rowIndex][colIndex] };

    if (rowSpan) cell.rowSpan = rowSpan;
    else delete cell.rowSpan;
    if (colSpan) cell.colSpan = colSpan;
    else delete cell.colSpan;

    updatedHeaders[rowIndex][colIndex] = cell;

    setTable(prev => ({
      ...prev,
      headers: updatedHeaders,
    }));
  };

  const computeVisibleHeaderRow = () => {
    const header = table.headers;
    const rowCount = header.length;
    const grid = [];
    const occupied = {};

    for (let row = 0; row < rowCount; row++) {
      const currentRow = header[row];
      let colIndex = 0;

      for (let i = 0; i < currentRow.length; i++) {
        while (occupied[`${row},${colIndex}`]) colIndex++;

        const cell = currentRow[i];
        const rowSpan = cell.rowSpan || 1;
        const colSpan = cell.colSpan || 1;

        for (let rs = 0; rs < rowSpan; rs++) {
          for (let cs = 0; cs < colSpan; cs++) {
            const r = row + rs;
            const c = colIndex + cs;
            occupied[`${r},${c}`] = true;
            if (!grid[r]) grid[r] = [];
            grid[r][c] = { val: cell.val };
          }
        }
        colIndex += colSpan;
      }
    }

    const lastRow = grid[grid.length - 1];
    return lastRow.map((cell) => ({ val: cell.val + ' (copy)' }));
  };

  const addHeaderRow = () => {
    const newRow = computeVisibleHeaderRow();
    setTable(prev => ({
      ...prev,
      headers: [...prev.headers, newRow],
    }));
  };
  const addColumn = () => {
    const newHeaders = table.headers.map((row) => [
      ...row,
      { val: 'New Column', colSpan: 1, rowSpan: 1 },
    ]);

    setTable({ ...table, headers: newHeaders });
  };
const splitCell = (rowIndex, colIndex) => {
  console.log("split",rowIndex,colIndex);
  
  const headers = [...table.headers];
  const row = [...headers[rowIndex]];
  const targetCell = { ...row[colIndex] };

  const originalColSpan = targetCell.colSpan || 1;
  if (originalColSpan <= 1) return; // Cannot split further

  // Reduce current cell span
  const newColSpan = Math.floor(originalColSpan / 2);
  targetCell.colSpan = newColSpan;

  // Insert new cell right after
  const newCell = {
    val: `${targetCell.val} (split)`,
    colSpan: originalColSpan - newColSpan,
    rowSpan: targetCell.rowSpan || 1
  };

  const updatedRow = [
    ...row.slice(0, colIndex),
    targetCell,
    newCell,
    ...row.slice(colIndex + 1),
  ];

  headers[rowIndex] = updatedRow;
  setTable({ ...table, headers });
};
const deleteCell = (rowIndex, colIndex) => {
  const updatedHeaders = [...table.headers];

  // Remove the cell at the specified index
  const updatedRow = [...updatedHeaders[rowIndex]];
  updatedRow.splice(colIndex, 1); // removes the cell

  updatedHeaders[rowIndex] = updatedRow;

  setTable({ ...table, headers: updatedHeaders });

  // Reset selection
  setActiveRow(null);
  setActiveCol(null);
};

  return (
    <TableContext.Provider
      value={{
        table,
        setTable,
        activeRow,
        activeCol,
        setActiveRow,
        setActiveCol,
        updateCellSpan,
        addHeaderRow,
        addColumn, // <- add this
        splitCell,
        deleteCell,

      }}
    >
      {children}
    </TableContext.Provider>
  );
};

export const useTable = () => useContext(TableContext);
