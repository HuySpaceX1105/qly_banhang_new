import HomeLayout from "../../layouts/HomeLayout";
import Header from "../../components/listdata/Header";
import FormCardList from "../../components/listdata/FormCardList";
import FormTable from "../../components/listdata/table/FormTable";
import TaskBar from "../../components/listdata/table/TaskBar";
import Pagination from "../../components/listdata/Pagination";  
import SupplierRow from "../../components/listdata/table/row/SupplierRow";

export default function ListSupplierPage() {
    const names = ["Tên nhà cung cấp", "SĐT", "Email", "Địa chỉ", "Ngày tạo", "Ngày cập nhật"];

    // Mock dữ liệu suppliers
    const suppliers = [
        {
            name: "Công ty ABC",
            phone: "0123456789",
            email: "abc@example.com",
            address: "123 Đường A, Quận 1, TP.HCM",
            created_at: "2026-03-01 09:00",
            updated_at: "2026-03-05 10:00"
        },
        {
            name: "Công ty XYZ",
            phone: "0987654321",
            email: "xyz@example.com",
            address: "456 Đường B, Quận 2, TP.HCM",
            created_at: "2026-03-02 11:30",
            updated_at: null
        },
        {
            name: "Công ty 123",
            phone: "0912345678",
            email: "123@example.com",
            address: "789 Đường C, Quận 3, TP.HCM",
            created_at: "2026-03-03 14:15",
            updated_at: "2026-03-07 16:00"
        },
        {
            name: "Công ty DEF",
            phone: "0945678910",
            email: "def@example.com",
            address: "101 Đường D, Quận 4, TP.HCM",
            created_at: "2026-03-04 08:45",
            updated_at: null
        },
        {
            name: "Công ty GHI",
            phone: "0901234567",
            email: "ghi@example.com",
            address: "202 Đường E, Quận 5, TP.HCM",
            created_at: "2026-03-05 11:00",
            updated_at: "2026-03-10 09:30"
        }
    ];

    return (
        <HomeLayout>
            <FormCardList>
                <Header 
                    title="Danh sách nhà cung cấp" 
                    link="/supplier/add" 
                    titleButton="Thêm nhà cung cấp"
                />

                <div className="card-body">
                    <div className="table-responsive">
                        <TaskBar />
                        <FormTable names={names}>
                            {suppliers.map((supplier, index) => (
                                <SupplierRow key={index} supplier={supplier} />
                            ))}
                        </FormTable>
                    </div>
                </div>

                <Pagination />
            </FormCardList>
        </HomeLayout>
    );
}