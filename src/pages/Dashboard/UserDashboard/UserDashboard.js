import { useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./UserDashboard.css";
import { FaUsers } from "react-icons/fa";
import { MdCategory } from "react-icons/md";
import axios from "axios";
import RecentScore from "./RecentScore";
import MonthlySellGraph from "./MonthlySellGraph";
import { Button } from "@mui/material";


const UserDashboard = () => {
  const [customers, setCustomers] = useState([]);
  const [financial, setFinancial] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("https://backend.kvillagebd.com/api/v1/financial-data").then((res) => {
      setFinancial(res.data);
    });
  }, []);

  useEffect(() => {
    axios.get("https://backend.kvillagebd.com/api/v1/get/all").then((res) => {
      setCustomers(res.data.data);
    });
  }, []);
  

  const handleClickOpenCustomers = () => {
    navigate("/admin/dashboard");
    window.scrollTo(0, 0);
  };
 
  const handleClickOpenfinancial = () => {
    navigate("/admin/financial-data");
    window.scrollTo(0, 0);
  };

  



  return (
    <div>
      <div className="container px-0">
        <h5 className="text-white text-start pb-3">DASHBOARD</h5>
        <Row className="g-5">
          <Col xs={12} md={6} lg={4} xl={3} onClick={handleClickOpenCustomers}>
            <Card className="cardDash " style={{ borderRadius: "20px" }}>
              <Card.Body className="d-flex align-items-center justify-content-between">
                <Card.Text className="dashboardTxt">
                  <p>Users</p>
                  <h2 className="text-start">{customers.length}</h2>
                </Card.Text>
                <div className="iconDas">
                  <p className="text-white coinsIcon ">
                    <FaUsers />
                  </p>
                </div>
              </Card.Body>
            </Card>
          </Col>

          <Col xs={12} md={6} lg={4} xl={3} onClick={handleClickOpenfinancial}>
            <Card className="cardDash " style={{ borderRadius: "20px" }}>
              <Card.Body className="d-flex align-items-center justify-content-between">
                <Card.Text className="dashboardTxt">
                  <p>Data Recorded</p>
                  <h2 className="text-start">{financial.length}</h2>
                </Card.Text>
                <div className="iconDas">
                  <p className="text-white coinsIcon ">
                    <MdCategory />
                  </p>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <div className="mt-5">
        <Button
            variant="contained"
            xs={{ size: "large" }}
            sx={{ mt: "1rem", mb: "2rem" }}
            style={{ background: '#6958BE' }}
            onClick={handleClickOpenfinancial}
          >
            Check Your Financial Health Score
          </Button>
          <MonthlySellGraph />
        </div>
        <RecentScore />

      </div>
    </div>
  );
};

export default UserDashboard;
