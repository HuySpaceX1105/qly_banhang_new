import { Routes } from "react-router-dom";
import AuthRoutes from "./AuthRoutes";
import DashBoardRoutes from "./DashBoardRoutes";
import AddRoutes from "./AddRoutes";

function AppRoutes() {
  return (
    <Routes>
      {AuthRoutes()}
      {DashBoardRoutes()}
      {AddRoutes()}
    </Routes>
  );
}

export default AppRoutes;