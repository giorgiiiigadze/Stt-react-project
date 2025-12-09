export default function AudioTableRow({ rows, columns }){
    return (<>
        {rows.map(row =>
            columns.map(col => (
            <div key={row.id + col.id} className="table-cell">
                <span>{row[col.id]}</span>
            </div>
            ))
        )}    
    </>)
}