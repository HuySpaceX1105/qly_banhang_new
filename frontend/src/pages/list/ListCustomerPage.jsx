import HomeLayout from "../../layouts/HomeLayout";
import Header from "../../components/listdata/Header";
import FormCardList from "../../components/listdata/FormCardList";
import FormTable from "../../components/listdata/table/FormTable";
import TaskBar from "../../components/listdata/table/TaskBar";
import Pagination from "../../components/listdata/Pagination";  
import CustomerRow from "../../components/listdata/table/row/CustomerRow";

export default function ListCustomerPage() {
    const names = ["Tên khách hàng", "SĐT", "Email", "Địa chỉ", "Ngày tạo", "Ngày cập nhật"];

    // Mock dữ liệu customers
    const customers = [
        {
            name: "Nguyễn Văn A",
            phone: "0123456789",
            email: "a@example.com",
            address: "123 Đường A, Quận 1, TP.HCM",
            created_at: "2026-03-01 09:00",
            updated_at: "2026-03-05 10:00"
        },
        {
            name: "Trần Thị B",
            phone: "0987654321",
            email: "b@example.com",
            address: "456 Đường B, Quận 2, TP.HCM",
            created_at: "2026-03-02 11:30",
            updated_at: null
        },
        {
            name: "Lê Văn C",
            phone: "0912345678",
            email: "c@example.com",
            address: "789 Đường C, Quận 3, TP.HCM",
            created_at: "2026-03-03 14:15",
            updated_at: "2026-03-07 16:00"
        },
        {
            name: "Phạm Thị D",
            phone: "0945678910",
            email: "d@example.com",
            address: "101 Đường D, Quận 4, TP.HCM",
            created_at: "2026-03-04 08:45",
            updated_at: null
        },
        {
            name: "Hoàng Văn E",
            phone: "0901234567",
            email: "e@example.com",
            address: "202 Đường E, Quận 5, TP.HCM",
            created_at: "2026-03-05 11:00",
            updated_at: "2026-03-10 09:30"
        }
    ];

    return (
        <HomeLayout>
            <FormCardList>
                <Header 
                    title="Danh sách khách hàng" 
                    link="/customer/add" 
                    titleButton="Thêm khách hàng"
                />

                <div className="card-body">
                    <div className="table-responsive">
                        <TaskBar />
                        <FormTable names={names}>
                            {customers.map((customer, index) => (
                                <CustomerRow key={index} customer={customer} />
                            ))}
                        </FormTable>
                    </div>
                </div>

                <Pagination />
            </FormCardList>
        </HomeLayout>
    );
}