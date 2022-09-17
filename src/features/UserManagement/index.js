import { memo,useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { MdAdd } from "react-icons/md"
import { useDispatch, useSelector } from 'react-redux';
import Spinner from "react-bootstrap/Spinner";

import * as Navigate from '../../constants/routes'
import Button from '../../components/Form/Button'
import UsersDisplay from './UsersDisplay';
import styles from "./UserManagement.module.scss";
import { getDriverGroup, getLoading, getProfileList, getUsersData } from '../../rtk-slice/userManagement';
import { getUserData, getVehicleTypeList } from '../../rtk-slice/globalSlice';

const UserManagement = () => {
  const {tokenId, userId} = useSelector(getUserData).userContext
  const dispatch = useDispatch()
  const header = {tokenId, userId}
  const loading = useSelector(getLoading)
  useEffect(() => {
    dispatch(getProfileList(header))
    dispatch(getDriverGroup(header))
    dispatch(getUsersData(header))
    dispatch(getVehicleTypeList({ userId, tokenId }));
  },[header])
  

  return (
    <Row >
      <Col className={styles.userManagement__Display}>
        <Row className="mb-3 p-2">
          <Col className='col-3 me-auto'>
            <h3 className="mx-auto text-white" >User Management</h3>
          </Col>
          <Col className="col-2">
            <Col className='col-sm-10' style={{ borderRadius: "20px" }}>
              <Link to={Navigate.CREATE_USER}>
                <Button title="Create User" color="#F6930A" onClick={()=>{console.log("going to add user page")}}>
                  <MdAdd style={{ fill: 'white' }} />
                </Button>
              </Link>
            </Col>
          </Col>
        </Row >
        <div className="p-2 ">
          {loading?  <Spinner className="d-flex flex-column" animation="border" variant="primary" />:<UsersDisplay />}
        </div>
      </Col>
    </Row>
  );
}

export default memo(UserManagement);
