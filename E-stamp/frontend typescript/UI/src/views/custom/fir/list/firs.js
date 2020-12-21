import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Badge, Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';
import Axios from 'axios';
import msg from 'messages.js';
function UserRow(props) {
  const fir = props.fir
  const firdetails = `/listalldata/${fir._id}`

  const getBadge = (status) => {
    return status.toLowerCase() === 'approved' ? 'success' :
      status.toLowerCase() === 'inactive' ? 'secondary' :
        status.toLowerCase() === 'pending' ? 'warning' :
          // status.toLowerCase() === 'Banned' ? 'danger' :
          'primary'
  }

  return (

    <tr key={fir._id.toString()}>

      <td><Link to={firdetails}>{fir.TehsilName}</Link></td>
      <td>{fir.DistrictName}</td>
      <td>{fir.DeedName}</td>
      <td>{fir.StampPaperType}</td>
      <td>{fir.AgentName}</td>
      <td>{fir.AgentCNIC}</td>
      <td>{fir.AgentContact}</td>
      <td>{fir.FPName}</td>
      <td>{fir.FPCNIC}</td>
      <td>{fir.SPName}</td>
      <td>{fir.SPCNIC}</td>
      <td>{fir.Status}</td>


      <td><Badge color={getBadge(fir.Status)}>{fir.Status}</Badge>  </td>
    </tr>
  )
}

class Firs extends React.Component {
  state = {
    apiurl: "fir/",
    firdata: [],
  };
  componentDidMount() {
    Axios.get(`${process.env.REACT_APP_Api}${this.state.apiurl}/`)
      .then(response => {
        if (response.status === 200) {
          this.setState({ firdata: response.data.firs });
          console.log("firlist", response);

        }


      })
      .catch(function (error) {
        if (error.response && error.response.status === 500) {
          //place your reentry code
          console.log(msg.servererror);

        }
        else {
          console.log(msg.servererror);

        }

      });

  }
  render() {



    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={12}>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> All <small className="text-muted">E-stamps</small>
              </CardHeader>
              <CardBody>
                <Table responsive hover>
                  <thead>
                    <tr>
                      {/* <th scope="col">id</th> */}
                      <th scope="col">Tehsil Name</th>
                      <th scope="col">District Name</th>
                      <th scope="col">Deed Name</th>
                      <th scope="col">Stamp Paper Type</th>
                      <th scope="col">Agent Name</th>
                      <th scope="col">Agnet CNIC</th>
                      <th scope="col">Agent Contact</th>
                      <th scope="col">First Party Name</th>
                      <th scope="col">First Party CNIC</th>
                      <th scope="col">Second Party Name</th>
                      <th scope="col">Second Party CNIC</th>
                      <th scope="col">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.firdata.map((fir, index) =>
                      <UserRow key={index} fir={fir} />
                    )}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Firs;
