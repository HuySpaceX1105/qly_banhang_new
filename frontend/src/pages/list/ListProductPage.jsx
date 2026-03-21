import HomeLayout from "../../layouts/HomeLayout";
import Header from "../../components/listdata/Header";
import FormCardList from "../../components/listdata/FormCardList";
import FormTable from "../../components/listdata/table/FormTable";
import TaskBar from "../../components/listdata/table/TaskBar";
import Pagination from "../../components/listdata/Pagination";
import ProductRow from "../../components/listdata/table/row/ProductRow";


export default function ProductPage() {
    const names = ["Sản phẩm", "SKU", "Danh mục", "Đơn vị", "Giá bán", "Trạng thái", "Ngày tạo"];

    const products = [
        {
            sku: "VL001",
            name: "Thép cuộn",
            description: "Thép dùng trong xây dựng",
            category: "Nguyên vật liệu",
            unit: "Kg",
            selling_price: 18500,
            active: true,
            created_at: "2026-03-01",
            image: "/assets/images/table/product/01.jpg"
        },
        {
            sku: "VL002",
            name: "Xi măng PCB40",
            description: "Xi măng dùng cho công trình",
            category: "Nguyên vật liệu",
            unit: "Bao",
            selling_price: 92000,
            active: true,
            created_at: "2026-03-02",
            image: "/assets/images/table/product/02.jpg"
        },
        {
            sku: "VL003",
            name: "Cát xây",
            description: "Cát dùng cho xây dựng",
            category: "Vật liệu rời",
            unit: "m³",
            selling_price: 250000,
            active: true,
            created_at: "2026-03-03",
            image: "/assets/images/table/product/03.jpg"
        },
        {
            sku: "VL004",
            name: "Đá 1x2",
            description: "Đá dùng cho bê tông",
            category: "Vật liệu rời",
            unit: "m³",
            selling_price: 300000,
            active: true,
            created_at: "2026-03-04",
            image: "/assets/images/table/product/04.jpg"
        },
        {
            sku: "VL005",
            name: "Ống nhựa PVC",
            description: "Ống dẫn nước",
            category: "Thiết bị",
            unit: "Mét",
            selling_price: 45000,
            active: false,
            created_at: "2026-03-05",
            image: "/assets/images/table/product/05.jpg"
        }
    ];

    return (
        <HomeLayout>
            <FormCardList>
                <Header title="Danh sách sản phẩm" link="/product/add" titleButton="Thêm sản phẩm"/>
                    <div className="card-body">
                        <div className="table-responsive">
                            <TaskBar/>
                            <FormTable names={names}>
                                {products.map((product, index) => (
                                    <ProductRow key={index} product={product}/>
                                ))}
                            </FormTable>
                        </div>
                    </div>
                    <Pagination/>    
            </FormCardList>
        </HomeLayout>
        
    );
}