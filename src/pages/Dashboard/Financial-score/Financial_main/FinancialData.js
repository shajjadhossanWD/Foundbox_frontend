import React, { useEffect, useState } from "react";
import { Button, Modal, Box, Tooltip } from "@mui/material";
import Table from "react-bootstrap/Table";
import swal from "sweetalert";
import axios from "axios";
import "./FinancialModal.css";
import { AdminContext } from "../../../../contexts/AdminContext";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};



const FinancialData = () => {
  const [open, setOpen] = React.useState(false);
  const [income, setIncome] = useState();
  const [expenses, setexpenses] = useState();
  const [debts, setdebts] = useState();
  const [assets, setassets] = useState();
  const [month, setmonth] = useState("");
  const [year, setyear] = useState("");
  const [financialData, setFinancialData] = useState([]);
  const { admin } = React.useContext(AdminContext);


  const getFinancial = () => {
    fetch(`https://backend.kvillagebd.com/api/v1/financial-data/${admin?.email}`)
      .then((res) => res.json())
      .then((data) => {
        setFinancialData(data);
        if (data)
          data.forEach((data) => {
          });
      });
  };

  useEffect(() => {
    getFinancial();
  }, []);

  const headers = {
    'Authorization': `${localStorage.getItem('setToken')}`
  };

  //post new financial data
  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post("https://backend.kvillagebd.com/api/v1/financial-data/", { income, expenses, debts, assets, month, year  }, {headers})
      .then((res) => {
        if (res.status === 200) {
          console.log('submitted dataaaaaa : ' , res.data)
          swal({
            title: "Your Financial Score : ",
            text: `${res.data.score}`,
            icon: "success",
            button: "OK!",
            className: "modal_class_success",
          });
          handleClose();
          getFinancial();
        }
      })
      .catch((error) => {
        swal({
          title: "Attention",
          text: error.response.data.message,
          icon: "warning",
          button: "OK!",
          className: "modal_class_success",
        });
      });
  };


  const deleteWarning = (category) => {
    swal({
      title: "Are you sure to delete " + category.name + "?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        alert('deleted')
      } else {
        swal("Your imaginary file is safe!");
      }
    });
  };


  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <h5 className="text-white text-start text-uppercase pt-1">FINANCIAL HEALTH</h5>
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box className="modalBg text-white" sx={style}>

            <div className="text-start d-flex justify-content-between">
              <h4 className="text-white text-uppercase text-start py-2 ">
              Check Health
              </h4>
              <span className="p-1 crossButton"
                onClick={handleClose}
                style={{ cursor: 'pointer' }}>X</span>
            </div>

            <div className="my-3 pb-2">
              <hr />
            </div>
            <form id="contactForm" className="form" onSubmit={handleSubmit}>
              <div className="">
                <div className="form-group">
                <lable className="mt-2">Income</lable>
                  <input
                    type="number"
                    name="income"
                    id="income"
                    className="form-control ps-2"
                    style={{ paddingLeft: "0" }}
                    required
                    min="0"
                    data-error="Please enter your monthly income"
                    placeholder="00"
                    value={income}
                    onChange={(e) => setIncome(e.target.value)}
                  />
                  
                <lable className="mt-2">Expenses</lable>
                  <input
                    type="number"
                    name="expenses"
                    id="expenses"
                    min="0"
                    className="form-control ps-2"
                    style={{ paddingLeft: "0" }}
                    required
                    data-error="Please enter your monthly expenses"
                    placeholder="00"
                    value={expenses}
                    onChange={(e) => setexpenses(e.target.value)}
                  />

                <lable className="mt-2">Debts</lable>
                  <input
                    type="number"
                    name="debts"
                    id="debts"
                    min="0"
                    className="form-control ps-2"
                    style={{ paddingLeft: "0" }}
                    required
                    data-error="Please enter your debts"
                    placeholder="00"
                    value={debts}
                    onChange={(e) => setdebts(e.target.value)}
                  />


                 <lable className="mt-2">Assets</lable>
                  <input
                    type="number"
                    name="assets"
                    min="0"
                    id="assets"
                    className="form-control ps-2"
                    style={{ paddingLeft: "0" }}
                    required
                    data-error="Please enter your assets"
                    placeholder="00"
                    value={assets}
                    onChange={(e) => setassets(e.target.value)}
                  />

                 <lable className="mt-2">Year</lable>
                  <input
                    type="text"
                    name="year"
                    id="year"
                    className="form-control ps-2"
                    style={{ paddingLeft: "0" }}
                    required
                    placeholder="2023"
                    value={year}
                    onChange={(e) => setyear(e.target.value)}
                  />

                 <lable className="mt-2">Month</lable>
                  <input
                    type="text"
                    name="month"
                    id="month"
                    className="form-control ps-2"
                    style={{ paddingLeft: "0" }}
                    required
                    placeholder="January"
                    value={month}
                    onChange={(e) => setmonth(e.target.value)}
                  />

                  <div className="help-block with-errors"></div>
                </div>
              </div>
              <div className="my-3 pb-2">
                <hr />
              </div>
              <div className="mt-3 d-flex justify-content-center gap-1 text-center mt-2 modalFooter">
                <button
                  type="button"
                  className="adminBtnAdd11 btn btn-danger"
                  onClick={handleClose}
                >
                  CANCEL
                </button>
                <button type="submit" className="adminBtnAdd btn btn-success">
                  ADD
                </button>
              </div>
            </form>
          </Box>
        </Modal>
      </div>
      <div className="productCard pb-2">
        <div className="d-flex flex-column flex-row mb-3 justify-content-lg-between align-items-center">
          <Button
            variant="contained"
            xs={{ size: "large" }}
            sx={{ mt: "1rem", mb: "2rem" }}
            style={{ background: '#6958BE' }}
            onClick={handleOpen}
          >
            Check Financial Health
          </Button>
        </div>
        <Table style={{ color: "white" }}>
          <thead>
            <tr>
              <th>Email</th>
              <th>Month</th>
              <th>Score</th>
              <th className="text-end">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {financialData?.map((financial) => (
                <tr key={financial._id}>
                  <td>{financial.email}</td>
                  <td>{financial.month}</td>
                  <td>{financial.score}</td>

                  <td>
                    <div className="text-end">
                      <Tooltip title="Update financial." placement="top">
                        <button
                          type="button"
                          className="editBtn"
                        >
                          <i className="fas fa-edit"></i>
                        </button>
                      </Tooltip>
                      <Tooltip title="Delete financial." placement="top">
                        <button
                          className="deleteBtn"
                          onClick={() => {
                            deleteWarning(financial);
                          }}
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      </Tooltip>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>

      </div>
    </>
  );
};

export default FinancialData;
