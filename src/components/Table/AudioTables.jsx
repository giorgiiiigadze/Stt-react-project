import "../../css/TableCss/AudioTable.css";
import { useTable } from "../../contexts/AudioTableContext";
import Tooltip from "@mui/material/Tooltip";

export default function AudioTable() {
  const { columns, rows } = useTable();

  const gridTemplate = columns.map(col => col.width + "px").join(" ");

  return (
    <div className="table-wrapper">
      <div
        className="table-grid"
        style={{ gridTemplateColumns: gridTemplate }}
      >
        <div className="table-header">
          {columns.map(col => (
            <Tooltip
              key={col.id}
              title={`Column: ${col.label}`}
              placement="top"
              arrow
            >
              <button className="table-header-cell">
                {col.label}
              </button>
            </Tooltip>
          ))}
        </div>

        {rows.map(row => (
          <div key={row.id} className="table-row">
            {columns.map(col => (
              <button key={col.id} className="table-cell">
                {row[col.id]}
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
