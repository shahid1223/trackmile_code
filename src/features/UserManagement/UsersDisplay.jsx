/* A React component that displays a table of users. */
import React, { useState } from "react";
import { FaPen, FaTrash, FaEye } from "react-icons/fa";
import TableComp from "../../components/Table";
import config from "../../constants/config";
import { useDispatch, useSelector } from "react-redux";
import { getUserData } from "../../rtk-slice/globalSlice";
import { deleteUserById, getUsersData } from "../../rtk-slice/userManagement";
import {
  getDriverGroups,
  getLoading,
  getProfiles,
  getUsers,
} from "../../rtk-slice/userManagement";
import ModalTab from "../../components/Modal";
import ViewEditUser from "./ViewEditUser";

const UsersDisplay = () => {
  const { tokenId, userId } = useSelector(getUserData).userContext;
  const dispatch = useDispatch();
  // const loading = useSelector(getLoading);
  const usersData = useSelector(getUsers).data;
  const { baseUrl, getUserList, deleteUser } = config;
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [viewMode, setViewMode] = useState("");
  const actionIconSize = 18;

  /* Converting the data from the redux store into a format that can be used by the react-table
  component. */
  let driverGroup = useSelector(getDriverGroups);
  driverGroup =
    Array.isArray(driverGroup) &&
    driverGroup.map((item) => ({
      label: item.name,
      value: item.id,
      key: item.id,
    }));
  let profileList = useSelector(getProfiles);
  profileList =
    Array.isArray(profileList) &&
    profileList.map((profile) => ({
      label: profile,
      value: profile,
      key: profile,
    }));

  const handleEditClick = (e) => {
    setViewMode("edit")
    setSelectedUserId(e);
  };
  const handleViewClick = (e) => {
    setViewMode("view")
    setSelectedUserId(e);
  };
  const handleHideModal = () => {
    setSelectedUserId(0);
  };
  const handleDeleteUser = (id) => {
    let confirmDelete = window.confirm('Are you sure you want to delete this user?');
    if (confirmDelete) {
    dispatch(deleteUserById({ id, headers: { tokenId, userId } }));
    dispatch(getUsersData({ tokenId, userId }));
    }
    
  };

  /**
   * It takes an id and returns the label of the driver group with that id
   * @returns The label of the driver group.
   */
  const getDriverGroupLabelById = (id) => {
    const obj =
      Array.isArray(driverGroup) &&
      driverGroup.find((g) => {
        return g.value === id;
      });
    return (obj && obj.label) || "";
  };

  /**
   * @returns A select element with a list of profiles.
   */
  const SelectFilterProfile = ({ column }) => {
    const { filterValue, setFilter } = column;
    let profileList = useSelector(getProfiles);
    profileList = Array.isArray(profileList)
      ? profileList.map((profile) => ({
          label: profile,
          value: profile,
          key: profile,
        }))
      : [{ label: "", value: "" }];
    return (
      <span>
        <select
          className="w-100 form-control"
          value={filterValue || ""}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="">--</option>
          {profileList.map((item) => (
            <option value={item.value} key={item.value}>
              {item.label}
            </option>
          ))}
        </select>
      </span>
    );
  };
  
  /**
   * @returns A select dropdown with the driver groups as options.
   */
  const SelectFilterDriverGroup = ({ column }) => {
    const { filterValue, setFilter } = column;
    let driverGroup = useSelector(getDriverGroups);
    driverGroup = driverGroup.map((item) => ({
      label: item.name,
      value: item.id,
    }));
    return (
      <span>
        <select
          className="w-100 form-control"
          value={filterValue || ""}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="">--</option>
          {driverGroup.map((item) => (
            <option value={item.value} key={item.value}>
              {item.label}
            </option>
          ))}
        </select>
      </span>
    );
  };

  /* An array of objects. Each object is a column in the table. */
  const columns = [
    {
      Header: "Employee ID",
      accessor: "employeeId",
      Filter: ColumnFilter,
      maxWidth: 70,
      minWidth: 50,
      width: 60,
    },
    {
      Header: "Username",
      accessor: "username",
      Filter: ColumnFilter,
      maxWidth: 120,
      minWidth: 50,
      width: 80,
    },
    {
      Header: "Profile",
      accessor: "profile",
      Filter: SelectFilterProfile,
      maxWidth: 80,
      minWidth: 50,
      width: 60,
    },
    {
      Header: "Driver Group",
      accessor: "driverGroupId",
      Filter: SelectFilterDriverGroup,
      maxWidth: 120,
      minWidth: 50,
      width: 80,
      Cell: ({ value }) => {
        getDriverGroupLabelById(value);
      },
    },
    {
      Header: "Licence Number",
      accessor: "licenseNo",
      Filter: ColumnFilter,
      maxWidth: 120,
      minWidth: 50,
      width: 80,
    },
    {
      Header: "Address",
      accessor: "address",
      Filter: ColumnFilter,
    },
    {
      Filter: ColumnFilter,
      disableFilters: true,
      maxWidth: 60,
      minWidth: 50,
      width: 55,
      Cell: ({ row }) => (
        <div className="d-flex ">
          <button
            title="view"
            className="btn btn-primary p-1 me-1 lh-1"
            onClick={() => {
              handleViewClick(row.original.userId);
            }}
          >
            <FaEye size={actionIconSize} />
          </button>
          <button
            title="edit"
            className="btn btn-primary p-1 me-1"
            onClick={() => {
              handleEditClick(row.original.userId);
            }}
          >
            <FaPen className="" size={actionIconSize} />
          </button>
          <button
            title="delete"
            className="btn btn-primary p-1"
            onClick={() => {
              handleDeleteUser(row.original.userId);
            }}
          >
            <FaTrash size={actionIconSize} />
          </button>
        </div>
      ),

      Header: "Actions",
    },
  ];

  return (
    <>
      <div className="blur-bg-10">
        <TableComp data={usersData ? usersData : []} columns={columns} />
        
        <ModalTab
          fullscreen={true}
          onHide={handleHideModal}
          show={selectedUserId > 0}
          body={selectedUserId && <ViewEditUser userId={selectedUserId} viewMode={viewMode} />}
        />
      </div>
    </>
  );
};

/**
 * @returns A Column Filter Input Box for TableComp 
 */
const ColumnFilter = ({ column }) => {
  const { filterValue, setFilter } = column;
  return (
    <span>
      <input
        className="w-100 form-control"
        placeholder="Search"
        value={filterValue || ""}
        onChange={(e) => setFilter(e.target.value)}
      />
    </span>
  );
};


export default UsersDisplay;
