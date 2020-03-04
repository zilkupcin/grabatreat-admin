import React, { useState } from "react";
import { Redirect, withRouter } from "react-router-dom";
import Parse from "parse";
import { login } from "../../api/parseCloud";
import Button from "../buttons/Button";
import Fade from "react-reveal";

const Login = withRouter(({ history }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState();

  const handleLoginSubmit = async e => {
    setIsLoading(true);
    e.preventDefault();
    try {
      const sessionToken = await login(username, password);
      await Parse.User.become(sessionToken);
      history.push("/");
    } catch (e) {
      setLoginError(e.message);
      setIsLoading(false);
    }
  };

  const handleInputChange = e => {
    const inputName = e.target.name;
    const inputValue = e.target.value;

    //Reset error
    setLoginError(undefined);

    if (inputName === "username") {
      setUsername(inputValue);
    } else {
      setPassword(inputValue);
    }
  };

  const LoginError = () => {
    return (
      <Fade>
        <span className="form-error">{loginError}</span>
      </Fade>
    );
  };

  if (Parse.User.current()) {
    return <Redirect to="/" />;
  }

  return (
    <div className="column full-height">
      <div className="login">
        <div className="box login-box">
          <div className="login-box__header">
            <img
              src={require("../../images/screen_logo.png")}
              className="logo"
              alt="logo"
            />
            <h1 className="app-name">Grab a Treat</h1>
          </div>
          <h3 className="login-box__subtitle">Login to Admin Dashboard</h3>
          <form className="login-form" onSubmit={handleLoginSubmit}>
            <input
              className="login-form__input-username"
              name="username"
              placeholder="Username"
              type="username"
              value={username}
              onChange={handleInputChange}
            />
            <input
              className="login-form__input-password"
              name="password"
              placeholder="Password"
              type="password"
              value={password}
              onChange={handleInputChange}
            />
            {loginError && <LoginError />}
            <Button
              className="action-btn"
              title="Login"
              isLoading={isLoading}
            />
          </form>
        </div>
      </div>
      <div className="copyright">
        <h3 className="copyright__text">
          © 2019 Gudekoi Ltd. All Rights Reserved
        </h3>
      </div>
    </div>
  );
});

export default Login;
