import React, { useMemo } from "react";
import { useTable, useFilters } from "react-table";
import "./table.scss";

const TableComp = ({ data=[], columns }) => {
  // const columns = useMemo(()=>columns, [])
  // const data = useMemo(()=>data, [])

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns,
        data,
      },
      useFilters
    );
  return (
    <div className="tableContainer">
      <table
        {...getTableProps()}
        className="table table-striped table-hover styled-table"
      >
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps({
                    style: { minWidth: column.minWidth, width: column.width },
                  })}
                >
                  {column.render("Header")}
                  <div className="">
                    {" "}
                    {column.canFilter ? column.render("Filter") : null}{" "}
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody
          {...getTableBodyProps()}
        >
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td
                      {...cell.getCellProps({
                        style: {
                          minWidth: cell.column.minWidth,
                          width: cell.column.width,
                        },
                      })}
                    >
                      {" "}
                      {cell.render("Cell")}{" "}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TableComp;
