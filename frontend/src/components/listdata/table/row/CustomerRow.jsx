import DefaultRow from "./DefaultRow";

export default function CustomerRow({ customer }) {
    return (
        <DefaultRow>
            <td>{customer.name}</td>
            <td>{customer.phone}</td>
            <td>{customer.email}</td>
            <td>{customer.address}</td>
            <td>{customer.created_at}</td>
            <td>{customer.updated_at || "-"}</td>
        </DefaultRow>
    );
}