import DefaultRow from "./DefaultRow";

export default function SupplierRow({ supplier }) {
    return (
        <DefaultRow>
            <td>{supplier.name}</td>
            <td>{supplier.phone}</td>
            <td>{supplier.email}</td>
            <td>{supplier.address}</td>
            <td>{supplier.created_at}</td>
            <td>{supplier.updated_at || "-"}</td>
        </DefaultRow>
    );
}