import HomeLayout from "../../layouts/HomeLayout";
import Header from "../../components/listdata/Header";
import FormCardList from "../../components/listdata/FormCardList";
import FormTable from "../../components/listdata/table/FormTable";
import TaskBar from "../../components/listdata/table/TaskBar";
import Pagination from "../../components/listdata/Pagination";  
import CategoryRow from "../../components/listdata/table/row/CategoryRow";

export default function ListCategoryPage() {
    const names = ["Tên danh mục", "Mô tả", "Ngày tạo", "Ngày cập nhật"];

    const categories = [
        {
            name: "Nguyên vật liệu",
            description: "Các loại nguyên vật liệu trong kho",
            created_at: "2026-03-01",
            updated_at: "2026-03-10"
        },
        {
            name: "Hàng tiêu dùng",
            description: "Sản phẩm tiêu dùng hàng ngày",
            created_at: "2026-03-02",
            updated_at: "2026-03-11"
        },
        {
            name: "Thiết bị",
            description: "Máy móc và thiết bị trong kho",
            created_at: "2026-03-03",
            updated_at: "2026-03-12"
        },
        {
            name: "Hàng dễ vỡ",
            description: "Sản phẩm cần bảo quản cẩn thận",
            created_at: "2026-03-04",
            updated_at: "2026-03-13"
        },
        {
            name: "Hàng tồn kho lâu",
            description: "Sản phẩm lưu trữ lâu ngày trong kho",
            created_at: "2026-03-05",
            updated_at: "2026-03-14"
        }
    ];

    return (
        <HomeLayout>
            <FormCardList>
                <Header 
                    title="Danh sách danh mục" 
                    link="/category/add" 
                    titleButton="Thêm danh mục"
                />

                <div className="card-body">
                    <div className="table-responsive">
                        <TaskBar />
                        <FormTable names={names}>
                            {categories.map((category, index) => (
                                <CategoryRow key={index} category={category} />
                            ))}
                        </FormTable>
                    </div>
                </div>

                <Pagination />
            </FormCardList>
        </HomeLayout>
    );
}