import { Route } from "react-router-dom";
import AddProductPage from "../pages/add/AddProductPage";
import AddCategoryPage from "../pages/add/AddCategoryPage";
import AddExportPage from "../pages/add/AddExportPage";
import AddImportPage from "../pages/add/AddImportPage";
import AddReturnSupplierPage from "../pages/add/AddReturnSupplierPage";
import AddReturnCustomerPage from "../pages/add/AddReturnCustomerPage";
import AddInventoryAdjustmentPage from "../pages/add/AddInventoryAdjustmentPage";
import AddSupplierPage from "../pages/add/AddSupplierPage";
import AddCustomerPage from "../pages/add/AddCustomerPage";
import AddUserPage from "../pages/add/AddUserPage";

function AddRoutes() {
  return (
    <>
      <Route path="/product/add" element={<AddProductPage />} />
      <Route path="/category/add" element={<AddCategoryPage />} />
      <Route path="/partner/suppliers/add" element={<AddSupplierPage />} />
      <Route path="/partner/customers/add" element={<AddCustomerPage />} />
      <Route path="/user/add" element={<AddUserPage />} />
      <Route path="/import/add" element={<AddImportPage />} />
      <Route path="/export/add" element={<AddExportPage />} />
      <Route path="/return/supplier/add" element={<AddReturnSupplierPage />} />
      <Route path="/return/customer/add" element={<AddReturnCustomerPage />} />
      <Route path="/report/add" element={<AddInventoryAdjustmentPage />} />
    </>
  );
}

export default AddRoutes;