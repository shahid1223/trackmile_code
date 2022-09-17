import { memo, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Form } from 'react-bootstrap';
import './ManualRunsheet.scss';
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { SelectBox, TextBox, Button } from "../../components/Form";
import { editRunsheet, selectRunsheet, saveRunsheet } from "../../rtk-slice/manualRunsheetSlice";
import { getUserData } from "../../rtk-slice/globalSlice";
import moment from 'moment';

const Runsheet = ({ driver, runsheet, index }) => {

  const [vehicleList, setVehicleList] = useState([{ name: 'Standard' }, { name: 'A Double' }, { name: 'B Double' }, { name: 'Semi Trailer' }, { name: 'Side Loader' }, { name: 'Rigid' }]);
  const userData = useSelector(getUserData);
  const dispatch = useDispatch();

  const validationSchema = Yup.object().shape({
    date: Yup.string().required("Runsheet date is required"),
    startDateTime: Yup.string().required("Start date is required"),
    finishDateTime: Yup.string().required("Finish date is required"),
    breakTime: Yup.string().required("Break is required"),
    totalHoursOfDay: Yup.string().required("Total hours is required"),
    ref: Yup.string().optional(),
    vehicleType: Yup.string().required("Vehicle type is required"),
    rego: Yup.string().required("REGO is required"),
    trailerNo: Yup.string().required("Trailer No is required"),
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    reValidateMode: "onChange",
    defaultValues: { ...runsheet },
  });

  const onRunsheetSubmit = (formData) => {
    const postDataObj = { ...formData };
    postDataObj.id = runsheet.id ? runsheet.id : '';
    postDataObj.userId = driver.userId;
    postDataObj.username = driver.username || runsheet.username;
    postDataObj.startDateTime = moment(formData.startDateTime).format('YYYY-MM-DD HH:mm:ss');
    postDataObj.finishDateTime = moment(formData.finishDateTime).format('YYYY-MM-DD HH:mm:ss');
    const headerData = {
      userId: userData.userContext.userId,
      tokenId: userData.userContext.tokenId
    };
    dispatch(saveRunsheet({ postDataObj, headerData, runsheetIndex: index }));
  };

  const onRunsheetEdit = () => {
    dispatch(editRunsheet({ userId: driver.userId, runsheetIndex: index }));
  };

  const onSelectRunsheet = () => {
    dispatch(selectRunsheet({ userId: driver.userId, runsheetIndex: index }));
  };

  return (
    <div className='runsheetContainer'>
      {index === 0 && <Row className='runsheetHeader'>
        <Col className={`col-1 fw-bold checkbox`}></Col>
        <Col className='col-1 fw-bold runsheetDate'>Runsheet Date</Col>
        <Col className='col-1 fw-bold startDate'>Start Date</Col>
        <Col className='col-1 fw-bold finishDate'>Finish Date</Col>
        <Col className='col-1 fw-bold'>Break</Col>
        <Col className='col-1 fw-bold'>Total Hours</Col>
        <Col className='col-1 fw-bold'>REF</Col>
        <Col className='col-1 fw-bold vehicleType'>Vehicle Type</Col>
        <Col className='col-1 fw-bold'>Rego</Col>
        <Col className='col-1 fw-bold'>Trailer No</Col>
      </Row>}
      {(runsheet.id && !runsheet.editing) && <Row className='savedRunsheet'>
        <Col className={`col-1 checkbox`}>
          <Form.Check
            inline
            name="runsheet"
            onChange={onSelectRunsheet}
            checked={runsheet.selected}
          /></Col>
        <Col className='col-1 runsheetDate'>{runsheet.date}</Col>
        <Col className='col-1 startDate'>{runsheet.startDateTime}</Col>
        <Col className='col-1 finishDate'>{runsheet.finishDateTime}</Col>
        <Col className='col-1'>{runsheet.breakTime}</Col>
        <Col className='col-1'>{runsheet.totalHoursOfDay}</Col>
        <Col className='col-1'>{runsheet.ref || '--'}</Col>
        <Col className='col-1 vehicleType'>{runsheet.vehicleType}</Col>
        <Col className='col-1'>{runsheet.rego}</Col>
        <Col className='col-1'>{runsheet.trailerNo}</Col>
        {runsheet.status === "SAVED" && <Col className='col-1'>
          <Button
            title="Edit"
            color="#000054"
            style={{ height: "37px" }}
            onClick={onRunsheetEdit}
          />
        </Col>}
      </Row>}
      {(!runsheet.id || runsheet.editing) &&
        <Row className='editRunsheet'>
          <Col className={`col-1 checkbox`}>
            <Form.Check
              inline
              name="runsheet"
              onChange={onSelectRunsheet}
              checked={runsheet.selected}
            />
          </Col>
          <Col className='col-1 runsheetDate'>
            <TextBox
              type="date"
              id="date"
              register={register}
              errors={errors}
              placeholder=""
            />
          </Col>
          <Col className='col-1 startDate'>
            <TextBox
              type="datetime-local"
              id="startDateTime"
              register={register}
              errors={errors}
              placeholder=""
            />
          </Col>
          <Col className='col-1 finishDate'>
            <TextBox
              type="datetime-local"
              id="finishDateTime"
              register={register}
              errors={errors}
              placeholder=""
            />
          </Col>
          <Col className='col-1'>
            <TextBox
              type="text"
              id="breakTime"
              register={register}
              errors={errors}
              placeholder="Break"
            />
          </Col>
          <Col className='col-1'>
            <TextBox
              type="text"
              id="totalHoursOfDay"
              register={register}
              errors={errors}
              placeholder="Total Hours"
            />
          </Col>
          <Col className='col-1'>
            <TextBox
              type="text"
              id="ref"
              register={register}
              errors={errors}
              placeholder="REF"
            />
          </Col>
          <Col className='col-1 vehicleType'>
            <SelectBox
              register={register}
              defaultLabel="Please select"
              data={vehicleList}
              id="vehicleType"
              errors={errors}
              setValue={setValue}
              displayKey="name"
              valueKey="name"
            />
          </Col>
          <Col className='col-1'>
            <TextBox
              type="text"
              id="rego"
              register={register}
              errors={errors}
              placeholder="REGO"
            />
          </Col>
          <Col className='col-1'>
            <TextBox
              type="text"
              id="trailerNo"
              register={register}
              errors={errors}
              placeholder="Trailer No"
            />
          </Col>
          <Col className='col-1'>
            <Button
              title={runsheet.editing ? "Update" : "Save"}
              type="submit"
              color="#000054"
              style={{ height: "37px" }}
              onClick={handleSubmit(onRunsheetSubmit)}
            />
          </Col>
        </Row>
      }
    </div>
  );
}

export default memo(Runsheet);
