import { Route } from "react-router-dom";
import ListProductPage from "../pages/list/ListProductPage";
import ListCategoryPage from "../pages/list/ListCategoryPage";
import ListImportPage from "../pages/list/ListImportPage";
import ListExportPage from "../pages/list/ListExportPage";
import ListSupplierPage from "../pages/list/ListSupplierPage";
import ListCustomerPage from "../pages/list/ListCustomerPage";
import ListUserPage from "../pages/list/ListUserPage";
import ListReturnSupplierPage from "../pages/list/ListReturnSupplierPage";
import ListReturnCustomerPage from "../pages/list/ListReturnCustomerPage";
import ListAdjustmentPage from "../pages/list/ListAdjustmentPage";
import PrivateRoute from "./PrivateRoute";


function ListRoutes() {
  return (
    <>
      <Route path="/product/list" element={<ListProductPage />} />
      <Route path="/category/list" element={<ListCategoryPage />} />
      <Route path="/partner/suppliers/list" element={<ListSupplierPage />} />
      <Route path="/partner/customers/list" element={<ListCustomerPage />} />
      <Route path="/user/list" element={
                                        <PrivateRoute>
                                          <ListUserPage />
                                        </PrivateRoute>
                                      }/>
      <Route path="/import/list" element={<ListImportPage />} />
      <Route path="/export/list" element={<ListExportPage />} />
      <Route path="/return/supplier/list" element={<ListReturnSupplierPage />} />
      <Route path="/return/customer/list" element={<ListReturnCustomerPage />} />
      <Route path="/report/list" element={<ListAdjustmentPage />} />
    </>
  );
}

export default ListRoutes;