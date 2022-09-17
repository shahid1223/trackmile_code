/* A React component that is used to view and edit a user. */
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Tabs, Tab } from "react-bootstrap";

import profileIcon from "../../images/Ellipse1.png";
import config from "../../constants/config";
import styles from "./UserManagement.module.scss";
import {
  RatesTab,
  DocumentsUpload,
  PasswordTab,
  UserDetailsForm,
} from "./TabPages";
// import { getUserData } from "../../rtk-slice/globalSlice";
import { getUserDetailsById, getUserRatesById } from "../../utils/api";

const ViewEditUser = ({ userId, viewMode }) => {
  const [userDetails, setUserDetails] = useState();
  const [driverCurrentRates, setDriverCurrentRates] = useState();
  useEffect(() => {
    /**
     * It fetches the user details from the database and sets the state of the user details.
     */
    const getUserDetails = async (userId) => {
      if (userId) {
        const data = await getUserDetailsById(userId);
        if (data) {
          let formData = data.data?.["0"];
          formData && setUserDetails(formData);
        }
      }
    };
    /**
     * If the userId is present, then get the user rates by id, and if the response data is an
     * array, then set the driver current rates to the response data, otherwise set the driver current
     * rates to an empty array.
     */
    const getDriverCurrentRates = async (userId) => {
      if (userId > 0) {
        const resp = await getUserRatesById(userId);
        if (resp?.data && Array.isArray(resp.data)) {
          setDriverCurrentRates({ rates: resp.data });
        } else {
          setDriverCurrentRates({ rates: [] });
        }
      }
    };
    getDriverCurrentRates(userId);
    getUserDetails(userId);
  }, [userId]);
  return (
    <div className="d-flex flex-column">
    {/* using same styles as createUser component */}
      <div className={styles.createUser__header}>
        {/* <img
          src={profileIcon}
          alt=""
          className={styles.createUser__headerImage}
        /> */}
        <h2 className="text-white text-center p-5">
          {viewMode.toUpperCase()} USER
        </h2>
      </div>
      <div className={styles.createEditView__bg}>
        <div className="col-md-10 mx-auto py-2 tabs-user ">
          <Tabs
            className="blur-bg border-white   rounded-top"
            defaultActiveKey="userdetails"
            fill
            // justify
            id="uncontrolled-tab-example"
          >
            <Tab
              title="Users Details"
              eventKey="userdetails"
              className="border-white"
            >
              {userDetails && (
                <UserDetailsForm
                  defaultValues={userDetails}
                  viewEditMode={viewMode}
                  submitUrl={config.baseUrl + config.updateUser + "/" + userId}
                  className="border-white"
                />
              )}
            </Tab>

            {viewMode==="edit" && <Tab
              title="Password Management"
              eventKey="password"
              disabled={false}
            >
              <PasswordTab 
                viewEditMode={viewMode}
                id={userId}
                />
            </Tab>}
            <Tab title="Rates" eventKey="rates">
              <div className="shadow">
                {driverCurrentRates && (
                  <RatesTab
                    // createdUser={createdUser}
                    defaultValues={driverCurrentRates}
                    viewEditMode={viewMode}
                    driverId={userId}
                    submitUrl={config.baseUrl + config.saveDriverRates}
                  />
                )}
              </div>
            </Tab>
            <Tab title="Additions" eventKey="additions" disabled={true}></Tab>
            <Tab title="Deductions" eventKey="deductions" disabled={true}></Tab>
            <Tab title="TFN" eventKey="tfn" disabled={true}></Tab>
            <Tab title="Documents" eventKey="documents" disabled={true}>
              <div className=" shadow">
                <DocumentsUpload />
              </div>
            </Tab>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ViewEditUser;
