export default function AudioTableHeader({ columns }) {
  return (
    <>
      {columns.map(col => (
        <div key={col.id} className="table-header-cell">
          {col.label}
        </div>
      ))}
    </>
  );
}
