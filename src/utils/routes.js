import {  Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from "react-redux";

import * as Navigation from '../constants/routes';
import { getUserData } from '../rtk-slice/globalSlice';
import Login from '../components/Login/LoginComp'
import App from '../App';

const AppRoutes = () => {
  const userData = useSelector(getUserData);
  const token = (userData && userData.userContext && userData.userContext.tokenId ? userData.userContext.tokenId : null)

  return <div>
    <Routes>
      <Route
        
        path={Navigation.LOGIN}
        element={<Login />}
      />
      {!token &&
       <Route
            path="*"
            element={<Navigate to={Navigation.LOGIN} replace/>} //this is a way to redirect
          />}
      {token && 
        <Route  
        path={Navigation.ROOT} 
        element={<App />} /> 
      }

    </Routes>
  </div>
};

export default AppRoutes;
