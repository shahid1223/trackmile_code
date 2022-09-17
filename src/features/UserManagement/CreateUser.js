import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Tabs, Tab } from "react-bootstrap";

import profileIcon from "../../images/Ellipse1.png";
import config from "../../constants/config";
import styles from "./UserManagement.module.scss";
import { RatesTab, DocumentsUpload, PasswordTab, UserDetailsForm } from "./TabPages";
import { getUserData } from "../../rtk-slice/globalSlice";

const CreateUser = () => {
  // const userData = useSelector(getUserData);
  // const userContext = userData.userContext;

  const [createdUser, setCreatedUser] = useState();
  const [key, setKey] = useState("userdetails");
  return (
    <>
      <div className={styles.createUser__header}>
        {/* <img
          src={profileIcon}
          alt=""
          className={styles.createUser__headerImage}
        /> */}
        <h2 className="text-white text-center p-5">Create User</h2>
      </div>
      {/* <div className={styles.createEditView__bg}> */}
      <div>
        <div className="col-md-10 mx-auto py-2 tabs-user ">
          <Tabs
            className="blur-bg border-white   rounded-top"
            fill
            // justify
            id="controlled-tab-example"
            activeKey={key}
            onSelect={(k) => setKey(k)}
          >

            <Tab title="Users Details" eventKey="userdetails" className="border-white" >
              <UserDetailsForm
                id={createdUser?.id}
                setCreatedUser={setCreatedUser}
                setKey={setKey}
                className="border-white"
              />
            </Tab>

            <Tab title="Password Management" eventKey="password" disabled={!createdUser}>
              <PasswordTab
                id={createdUser?.id}
                setKey={setKey}
              />
            </Tab>
            <Tab title="Rates" eventKey="rates" disabled={!createdUser}>
              <div className="shadow">
                <RatesTab
                  driverId={createdUser?.id}
                  submitUrl={config.baseUrl + config.saveDriverRates}
                  setKey={setKey}
                />
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
    </>
  );
};

export default CreateUser;
