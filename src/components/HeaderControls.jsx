import React, { useState } from 'react';
import { useTable } from '../context/TableContext';
import { useEffect } from 'react';

const HeaderControls = () => {
  const {
    table,
    setTable,
    activeRow,
    activeCol,
    addHeaderRow,
    addColumn,
    splitCell,
    deleteCell,
  } = useTable();
  const [newVal, setNewVal] = useState('');

  const [newRowSpan, setNewRowSpan] = useState(1);
  const [newColSpan, setNewColSpan] = useState(1);
  useEffect(() => {
    if (activeRow === null || activeCol === null) return;

    const cell = table.headers?.[activeRow]?.[activeCol];
    if (cell) {
      setNewVal(cell.val || '');
      setNewRowSpan(cell.rowSpan || 1);
      setNewColSpan(cell.colSpan || 1);
    }
  }, [activeRow, activeCol]);

  useEffect(() => {
    handleSpanUpdate();
  }, [newRowSpan, newColSpan, newVal])
  // const handleSpanUpdate = () => {
  //   if (activeRow === null || activeCol === null) return;

  //   const newHeaders = [...table.headers];
  //   const targetCell = { ...newHeaders[activeRow][activeCol] };

  //   if (!isNaN(parseInt(newRowSpan))) targetCell.rowSpan = parseInt(newRowSpan);
  //   if (!isNaN(parseInt(newColSpan))) targetCell.colSpan = parseInt(newColSpan);

  //   newHeaders[activeRow][activeCol] = targetCell;

  //   setTable({ ...table, headers: newHeaders });
  // };

  const handleSpanUpdate = () => {
    if (activeRow === null || activeCol === null) return;

    const newHeaders = [...table.headers];
    const targetCell = { ...newHeaders[activeRow][activeCol] };

    targetCell.rowSpan = parseInt(newRowSpan) || 1;
    targetCell.colSpan = parseInt(newColSpan) || 1;
    targetCell.val = newVal;

    newHeaders[activeRow][activeCol] = targetCell;
    setTable({ ...table, headers: newHeaders });
  };

  return (
    <div style={{ marginBottom: '1rem' }}>
      <button
  onClick={() => {
    if (activeRow !== null && activeCol !== null) {
      deleteCell(activeRow, activeCol);
    }
  }}
  style={{ marginLeft: '1rem', backgroundColor: '#ff4d4f', color: 'white' }}
>
  Delete Cell
</button>

      <button onClick={() => {
        if (activeRow !== null && activeCol !== null) {
          splitCell(activeRow, activeCol);
        }
      }} style={{ marginLeft: '1rem' }}>
        Split Cell
      </button>

      <button onClick={addColumn} style={{ marginRight: '1rem' }}>
        ➕ Add Column
      </button>

      <button onClick={addHeaderRow} style={{ marginBottom: '1rem' }}>
        ➕ Add Header Row (copy visible structure)
      </button>
      <label>
        Value:{' '}
        <input
          type="text"
          value={newVal}
          onChange={(e) => setNewVal(e.target.value)}
          style={{ width: '100px', marginRight: '1rem' }}
        />
      </label>

      {activeRow !== null && activeCol !== null && (
        <>
          <p>Selected Cell → Row: {activeRow}, Column: {activeCol}</p>
          <label>
            RowSpan:{' '}
            <input
              type="number"
              min={1}
              value={newRowSpan}
              onChange={(e) => setNewRowSpan(e.target.value)}
              style={{ width: '60px', marginRight: '1rem' }}
            />
          </label>
          <label>
            ColSpan:{' '}
            <input
              type="number"
              min={1}
              value={newColSpan}
              onChange={(e) => setNewColSpan(e.target.value)}
              style={{ width: '60px', marginRight: '1rem' }}
            />
          </label>
          <button onClick={handleSpanUpdate}>Apply</button>
        </>
      )}
    </div>
  );
};

export default HeaderControls;
