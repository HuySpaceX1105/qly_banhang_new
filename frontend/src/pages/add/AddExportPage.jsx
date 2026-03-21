import { useState } from "react";

import FormCard from "../../components/addComponent/FormCard";
import InputField from "../../components/addComponent/InputField";
import SelectField from "../../components/addComponent/SelectField";
import TextAreaField from "../../components/addComponent/TextAreaField";
import FormButtons from "../../components/addComponent/FormButtons";

import EditableTable from "../../components/EditableTable/EditableTable";
import TableHeader from "../../components/EditableTable/TableHeader";

import HomeLayout from "../../layouts/HomeLayout";

export default function AddExportPage() {

  /* ---------- DATA ---------- */

  const customers = [
    "Khách lẻ",
    "Nguyễn Văn A",
    "Công ty XYZ"
  ];

  const statuses = [
    "Đang tạo",
    "Chờ duyệt",
    "Đã duyệt",
    "Đã xuất kho"
  ];

  const exportColumns = [
    { key: "product", title: "Sản phẩm" },
    { key: "quantity", title: "Số lượng", className: "text-center" },
    { key: "price", title: "Đơn giá", className: "text-end" },
    { key: "amount", title: "Thành tiền", className: "text-end" },
    { key: "action", title: "" }
  ];

  /* ---------- STATE ---------- */

  const [items, setItems] = useState([
    {
      product: "",
      quantity: 1,
      price: 0
    }
  ]);

  /* ---------- FUNCTIONS ---------- */

  const addRow = () => {
    setItems(prev => [
      ...prev,
      {
        product: "",
        quantity: 1,
        price: 0
      }
    ]);
  };

  const removeRow = (index) => {
    setItems(prev => prev.filter((_, i) => i !== index));
  };

  const updateItem = (index, field, value) => {
    setItems(prev => {
      const newItems = [...prev];
      newItems[index] = {
        ...newItems[index],
        [field]: value
      };
      return newItems;
    });
  };

  const total = items.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  );

  /* ---------- UI ---------- */

  return (
    <HomeLayout>

      <FormCard title="Tạo phiếu xuất kho">

        <form>

          <div className="row">
            <InputField label="Ngày xuất *" type="date" col="col-md-6"/>
            <InputField label="Mã phiếu xuất *" placeholder="Nhập mã phiếu" col="col-md-6" required/>
            <SelectField label="Khách hàng *" options={customers} col="col-md-6"/>
            <SelectField label="Trạng thái" options={statuses} col="col-md-6"/>
            <TextAreaField label="Ghi chú" />
          </div>

          <EditableTable title="Danh sách xuất kho" rows={items} columns={exportColumns} addRow={addRow} removeRow={removeRow} updateItem={updateItem}>
            <TableHeader>
                <th>SKU</th>
                <th>Tên</th>
                <th>Giá nhập</th>
                <th>Số lượng</th>
                <th>Ngày sản xuất</th>
                <th>Hạn bảo hành</th>
            </TableHeader>
          </EditableTable>

          {/* Tổng tiền */}
          <div className="text-end mt-3">
            <h5>Tổng tiền: {total.toLocaleString()} đ</h5>
          </div>

          <FormButtons submitText="Tạo phiếu xuất" />

        </form>

      </FormCard>

    </HomeLayout>
  );
}