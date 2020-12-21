import React, { Component } from 'react';
import {

    Button,
    Card,
    CardBody,
    CardHeader,
    Col,
    FormGroup,
    Input,
    Label,
    Row,
    CardFooter

} from 'reactstrap';
import Axios from "axios";
import msg from 'messages.js';
class CreateFir extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            apiurl: "fir/",
            FPName: "Ahtazaz",
            SPName: "Musharraf",
            FPCNIC: "37105-5289614-9",
            SPCNIC: "36502-4289678-3",
            AgentName: "Arsalan",
            AgentCNIC: "36502-76211-5",
            AgentContact: "0331-4132041",
            StampPaperType: "Judicial / Non-Judicial",
            // RegistrarDesignation: "Clerk",
            DeedName: "5a",
            //   ,
            //     Hash: "asd",
            //   
            TehsilName: "Garden Town",
            DistrictName: "Lahore",
            Status: "pending"

        };
    }






    handlechange = event => {
        this.setState({ [event.target.name]: event.target.value });
        console.log('user state', this.state);

    };
    handlechangecheckbox = event => {

        this.setState({ [event.target.name]: event.target.checked });
        console.log('user state', this.state);

    };
    handlesubmission = () => {

        const {
            FPName,
            SPName,
            FPCNIC,
            SPCNIC,
            StampPaperType,
            DeedName,
            TehsilName,
            DistrictName,
            AgentName,
            AgentCNIC,
            AgentContact,
            Status,
        } = this.state;
        Axios.post(`${process.env.REACT_APP_Api}${this.state.apiurl}/`, {
            FPName : FPName,
            SPName : SPName,
            FPCNIC : FPCNIC,
            SPCNIC : SPCNIC,
            StampPaperType : StampPaperType,
            DeedName: DeedName,
            TehsilName: TehsilName,
            DistrictName: DistrictName,
            AgentName: AgentName,
            AgentCNIC: AgentCNIC,
            AgentContact: AgentContact,
            Status: Status
        })
            .then(response => {
                if (response.status === 201) {
                    alert(msg.firsuccess);
                    console.log(response);

                }


            })
            .catch(function (error) {
                if (error.response && error.response.status === 400) {
                    //place your reentry code
                    alert(msg.firfailed);
                }
                else {
                    alert(msg.servererror);

                }

            });

    }
    render() {
        const {
            FPName,
            SPName,
            FPCNIC,
            SPCNIC,
            AgentName,
            AgentCNIC,
            AgentContact,
            StampPaperType,
            DeedName,
            TehsilName,
            DistrictName,
        } = this.state;
        return (
            <div className="animated fadeIn">
                <Row>
                    <Col xs="12" sm="6">
                        <Card>
                            <CardHeader>
                                <strong>E-Stamp Paper Information</strong>
                                <small> Form</small>
                            </CardHeader>
                            <CardBody>
                                <Row>
                                    <Col xs="12">
                                        <FormGroup>
                                            <Label htmlFor="TehsilName">Tehsil Name</Label>
                                            <Input type="text" id="TehsilName" name="TehsilName" value={TehsilName} onChange={this.handlechange} required />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs="12">
                                        <FormGroup>
                                            <Label htmlFor="DistrictName">District Name</Label>
                                            <Input type="text" id="DistrictName" name="DistrictName" value={DistrictName} onChange={this.handlechange} required />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs="12">
                                        <FormGroup>
                                            <Label htmlFor="StampPaperType">Stamp Paper Type</Label>
                                            <Input type="text" id="StampPaperType" name="StampPaperType" value={StampPaperType} onChange={this.handlechange} required />
                                        </FormGroup>
                                    </Col>
                                </Row><Row>
                                    <Col xs="12">
                                        <FormGroup>
                                            <Label htmlFor="DeedName">Deed Name</Label>
                                            <Input type="DeedName" id="DeedName" name="DeedName" value={DeedName} onChange={this.handlechange} required />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs="12">
                                        <FormGroup>
                                            <Label htmlFor="FPName">First Party Name</Label>
                                            <Input type="FPName" id="FPName" name="FPName" value={FPName} onChange={this.handlechange} required />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs="12">
                                        <FormGroup>
                                            <Label htmlFor="FPCNIC">First Party CNIC</Label>
                                            <Input type="FPCNIC" id="FPCNIC" name="FPCNICe" value={FPCNIC} onChange={this.handlechange} required />
                                        </FormGroup>
                                    </Col>
                                </Row>


                                <Row>
                                    <Col xs="12">
                                        <FormGroup>
                                            <Label htmlFor="SPName">Second Party Name</Label>
                                            <Input type="SPName" id="SPName" name="SPName" value={SPName} onChange={this.handlechange} required />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs="12">
                                        <FormGroup>
                                            <Label htmlFor="SPCNIC">Second Party CNIC</Label>
                                            <Input type="SPCNIC" id="SPCNIC" name="SPCNICe" value={SPCNIC} onChange={this.handlechange} required />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs="12">
                                        <FormGroup>
                                            <Label htmlFor="AgentName">Agent Name</Label>
                                            <Input type="AgentName" id="AgentName" name="AgentName" value={AgentName} onChange={this.handlechange} required />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs="12">
                                        <FormGroup>
                                            <Label htmlFor="AgentCNIC">Agent CNIC</Label>
                                            <Input type="textarea" id="AgentCNIC" name="AgentCNIC" value={AgentCNIC} onChange={this.handlechange} required />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs="12">
                                        <FormGroup>
                                            <Label htmlFor="AgentContact">Agent Contact</Label>
                                            <Input type="AgentContact" id="AgentContact" name="AgentContact" value={AgentContact} onChange={this.handlechange} required />
                                        </FormGroup>
                                    </Col>
                                </Row>

                            </CardBody>
                            <CardFooter>
                                <Button type="submit" size="sm" color="primary" onClick={this.handlesubmission}><i className="fa fa-dot-circle-o"></i> Create</Button>
                            </CardFooter>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default CreateFir;
