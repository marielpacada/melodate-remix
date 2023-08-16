type EmptyTableProps = {
  tableType: string;
};

export default function EmptyTable(props: EmptyTableProps) {
  return (
    <div className="empty-table-message">
      i guess you didn't like any of those {props.tableType} :/
    </div>
  );
}
