import { useState } from "react";
import EditableRow from "./EditableRow";

export default function EditableTable({title, children }) {

    const [rows, setRows] = useState([
        {
            sku: "",
            product: "",
            import_price: 1,
            quantity: 1,
            manufacture_date: "",
            expiry_date: ""
        }
    ]);

    const addRow = () => {
        setRows([
            ...rows,
            {
            sku: "",
            product: "",
            import_price: 1,
            quantity: 1,
            manufacture_date: "",
            expiry_date: ""
            }
        ]);
    };

    const updateRow = (index, field, value) => {
        const newRows = [...rows];

        newRows[index][field] = value;

        setRows(newRows);
    };

    const removeRow = (index) => {
        setRows(rows.filter((_, i) => i !== index));
    };

    return (
        <div className="col-sm-13">
        <div className="card">
            <div className="card-header d-flex justify-content-between">
            <div className="header-title">
                <h4 className="card-title">{title} </h4>
            </div>
            <span className="table-add float-right  mr-2">
                <button className="btn btn-sm bg-primary" onClick={addRow}>Thêm mới</button>
            </span>

            </div>

            <div className="card-body">
            <table className="table table-bordered table-responsive-md table-striped text-center">

                {children}

                <tbody>
                {rows.map((row, index) => (
                    <EditableRow
                    key={index}
                    row={row}
                    onRemove={() => removeRow(index)}
                    onChange={(field, value) => updateRow(index, field, value)}
                    />
                ))}
                </tbody>

            </table>

            </div>
        </div>
        </div>
    );
}