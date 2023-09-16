import React from 'react';
import TableInnerSquare from './TableInnerSquare';
import SubTable from './SubTable';

function TableRow(props) {
  const { columns, row, tableWidth, rowHeight } = props;
  // row should be an object with keys for each column here;
  // columns should be an array
  return (
    <div
      className="table-row"
      style={{
        display: 'flex',
        justifyContent: 'space-evenly',
        width: tableWidth,
        overflow: 'hidden',
      }}
    >
      {columns.map((property, idx) => {
        if (row) {
          if (typeof row[property] === 'object') {
            return (
              <SubTable
                dataObject={row[property]}
                rowHeight={rowHeight} // so for the SubTablesTable the row should be an object of objects
                key={idx}
              />
            );
          } else {
            return (
              <div style={{ overflow: 'hidden', flex: '1' }}>
                <TableInnerSquare
                  innerData={row[property]}
                  rowHeight={rowHeight}
                  key={idx}
                />
              </div>
            );
          }
        }
        return null;
      })}
    </div>
  );
}

export default TableRow;
