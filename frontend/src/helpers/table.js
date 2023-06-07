import React from "react";

import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";

import "./table.css";

function Table({ header, rows, icons, path, deleteHandler }) {
  return (
    <>
      <table>
        <thead>
          <tr>
            {header.map((item) => {
              return <th key={item.name}>{item.name}</th>;
            })}
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((data) => {
            return (
              <tr key={data.id}>
                {header.map((item) => {
                  return (
                    <td
                      style={{ color: item.component }}
                      key={Math.random().toFixed(4) * 1100}
                    >
                      {item.Component ? (
                        <item.Component //row={data}
                          data={data[item.data]}
                        />
                      ) : (
                        data[item.data]
                      )}
                    </td>
                  );
                })}
                {icons.map((item) => {
                  const icon = item.icon;
                  const button = item.button;

                  return (
                    <td key={Math.random().toFixed(3) * 1000}>
                      {item.button ? (
                        <div key={Math.random().toFixed(4)}>
                          <Link
                            to={`${path}${data.id}`}
                            key={Math.random().toFixed(4)}
                          >
                            {icon}
                          </Link>
                          <Button
                            onClick={() => {
                              deleteHandler(data.id);
                            }}
                          >
                            {button}
                          </Button>
                        </div>
                      ) : (
                        <Link
                          to={`${path}${data.id}`}
                          key={Math.random().toFixed(4)}
                        >
                          {icon}
                        </Link>
                      )}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export default Table;
