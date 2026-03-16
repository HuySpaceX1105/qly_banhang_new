import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import Loader from "./components/Loader";

function App() {
  return (
    <>
      <BrowserRouter>
        <Loader>
          <AppRoutes />
        </Loader>
      </BrowserRouter> 
    </> 
  );
}

export default App;