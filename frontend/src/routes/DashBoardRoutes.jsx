import { Route } from "react-router-dom";
import DashBoardPage from "../pages/DashBoardPage";

function DashBoardRoutes() {
  return (
    <>
      <Route path="/" element={<DashBoardPage />} />
      
    </>
  );
}

export default DashBoardRoutes;