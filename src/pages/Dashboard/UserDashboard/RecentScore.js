import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { Table } from "react-bootstrap";

const RecentOrders = () => {
  const [allOrder, setAllOrder] = useState([]);
  const refetchOrder = async () => {
    await axios.get("https://backend.kvillagebd.com/api/v1/financial-data").then((res) => {
      if (res.status === 200) {
        setAllOrder(res.data);
      } else {
        return <p>There's an error found.</p>;
      }
    });
  };

  useEffect(() => {
    refetchOrder();
  }, [allOrder.length === 0]);



  return (
    <div className="productBody">
      <h5 className="text-white-50 text-start pt-5 pb-3">Recently Checked</h5>
      <div className="productCard py-2">
        <div className="tableNormal ">
          <Table className="text-white-50 productDataTable ">
            <thead>
              <tr>
                <th className="">Email</th>
                <th className="">Year</th>
                <th className="">Month</th>
                <th className="">Score</th>
              </tr>
            </thead>
            <tbody>
            {allOrder?.slice(0, 9).map((category) => ( <tr key={category._id}>
                  <td>{category.email}</td>
                  <td>{category.year}</td>
                  <td>{category.month}</td>
                  <td>{category.score}</td>

            </tr>
            ))}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default RecentOrders;
