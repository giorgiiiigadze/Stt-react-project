import "../../css/TableCss/AudioTable.css";
import { useTable } from "../../contexts/AudioTableContext";

import AudioTableHeader from "./TableHeader";
import AudioTableRow from "./TableRow";

import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';


export default function AudioTable() {
  const { columns, rows, loading } = useTable();

  const gridTemplate = columns.map(col => col.width + "px").join(" ");

  if (loading) {
    return (
      <div className="table-wrapper">
        <div className="table" style={{ gridTemplateColumns: gridTemplate }}>
          {columns.map(col => (
            <div key={col.id} className="table-header-cell">
              {col.label}
            </div>
          ))}

          {[...Array(6)].map((_, r) => (
            columns.map(col => (
              <div key={`sk-${r}-${col.id}`} className="table-cell">
                <Skeleton 
                  width={'80%'} 
                  height={10} 
                  style={{ borderRadius: 30 }}
                  baseColor="#252525"
                  highlightColor="#353535ff"
                />
              </div>
            ))
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="table-wrapper">
      <div className="table" style={{ gridTemplateColumns: gridTemplate }}>
        <AudioTableHeader columns={columns}/>

        <AudioTableRow rows={rows} columns={columns}/>
      </div>
    </div>
  );
}
