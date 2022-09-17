import { memo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserData } from '../../rtk-slice/globalSlice';
import { getApprovedRunsheets, getVerifiedRunsheets, getApprovedRunsheetsData, getVerifiedRunsheetsData } from '../../rtk-slice/manualRunsheetSlice';
import { Row, Col } from 'react-bootstrap';
import './ManualRunsheet.scss';
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { TextBox, Button, FormField, SelectBox } from "../../components/Form";
import moment from 'moment';

const RunsheetSummary = (defaultValues) => {

  const [runsheetList] = useState([{ name: 'Verified Reports' }, { name: 'Approved Reports' }, { name: 'Annual Reports' }, { name: 'TPAR Reports' }]);
  const userData = useSelector(getUserData);
  const dispatch = useDispatch();

  const validationSchema = Yup.object().shape({
    runsheetType: Yup.string().required("Runsheet Type is required"),
    startDate: Yup.string().required("Start date is required"),
    finishDate: Yup.string().required("Finish date is required"),
  });


  const {
    register,
    handleSubmit,
    getValues,
    setValue,
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
    if (formData.runsheetType === 'Verified Reports') {
      dispatch(getVerifiedRunsheets({ postDataObj, headerData }));
    } else if (formData.runsheetType === 'Approved Reports') {
      dispatch(getApprovedRunsheets({ postDataObj, headerData }));
    }
  }

  return (
    <div className='reportsSection'>
      <Row>
        <Col className='col-4'>
          <FormField title="Report Type" required={true} id="runsheetType">
            <SelectBox
              register={register}
              defaultLabel="Please select"
              data={runsheetList}
              id="runsheetType"
              errors={errors}
              setValue={setValue}
              displayKey="name"
              valueKey="name"
            />
          </FormField>
        </Col>
        {(getValues("runsheetType") === 'Verified Reports' || getValues("runsheetType") === 'Approved Reports') && (
          <Col className='col-12'>
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
          </Col>
        )}
      </Row>
    </div>
  );
}

export default memo(RunsheetSummary);
