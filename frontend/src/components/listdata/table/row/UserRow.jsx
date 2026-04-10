import DefaultRow from "./DefaultRow";
import {formatDate} from "../../../../utils/date"

export default function UserRow({ user }) {
    const roleColors = {
        ADMIN: "badge bg-warning-light",
        MANAGER: "badge bg-info-light",
        EMPLOYEE: "badge bg-success-light"
    };

    return (
        <DefaultRow>
            <td>{user.username}</td>
            <td>{user.email}</td>

            <td>{user.fullName || "-"}</td>

            <td>
                {user.roles && user.roles.length > 0 ? (
                    user.roles.map((role, index) => (
                        <span
                            key={index}
                            className={`${roleColors[role] || "badge bg-danger-light"} d-block mb-1`}
                        >
                            {role}
                        </span>
                    ))
                ) : (
                    "-"
                )}
            </td>

            <td>
                <span className ="badge bg-primary">
                    {user.enabled ? "Hoạt động" : "Ngưng hoạt động"}
                </span>
            </td>

            <td>{user.locked ?  "Bị khóa" : "Không khóa"}</td>

            <td>{formatDate(user.createdAt)}</td>
            <td>{formatDate(user.updatedAt)}</td>
            <td>{formatDate(user.deletedAt)}</td>
        </DefaultRow>
    );
}