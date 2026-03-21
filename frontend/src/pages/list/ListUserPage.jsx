import HomeLayout from "../../layouts/HomeLayout";
import Header from "../../components/listdata/Header";
import FormCardList from "../../components/listdata/FormCardList";
import FormTable from "../../components/listdata/table/FormTable";
import TaskBar from "../../components/listdata/table/TaskBar";
import Pagination from "../../components/listdata/Pagination";  
import UserRow from "../../components/listdata/table/row/UserRow";

export default function ListUserPage() {
    const names = ["Tên đăng nhập", "Email", "Họ tên", "Trạng thái", "Ngày tạo", "Ngày cập nhật"];

    // Mock dữ liệu users
    const users = [
        {
            username: "admin",
            email: "admin@example.com",
            full_name: "Nguyễn Văn Admin",
            enabled: true,
            created_at: "2026-03-01 09:00",
            updated_at: "2026-03-05 10:00"
        },
        {
            username: "user1",
            email: "user1@example.com",
            full_name: "Trần Thị B",
            enabled: true,
            created_at: "2026-03-02 11:30",
            updated_at: null
        },
        {
            username: "user2",
            email: "user2@example.com",
            full_name: "Lê Văn C",
            enabled: false,
            created_at: "2026-03-03 14:15",
            updated_at: "2026-03-07 16:00"
        },
        {
            username: "user3",
            email: "user3@example.com",
            full_name: null,
            enabled: true,
            created_at: "2026-03-04 08:45",
            updated_at: null
        },
        {
            username: "user4",
            email: "user4@example.com",
            full_name: "Phạm Thị D",
            enabled: false,
            created_at: "2026-03-05 11:00",
            updated_at: "2026-03-10 09:30"
        }
    ];

    return (
        <HomeLayout>
            <FormCardList>
                <Header 
                    title="Danh sách người dùng" 
                    link="/user/add" 
                    titleButton="Thêm người dùng"
                />

                <div className="card-body">
                    <div className="table-responsive">
                        <TaskBar />
                        <FormTable names={names}>
                            {users.map((user, index) => (
                                <UserRow key={index} user={user} />
                            ))}
                        </FormTable>
                    </div>
                </div>

                <Pagination />
            </FormCardList>
        </HomeLayout>
    );
}