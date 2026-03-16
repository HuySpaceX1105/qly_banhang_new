import { Route } from "react-router-dom";
import AddProductPage from "../pages/add/AddProductPage";
import AddCategoryPage from "../pages/add/AddCategoryPage";

function AddRoutes() {
  return (
    <>
      <Route path="/add/product" element={<AddProductPage />} />
      <Route path="/add/category" element={<AddCategoryPage />} />
    </>
  );
}

export default AddRoutes;