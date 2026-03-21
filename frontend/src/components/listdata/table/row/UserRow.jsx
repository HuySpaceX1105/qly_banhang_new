import DefaultRow from "./DefaultRow";

export default function UserRow({ user }) {
    return (
        <DefaultRow>
            <td>{user.username}</td>
            <td>{user.email}</td>
            <td>{user.full_name || "-"}</td>
            <td>{user.enabled ? "Hoạt động" : "Ngưng hoạt động"}</td>
            <td>{user.created_at}</td>
            <td>{user.updated_at || "-"}</td>
        </DefaultRow>
    );
}