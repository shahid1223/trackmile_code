import { memo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserData } from '../../rtk-slice/globalSlice';
import { getRunsheetSummary, getSummaryDateRangeRunsheetDTOs, getManualRunsheetDateRangeDTOs, approveRunsheet } from '../../rtk-slice/manualRunsheetSlice';
import { Row, Col } from 'react-bootstrap';
import './ManualRunsheet.scss';
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { TextBox, Button, FormField } from "../../components/Form";
import moment from 'moment';

const RunsheetSummary = (defaultValues) => {

  const userData = useSelector(getUserData);
  const summaryDateRangeRunsheetDTOs = useSelector(getSummaryDateRangeRunsheetDTOs);
  const manualRunsheetDateRangeDTOs = useSelector(getManualRunsheetDateRangeDTOs);
  const dispatch = useDispatch();

  const validationSchema = Yup.object().shape({
    startDate: Yup.string().required("Start date is required"),
    finishDate: Yup.string().required("Finish date is required"),
  });

  useEffect(() => {
    console.log('::::::::::', summaryDateRangeRunsheetDTOs);
    console.log('::::::::::', manualRunsheetDateRangeDTOs);
  }, [summaryDateRangeRunsheetDTOs, manualRunsheetDateRangeDTOs]);

  const {
    register,
    handleSubmit,
    // getValues,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    reValidateMode: "onChange",
    defaultValues: { ...defaultValues },
  });

  const handleSearch = (formData) => {
    const postDataObj = {
      startDate: formData.startDate,
      endDate: formData.finishDate
    }
    const headerData = {
      userId: userData.userContext.userId,
      tokenId: userData.userContext.tokenId
    };
    dispatch(getRunsheetSummary({ postDataObj, headerData }));
  }

  const handleApproveRunsheet = (formData) => {
    const postDataObj = {
      startDate: formData.startDate,
      endDate: formData.finishDate
    }
    const headerData = {
      userId: userData.userContext.userId,
      tokenId: userData.userContext.tokenId
    };
    dispatch(approveRunsheet({ postDataObj, headerData }));
  }


  return (
    <div className='runsheetSummary'>
      <Row>
        <Col className='col-2'>
          <FormField title="Start Date" required={true} id="startDate" ratio={[12, 12]}>
            <TextBox
              type="date"
              id="startDate"
              register={register}
              errors={errors}
              placeholder=""
            />
          </FormField>
        </Col>
        <Col className='col-2'>
          <FormField title="Finish Date" required={true} id="finishDate" ratio={[12, 12]}>
            <TextBox
              type="date"
              id="finishDate"
              register={register}
              errors={errors}
              placeholder=""
            />
          </FormField>
        </Col>
        <Col className='col-1 searchBtn'>
          <Button
            title={"Search"}
            type="submit"
            color="#000054"
            style={{ height: "37px" }}
            onClick={handleSubmit(handleSearch)}
          />
        </Col>
      </Row>
      <Row>
        <Col className='col-9'>
          {summaryDateRangeRunsheetDTOs?.length > 0 &&
            <>
              <div className='runsheetSummaryTable'>
                {summaryDateRangeRunsheetDTOs.map((driver) =>
                  <Row className='mb-2 driverContainer'>
                    <Col className='col-12 mb-3 diverName'>{driver.firstName + " " + driver.lastName + " - " + (driver.username || driver.driverName)}</Col>
                    <Col className='col-12'>
                      {driver.manualRunsheetDTOS.map((runsheet) =>
                        <Row>
                          <Col className='col-2'>{runsheet.date}</Col>
                          <Col className='col-1 p-0'>{moment(runsheet.startDateTime).format('h:mm a')}</Col>
                          <Col className='col-1 p-0'>{moment(runsheet.finishDateTime).format('h:mm a')}</Col>
                          <Col className='col-1'>{runsheet.breakTime}</Col>
                          <Col className='col-1 fw-bold'>{runsheet.totalHoursOfDay}</Col>
                          <Col className='col-2'>{runsheet.vehicleType}</Col>
                          <Col className='col-1'>{runsheet.rego}</Col>
                          <Col className='col-1'>{runsheet.trailerNo}</Col>
                        </Row>
                      )}
                    </Col>
                    <Col className='col-12 mb-3 mt-3'>
                      <Row>
                        <Col className='col-3'></Col>
                        <Col className='col-2 borderTop pt-3 fw-bold'>Total Hours</Col>
                        <Col className='col-1 borderTop pt-3 fw-bold red'>{driver.totalHours}</Col>
                      </Row>
                    </Col>
                  </Row>
                )}
              </div>
              <Row className='justify-content-end mt-3'>
                <Col className='col-2'>
                  <Button className='w-100' color="#F6930A" onClick={handleSubmit(handleApproveRunsheet)}>Approve Runsheet</Button>
                </Col>
              </Row>
            </>
          }
        </Col>
        <Col className='col-3'>
          <div className='closedRunsheetTable'>
            {manualRunsheetDateRangeDTOs?.length > 0 &&
              <table class="table">
                <thead class="thead-dark">
                  <tr>
                    <td scope="col">No</td>
                    <td scope="col">Create at</td>
                    <td scope="col">Period End</td>
                    <td scope="col">Status</td>
                  </tr>
                </thead>
                <tbody>
                  {summaryDateRangeRunsheetDTOs.map((element, index) =>
                    <tr>
                      <td>{index}</td>
                      <td>{element.createdAt}</td>
                      <td>{element.periodEnd}</td>
                      <td>{element.runsheetStatus}</td>
                    </tr>
                  )}
                </tbody>
              </table>
            }
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default memo(RunsheetSummary);
