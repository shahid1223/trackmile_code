import { memo, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getDriverList, getDrivers, getUserData } from '../../rtk-slice/globalSlice';
import { addDriver, addAllDrivers, removeAllDrivers, addRunsheet, getAddedDrivers, removeRunsheets, getDateRangeRunsheets, addRunsheetRows, submitRunsheet, selectDriver, removeDriver, deleteRunsheet } from '../../rtk-slice/manualRunsheetSlice';
import { Row, Col, Tabs, Tab, Form, Button } from 'react-bootstrap';
import { default as CustomButton } from '../../components/Form/Button';
import './ManualRunsheet.scss';
import Runsheet from './Runsheet';
import RunsheetSummary from './RunsheetSummary';
import Reports from './Reports';
import Autosuggest from 'react-autosuggest';
import moment from 'moment';

const ManualRunsheet = () => {
  const [suggestions, setSuggestions] = useState([]);
  const [selectedDriver, setSelectedDriver] = useState('');
  const [selectedDriverObj, setSelectedDriverObj] = useState();
  const [driverError, setDriverError] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [finishDate, setFinishDate] = useState('');
  const [maxFinishDate, setMaxFinishDate] = useState('');
  const [startDateError, setStartDateError] = useState(false);
  const [finishDateError, setFinishDateError] = useState(false);
  const driverList = useSelector(getDrivers);
  const userData = useSelector(getUserData);
  const addedDrivers = useSelector(getAddedDrivers);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('::::::::driverList', driverList);
    console.log('::::::::addedDrivers', addedDrivers);
  }, [driverList, addedDrivers]);

  useEffect(() => {
    if (userData && userData.userContext) {
      const { userId, tokenId } = userData.userContext;
      dispatch(getDriverList({ userId, tokenId }));
    }
  }, [userData]);

  const onChange = (event, { newValue }) => {
    setDriverError(false);
    const filteredDrivers = driverList.filter((driver) => {
      return newValue === driver.firstName + " " + driver.lastName + " - " + driver.username
    });
    if (filteredDrivers.length) {
      setSelectedDriverObj(filteredDrivers[0]);
    } else {
      setSelectedDriverObj('');
    }
    setSelectedDriver(newValue);
  };

  const onSuggestionsFetchRequested = ({ value }) => {
    const filteredDrivers = driverList.filter((driver) => {
      return driver?.firstName?.toLocaleLowerCase().indexOf(value.toLocaleLowerCase()) > -1
        || driver?.lastName?.toLocaleLowerCase().indexOf(value.toLocaleLowerCase()) > -1
        || driver?.username?.toLocaleLowerCase().indexOf(value.toLocaleLowerCase()) > -1
    });
    setSuggestions(filteredDrivers.slice(0, 5));
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const getSuggestionValue = suggestion => suggestion.firstName + " " + suggestion.lastName + " - " + suggestion.username;

  const renderSuggestion = suggestion => (
    <div className='list-item'>
      {suggestion.firstName + " " + suggestion.lastName + " - " + suggestion.username}
    </div>
  );

  const inputProps = {
    placeholder: 'Driver Name or Driver ID',
    value: selectedDriver,
    className: `form-control ${driverError ? "is-invalid" : ""}`,
    onChange: onChange
  };

  const handleBtnClick = (btnName) => {
    if (btnName === 'add driver') {
      if (!selectedDriverObj) {
        setDriverError(true);
      } else {
        dispatch(addDriver(selectedDriverObj));
        setSelectedDriver('');
      }
    } else if (btnName === 'add all driver') {
      dispatch(addAllDrivers(driverList));
    } else if (btnName === 'clear') {
      setStartDate('');
      setFinishDate('');
      setMaxFinishDate('');
      dispatch(removeAllDrivers());
    } else {
      if (!startDate || !finishDate) {
        if (!startDate) setStartDateError(true);
        if (!finishDate) setFinishDateError(true);
        return false;
      }
      if (btnName === 'add rows') {
        console.log(':::::: add rows');
        var dateArray = [];
        var currentDate = moment(startDate);
        var stopDate = moment(finishDate);
        while (currentDate <= stopDate) {
          dateArray.push({ date: moment(currentDate).format('YYYY-MM-DD') })
          currentDate = moment(currentDate).add(1, 'days');
        }
        if (addedDrivers.length) {
          dispatch(addRunsheetRows(dateArray));
        }
      } else {
        const postDataObj = {
          startDate,
          endDate: finishDate
        }
        const headerData = {
          userId: userData.userContext.userId,
          tokenId: userData.userContext.tokenId
        };
        dispatch(getDateRangeRunsheets({ postDataObj, headerData }));
      }
    }
  }

  const handleChange = (value, fieldName) => {
    if (fieldName === 'start date') {
      setStartDateError(false);
      setStartDate(moment(value).format('yyyy-MM-DD'));
      const maxDate = moment(value).add(6, 'days');
      setMaxFinishDate(maxDate.format('yyyy-MM-DD'));
    } else {
      setFinishDateError(false);
      setFinishDate(moment(value).format('yyyy-MM-DD'));
    }
  }

  const handleAddRunsheet = (driverUserId) => {
    dispatch(addRunsheet(driverUserId));
  }

  const handleDriverSelect = (userId) => {
    dispatch(selectDriver({ userId }));
  }

  const handleSubmitRunsheet = () => {
    const postDataObj = {
      startDate,
      endDate: finishDate
    };
    const headerData = {
      userId: userData.userContext.userId,
      tokenId: userData.userContext.tokenId
    };
    dispatch(submitRunsheet({ postDataObj, headerData }));
  }

  const handleDeleteRunsheet = (driverUserId) => {
    const selectedDriver = addedDrivers.find((ele) => ele.userId === driverUserId);
    let selectedRunsheetIds, selectedRunsheetIndexs;
    if (selectedDriver.selected) {
      selectedRunsheetIds = selectedDriver.manualRunsheetDTOS?.map((ele) => ele.id);
      if (!selectedRunsheetIds?.length) {
        dispatch(removeDriver({ userId: driverUserId }))
      }
    } else {
      selectedRunsheetIds = selectedDriver.manualRunsheetDTOS.filter((ele) => ele.selected && ele.id).map((ele) => ele.id);
      selectedRunsheetIndexs = selectedDriver.manualRunsheetDTOS.filter((ele) => ele.selected).map((ele, index) => index);
    }
    if (selectedRunsheetIds?.length) {
      const postDataObj = { manualRunsheetIds: selectedRunsheetIds };
      const headerData = {
        userId: userData.userContext.userId,
        tokenId: userData.userContext.tokenId
      };
      dispatch(removeRunsheets({ postDataObj, headerData, driverUserId }));
    } else if(selectedRunsheetIndexs?.length) {
      dispatch(deleteRunsheet(driverUserId));
    }
  }

  return (
    <Row>
      <Col>
        <h2>Simplified Runsheet</h2>
        <Row className='simplifiedRunsheet'>
          <Col>
            <Tabs
              defaultActiveKey="runsheet"
              id="uncontrolled-tab-example"
              className="mb-3"
            >
              <Tab eventKey="runsheet" title="Runsheet">
                <Row>
                  <Col className='col-2'>
                    <Form>
                      <Form.Group className="mb-3">
                        <Form.Label>Start Date</Form.Label>
                        <Form.Control type="date" className={startDateError ? 'is-invalid' : ''} value={startDate} onChange={(e) => handleChange(e.target.value, 'start date')} />
                      </Form.Group>
                    </Form>
                  </Col>
                  <Col className='col-2'>
                    <Form>
                      <Form.Group className="mb-3">
                        <Form.Label>Finish Date</Form.Label>
                        <Form.Control type="date" className={finishDateError ? 'is-invalid' : ''} value={finishDate} onChange={(e) => handleChange(e.target.value, 'finish date')} min={startDate} max={maxFinishDate} />
                      </Form.Group>
                    </Form>
                  </Col>
                  <Col className='col-2'>
                    <CustomButton className="getRunsheetBtn" title="Get Runsheet Data" color="#F6930A" onClick={() => handleBtnClick('Get Runsheet Data')} />
                  </Col>
                </Row>
                <Row className='addDriverRow'>
                  <Col className='col-2'>
                    <Form className='autocomplete'>
                      <Form.Group className="mb-3">
                        <Autosuggest
                          suggestions={suggestions}
                          onSuggestionsFetchRequested={onSuggestionsFetchRequested}
                          onSuggestionsClearRequested={onSuggestionsClearRequested}
                          getSuggestionValue={getSuggestionValue}
                          renderSuggestion={renderSuggestion}
                          inputProps={inputProps}
                        />
                      </Form.Group>
                    </Form>
                  </Col>
                  <Col className='col-8'>
                    <Row>
                      <Col className='col-2'><Button className='w-100' variant="success" onClick={() => handleBtnClick('add driver')}>Add Driver</Button></Col>
                      {/* <Col className='col-2'><Button className='w-100' variant="primary" onClick={() => handleBtnClick('add all driver')}>Add All Driver</Button></Col> */}
                      <Col className='col-2'><Button className='w-100' variant="warning" onClick={() => handleBtnClick('add rows')}>Add Rows</Button></Col>
                      <Col className='col-2'><Button className='w-100' variant="danger" onClick={() => handleBtnClick('clear')}>Reset</Button></Col>
                    </Row>
                  </Col>
                </Row>
                {addedDrivers.length > 0 &&
                  <>
                    <Row>
                      <Col className='driverContainer'>
                        {addedDrivers.map((driver) => {
                          return <Col className='driverRow' key={driver.userId}>
                            <Row className='eachDriver'>
                              <Col className='col-6'>
                                <Form.Check
                                  inline
                                  name="runsheet"
                                  onChange={() => handleDriverSelect(driver.userId)}
                                  checked={driver.selected}
                                />
                                {driver.firstName + " " + driver.lastName + " - " + (driver.username || driver.driverName)}
                              </Col>
                              <Col className='col-6 btnGroup'>
                                <Button variant='danger' onClick={() => handleDeleteRunsheet(driver.userId)}>Remove</Button>
                                <Button variant='success' onClick={() => handleAddRunsheet(driver.userId)}>Add</Button>
                              </Col>
                            </Row>
                            {driver.manualRunsheetDTOS?.length > 0 &&
                              <>
                                {driver.manualRunsheetDTOS.map((runsheet, index) => {
                                  return <Runsheet key={index} driver={driver} runsheet={runsheet} index={index} />
                                })}
                              </>
                            }
                          </Col>
                        })}
                      </Col>
                    </Row>
                    <Row className='justify-content-end mt-2'>
                      <Col className='col-2'>
                        <Button className='w-100' variant='success' onClick={() => handleSubmitRunsheet()}>Submit Runsheet</Button>
                      </Col>
                    </Row>
                  </>
                }
              </Tab>
              <Tab eventKey="runsheetSummary" title="Runsheet Summary">
                <RunsheetSummary />
              </Tab>
              <Tab eventKey="reports" title="Reports">
                <Reports />
              </Tab>
            </Tabs>
          </Col>
        </Row>
      </Col >
    </Row >
  );
}

export default memo(ManualRunsheet);
