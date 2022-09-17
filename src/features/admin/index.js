import React from 'react';
import data from '../../fakeData'


const AdminDashboard = () => {

    console.log(data)

    return (
        <div className='container-fluid'>
            <div className='bg-light p-4 rounded'>
                <div class="row d-flex align-items-center justify-content-center">
                    <div class="col-sm-3 mt-1">
                        <input type="text" class="form-control" placeholder="Full Name" aria-label="name" />
                    </div>
                    <div class="col-sm-3 mt-1">
                        <input type="text" class="form-control" placeholder="Id" aria-label="Id" />
                    </div>
                    <div class="col-sm-3 mt-1">
                        <input type="number" class="form-control" placeholder="Mobile Number" aria-label="Mobile" />
                    </div>
                    <div class="col-sm-3 mt-1">
                        <button type="button" class="btn btn-primary">Search</button>
                    </div>
                </div>

            </div>
            <div className='bg-light p-4 mt-2 rounded'>

                <div class="accordion" id="accordionExample">
                    <div class="card mt-2">
                        <div class="card-header" id="headingOne">
                            <h5 class="mb-0">
                                <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                    {data.personalDetails.header}
                                </button>
                            </h5>
                        </div>
                        <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
                            <div class="card-body">
                                <div class="table-responsive">
                                    <table class="table table-bordered">
                                        <thead>
                                            <tr>
                                                <th>First Name</th>
                                                <th>Last Name</th>
                                                <th>Email</th>
                                                <th>User Name</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>{data.personalDetails.firstName}</td>
                                                <td>{data.personalDetails.lastName}</td>
                                                <td>{data.personalDetails.email}</td>
                                                <td>{data.personalDetails.userName}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="card mt-2">
                        <div class="card-header" id="headingTwo">
                            <h5 class="mb-0">
                                <button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                    {data.licenceDetails.header}
                                </button>
                            </h5>
                        </div>
                        <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionExample">

                            <div class="card-body">
                                <div class="table-responsive">
                                    <table class="table table-bordered">
                                        <thead>
                                            <tr>
                                                <th>Driver Licence Number</th>
                                                <th>Driver Licence Type</th>
                                                <th>Driver Licence Uplaod</th>
                                                <th>File</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>{data.licenceDetails.driverLicenceNumber}</td>
                                                <td>{data.licenceDetails.driverLicenceType}</td>
                                                <td>{data.licenceDetails.driverLicenceUplaod}</td>
                                                <td>{data.licenceDetails.chooseFile}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div class="table-responsive mt-2">
                                    <p>Have you ever been disqulified from driving</p>
                                    <table class="table table-bordered">
                                        <thead>
                                            <tr>
                                                <th>Status</th>
                                                <th>explain</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>{data.licenceDetails.selectone}</td>
                                                <td>{data.licenceDetails.explain}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div class="table-responsive mt-2">
                                    <p>Do you have criminal conviction</p>
                                    <table class="table table-bordered">
                                        <thead>
                                            <tr>
                                                <th>Status</th>
                                                <th>explain</th>
                                                <th>white Card Number</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>{data.licenceDetails.selecttwo}</td>
                                                <td>{data.licenceDetails.explainTwo}</td>
                                                <td>{data.licenceDetails.whiteCardNumber}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div class="card mt-2">
                        <div class="card-header" id="headingThree">
                            <h5 class="mb-0">
                                <button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">

                                    {data.emergencyContact.header}
                                </button>
                            </h5>
                        </div>
                        <div id="collapseThree" class="collapse" aria-labelledby="headingThree" data-parent="#accordionExample">
                            <div class="card-body">
                                <div class="table-responsive">
                                    <table class="table table-bordered">
                                        <thead>
                                            <tr>
                                                <th>Emergency Contact FullName</th>
                                                <th>Emergency Contact Address</th>
                                                <th>Emergency Contact Mobile Number</th>
                                                <th>Emergency Contact Relationship</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>{data.emergencyContact.emergencyContactFullName}</td>
                                                <td>{data.emergencyContact.emergencyContactAddress}</td>
                                                <td>{data.emergencyContact.emergencyContactMobileNumber}</td>
                                                <td>{data.emergencyContact.emergencyContactRelationship}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div class="card mt-2">
                        <div class="card-header" id="headingFour">
                            <h5 class="mb-0">
                                <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapseFour" aria-expanded="true" aria-controls="collapseFour">
                                    {data.citizenshipDetails.header}
                                </button>
                            </h5>
                        </div>
                        <div id="collapseFour" class="collapse show" aria-labelledby="headingFour" data-parent="#accordionExample">
                            <div class="card-body">
                                <div class="table-responsive">
                                    <p>{data.citizenshipDetails.headerOne}</p>
                                    <table class="table table-bordered">
                                        <thead>
                                            <tr>
                                                <th>Nationality</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>{data.citizenshipDetails.select}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div class="table-responsive mt-2">
                                    <p>{data.citizenshipDetails.headerTwo}</p>
                                    <table class="table table-bordered">
                                        <thead>
                                            <tr>
                                                <th>Nationality</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>{data.citizenshipDetails.select}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="card mt-2">
                        <div class="card-header" id="headingFive">
                            <h5 class="mb-0">
                                <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapseFive" aria-expanded="true" aria-controls="collapseOne">
                                    {data.companyDetails.header}
                                </button>
                            </h5>
                        </div>
                        <div id="collapseFive" class="collapse show" aria-labelledby="headingFive" data-parent="#accordionExample">
                            <div class="card-body">
                                <div class="table-responsive">
                                    <table class="table table-bordered">
                                        <thead>
                                            <tr>
                                                <th>Company Name</th>
                                                <th>Indian Business Number</th>
                                                <th>Indian Company Number</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>{data.companyDetails.companyName}</td>
                                                <td>{data.companyDetails.IndianBusinessNumber}</td>
                                                <td>{data.companyDetails.IndianCompanyNumber}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="card mt-2">
                        <div class="card-header" id="headingSix">
                            <h5 class="mb-0">
                                <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapseSix" aria-expanded="true" aria-controls="collapseSix">
                                    {data.bankDetails.header}
                                </button>
                            </h5>
                        </div>
                        <div id="collapseSix" class="collapse show" aria-labelledby="headingSix" data-parent="#accordionExample">
                            <div class="card-body">
                                <div class="table-responsive">
                                    <table class="table table-bordered">
                                        <thead>
                                            <tr>
                                                <th>Bank Name</th>
                                                <th>Branch</th>
                                                <th>Account Name</th>
                                                <th>BSB</th>
                                                <th>Account Number</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>{data.bankDetails.bank}</td>
                                                <td>{data.bankDetails.branch}</td>
                                                <td>{data.bankDetails.accountName}</td>
                                                <td>{data.bankDetails.BSB}</td>
                                                <td>{data.bankDetails.accountNumber}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="card mt-2">
                        <div class="card-header" id="headingSevem">
                            <h5 class="mb-0">
                                <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapseSeven" aria-expanded="true" aria-controls="collapseSeven">
                                    {data.medicalHistory.header}
                                </button>
                            </h5>
                        </div>
                        <div id="collapseSeven" class="collapse show" aria-labelledby="headingSevem" data-parent="#accordionExample">
                            <div class="card-body">
                                <div class="table-responsive mt-2">
                                    <p>{data.medicalHistory.headerOne}</p>
                                    <table class="table table-bordered">
                                        <thead>
                                            <tr>
                                                <th>Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>{data.medicalHistory.selectOne}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>

                                <div class="table-responsive mt-2">
                                    <p>{data.medicalHistory.headerTwo}</p>
                                    <table class="table table-bordered">
                                        <thead>
                                            <tr>
                                                <th>Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>{data.medicalHistory.explainOne}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default AdminDashboard