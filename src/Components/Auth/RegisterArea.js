import React, { useState, useRef, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {  AiOutlineEyeInvisible , AiOutlineEye} from 'react-icons/ai';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import { AdminContext } from "../../contexts/AdminContext";

function RegisterArea() {
  const [visiblePassword, setVisiblePassword] = useState(false);
  const name = useRef();
  const email = useRef();
  const password = useRef();
  const [passwordShown, setPasswordShown] = useState(false);
  const [message, setMessage] = useState(null);

  const { activationToken, isAuthenticating, SignUp } = useContext(AdminContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticating) {
      navigate(`/admin/otp/${activationToken}`, { replace: true });
    }
  
  }, [ navigate, isAuthenticating, activationToken]);


  const handleRegistration = (e) => {
    e.preventDefault();
    const password = e.target.password.value;
    const email = e.target.email.value;
    const name = e.target.name.value;

    console.log(name, email, password)
    SignUp(name, email, password);
  };


  return (
    <div className="register-form">
      {message &&
        (Array.isArray(message) ? (
          <div className="alert alert-danger" role="alert">
            <ul className="errors" style={{ marginBottom: 0 }}>
              {message.map((msg) => (
                <li key={msg} className="error">
                  {msg}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className={`alert alert-success`} role="alert">
            {message}
          </div>
        ))}
      <h2>Sign-Up</h2>

      <form onSubmit={handleRegistration}>
        
        <InputGroup className="mb-3 mt-3">
          <Form.Control aria-label="Amount (to the nearest dollar)" 
            className='' 
            placeholder='Name' 
            type="text" 
            name="name" 
            ref={name}
            required />
        </InputGroup>

        <InputGroup className="mb-3 mt-3">
          <Form.Control aria-label="Amount (to the nearest dollar)" 
            className='' 
            placeholder='Enter Email' 
            type="email" 
            name="email" 
            ref={email}
            required />
        </InputGroup>


        <InputGroup className="mb-3 mt-3">
          <Form.Control aria-label="Amount (to the nearest dollar)" 
          className='' 
          placeholder='Enter Password' 
           type={visiblePassword ? "text" : "password"} 
          name="password" 
          ref={password}
          required />
          <InputGroup.Text 
            className=' border fs-3 bg-dark'
            onClick={() => setVisiblePassword(!visiblePassword)}
            style={{ cursor: 'pointer' }}
          >{
            visiblePassword ? (
              <AiOutlineEye style={{ fontSize: '20px' }} />
            ) : (
              <AiOutlineEyeInvisible style={{ fontSize: '20px' }} />
            )
          }
          </InputGroup.Text>
        </InputGroup>

        <div className="row align-items-center">
          <div className="col-lg-6 col-md-6 col-sm-6">
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="checkme"
                onChange={() => setPasswordShown(!passwordShown)}
              />
              <label className="form-check-label" htmlFor="checkme">
                Show password?
              </label>
            </div>
          </div>
        </div>

        <button type="submit">Signup now</button>
      </form>

      <div className="important-text">
        <p>
          Already have an account? <Link to="/admin/login">Signin now!</Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterArea;
