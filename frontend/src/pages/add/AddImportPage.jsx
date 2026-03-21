import { useState } from "react";

import FormCard from "../../components/addComponent/FormCard";
import InputField from "../../components/addComponent/InputField";
import SelectField from "../../components/addComponent/SelectField";
import TextAreaField from "../../components/addComponent/TextAreaField";
import FormButtons from "../../components/addComponent/FormButtons";

import EditableTable from "../../components/EditableTable/EditableTable";

import HomeLayout from "../../layouts/HomeLayout";
import TableHeader from "../../components/EditableTable/TableHeader";

export default function AddImportPage() {

  /* ---------- DATA ---------- */

  const suppliers = [
    "Khách lẻ",
    "Công ty ABC",
    "Cửa hàng Minh Phát"
  ];

  const statuses = [
    "Đang tạo",
    "Chờ duyệt",
    "Đã duyệt",
    "Đã nhập kho"
  ];

  const products = [
    "Coca Cola",
    "Pepsi",
    "Bánh Oreo",
    "Snack Lays"
  ];

  const importColumns = [
    { key: "product", title: "Sản phẩm" },
    { key: "quantity", title: "Số lượng", className: "text-center" },
    { key: "price", title: "Đơn giá", className: "text-end" },
    { key: "mfg", title: "Ngày sản xuất" },
    { key: "exp", title: "Hạn sử dụng" },
    { key: "amount", title: "Thành tiền", className: "text-end" },
    { key: "action", title: "" }
  ];

  /* ---------- STATE ---------- */

  const [items, setItems] = useState([
    {
      product: "",
      quantity: 1,
      price: 0,
      manufacture_date: "",
      expiry_date: ""
    }
  ]);

  /* ---------- FUNCTIONS ---------- */

  const addRow = () => {

    setItems(prev => [
      ...prev,
      {
        product: "",
        quantity: 1,
        price: 0,
        manufacture_date: "",
        expiry_date: ""
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

      <FormCard title="Tạo phiếu nhập kho">

        <form>

          <div className="row">
            <InputField label="Ngày nhập *" type="date" col="col-md-6"/>
            <InputField label="Mã phiếu nhập *" placeholder="Nhập mã phiếu" col="col-md-6" required/>
            <SelectField label="Nhà cung cấp *" options={suppliers} col="col-md-6"/>
            <SelectField label="Trạng thái" options={statuses} col="col-md-6"/>
            <TextAreaField label="Ghi chú" />
          </div>

          <EditableTable title="Danh sách nhập kho" rows={items} columns={importColumns} addRow={addRow} removeRow={removeRow} updateItem={updateItem}>
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

          <FormButtons submitText="Tạo phiếu nhập" />

        </form>

      </FormCard>

    </HomeLayout>

  );

}