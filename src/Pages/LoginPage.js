import React from "react";
import makeToast from "../Toaster";
import axios from "axios";
import { withRouter } from "react-router-dom";

const LoginPage = (props) => {
  const emailRef = React.createRef();
  const passwordRef = React.createRef();

  const loginUser = () => {
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    // https://testanrchat.vercel.app/login
    axios
      .post("http://3.140.211.197/api/v1/admin/login", { ///api/v1/admin/login
        email,
        password,
      })
      .then((response) => {
        makeToast("success", "logined");
        localStorage.setItem("CC_Token", response.data.token);
        // debugger
         props.history.push("/dashboard");
        // props.setupSocket();
      })
      .catch((err) => {
        // console.log(err);
        // debugger
        if (
          err &&
          err.response

          // err.response.data &&
          // err.response.data.message
        )
          makeToast("error", "err.response.data.message");
      });
  };

  return (
    <div className="card">
      <div className="cardHeader">Login</div>
      <div className="cardBody">
        <div className="inputGroup">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="abc@example.com"
            ref={emailRef}
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Your Password"
            ref={passwordRef}
          />
        </div>
        <button onClick={loginUser}>Login</button>
      </div>
    </div>
  );
};

export default withRouter(LoginPage);
