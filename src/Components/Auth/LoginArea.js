import React, { useRef, useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import { AdminContext } from "../../contexts/AdminContext";
import axios from "axios";
import swal from "sweetalert";


function LoginArea({ customClass = "" }) {
  const [visiblePassword, setVisiblePassword] = useState(false);
  const [email, setEmail] = useState("");
  const password = useRef();
  const { setAdmin, setIsAuthenticating, setTokenss } = useContext(AdminContext);

  const navigate = useNavigate();


  
  const handleLogin = (e) => {
    e.preventDefault();
    const password = e.target.password.value;
    axios
      .post(
        `https://backend.kvillagebd.com/api/v1/login`,
        {
          email,
          password,
        },
      )
      .then((res) => {
        if (res.status === 200) {
          navigate("/admin/dashboard");
          console.log('dattttaaaaaaaaaaa' , res.data)
          localStorage.setItem('setToken', res.data.accessToken);
          setTokenss(res.data?.accessToken)
          setAdmin(res.data?.user);
          setIsAuthenticating(true);
        }
      })
      .catch((err) => {
        swal({
          text: err.response.data.message,
          icon: "warning",
          button: "OK!",
          className: "modal_class_success",
        });
      });
  };




  return (
    <div
      className={"login-form "}
    >

        <h2 className=" ">Sign-In</h2>

      <form onSubmit={handleLogin}>
        <InputGroup className="mb-3 mt-5">
          <Form.Control
            aria-label="Amount (to the nearest dollar)"
            className=""
            placeholder="Enter Email"
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value.toLocaleLowerCase())}
            required
          />
        </InputGroup>

        <InputGroup className="mb-3 mt-3">
          <Form.Control
            aria-label="Amount (to the nearest dollar)"
            className=""
            placeholder="Enter Password"
            type={visiblePassword ? "text" : "password"}
            name="password"
            ref={password}
            required
          />
          <InputGroup.Text
            className=" border fs-3 bg-dark"
            onClick={() => setVisiblePassword(!visiblePassword)}
            style={{ cursor: "pointer" }}
          >
            {visiblePassword ? (
              <AiOutlineEye style={{ fontSize: "20px" }} />
            ) : (
              <AiOutlineEyeInvisible style={{ fontSize: "20px" }} />
            )}
          </InputGroup.Text>
        </InputGroup>

        <button type="submit">Login</button>
      </form>

      <div className="important-text">
        <p>
          Don't have an account? <Link to="/admin/signup">Signup now!</Link>
        </p>
      </div>
    </div>
  );
}

export default LoginArea;
