import { useEffect, useState } from "react";
import { getUserListService } from "../../services/userService";

import HomeLayout from "../../layouts/HomeLayout";
import Header from "../../components/listdata/Header";
import FormCardList from "../../components/listdata/FormCardList";
import FormTable from "../../components/listdata/table/FormTable";
import TaskBar from "../../components/listdata/table/TaskBar";
import Pagination from "../../components/listdata/Pagination";  
import UserRow from "../../components/listdata/table/row/UserRow";

export default function ListUserPage() {
    const names = ["Tên đăng nhập", "Email", "Họ tên", "Vai trò", "Trạng thái", "Khóa", "Ngày tạo", "Ngày cập nhật", "Ngày xóa"];

    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(10);
    const [total, setTotal] = useState(0);
    const [totalPage, setTotalPage] = useState(0);

    const fetchUsers = async (page, size, keyword = "") => {
        getUserListService(page, size, keyword).then(res => {
            console.log(res.content);
            setUsers(res.content);
            setPage(res.page);
            setSize(res.size);
            setTotal(res.total);
            setTotalPage(res.totalPages);
        })
        .catch((err) => {
            console.log(err);
        });
    }

    useEffect(() => {
        fetchUsers(page, size);
    }, []);
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

                <Pagination page={page} size={size} total={total} totalPages={totalPage} onPageChange={(newPage) => fetchUsers(newPage, size)} />
            </FormCardList>
        </HomeLayout>
    );
}