import { Routes, Route, Outlet } from "react-router-dom";
import Navbar from "./components/Navbar"
import { ManualRunsheet, UserManagement, AdminDashboard } from './features';
import CreateUser from "./features/UserManagement/CreateUser";
import ToastComp from "./components/ToastComp"
import * as Navigate from './constants/routes';
import './App.scss';


const App = () => {

  return (
    <div className="App">
      <Navbar />
      <ToastComp />
      <Outlet />
      <Routes>
        <Route exact path={Navigate.MANUAL_RUNSHEET} element={<ManualRunsheet />} />
        <Route exact path={Navigate.USER_MANAGEMENT}  >
          <Route index element={<UserManagement />} />
          <Route path={Navigate.CREATE_USER} element={<CreateUser />} />
        </Route>
        <Route path={Navigate.ADMIN} element={<AdminDashboard />} />
      </Routes>
    </div>
  );
}

export default App;
