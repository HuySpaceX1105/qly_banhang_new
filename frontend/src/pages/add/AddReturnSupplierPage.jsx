import { useState } from "react";

import FormCard from "../../components/addComponent/FormCard";
import SelectField from "../../components/addComponent/SelectField";
import TextAreaField from "../../components/addComponent/TextAreaField";
import FormButtons from "../../components/addComponent/FormButtons";
import EditableTable from "../../components/EditableTable/EditableTable";
import TableHeader from "../../components/EditableTable/TableHeader";
import HomeLayout from "../../layouts/HomeLayout";

export default function AddReturnSupplierPage() {

    // ===== DATA =====
    const suppliers = [
        "Công ty ABC",
        "Nhà cung cấp Minh Phát",
        "Công ty Phú Hưng"
    ];

    const statuses = [
        "DRAFT",
        "PENDING",
        "APPROVED",
        "COMPLETED",
        "CANCELLED"
    ];

    // ===== STATE =====
    const [items, setItems] = useState([]);

    // ===== HANDLE =====
    const addRow = (product) => {

        // tránh trùng sản phẩm
        if (items.some(i => i.product_id === product.id)) {
            alert("Sản phẩm đã tồn tại");
            return;
        }

        setItems([
            ...items,
            {
                product_id: product.id,
                product: product.name,
                import_price: 1,
                quantity: 1,
                manufacture_date: "",
                expiry_date: ""
            }
        ]);
    };

    const updateItem = (index, field, value) => {
        const newItems = [...items];
        newItems[index][field] = value;
        setItems(newItems);
    };

    const removeRow = (index) => {
        setItems(items.filter((_, i) => i !== index));
    };

    // ===== TOTAL =====
    const total = items.reduce(
        (sum, item) => sum + item.quantity * item.import_price,
        0
    );

    // ===== UI =====
    return (
        <HomeLayout>

            <FormCard title="Tạo phiếu trả nhà cung cấp">

                <form>

                    <div className="row">

                        <SelectField
                            label="Nhà cung cấp *"
                            options={suppliers}
                            col="col-md-6"
                        />

                        <SelectField
                            label="Trạng thái"
                            options={statuses}
                            col="col-md-6"
                        />

                        <TextAreaField label="Ghi chú" />

                    </div>

                    {/* ===== TABLE ===== */}
                    <EditableTable
                        title="Danh sách trả hàng"
                        rows={items}
                        addRow={addRow}
                        removeRow={removeRow}
                        updateRow={updateItem}
                    >
                        <TableHeader>
                            <th>SKU</th>
                            <th>Tên</th>
                            <th>Giá nhập</th>
                            <th>Số lượng</th>
                            <th>Ngày sản xuất</th>
                            <th>Hạn sử dụng</th>
                        </TableHeader>
                    </EditableTable>

                    {/* ===== TOTAL ===== */}
                    <div className="text-end mt-3">
                        <h5>Tổng tiền: {total.toLocaleString()} đ</h5>
                    </div>

                    <FormButtons submitText="Tạo phiếu trả" />

                </form>

            </FormCard>

        </HomeLayout>
    );
}