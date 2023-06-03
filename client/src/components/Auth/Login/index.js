import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Input from "../Input";
import { useFormValidation } from "../../../lib/hooks/useFormValidation";
import useAuthentication from "../../../lib/hooks/useAuthentication";
import { useDispatch, useSelector } from "react-redux";

const Alert = ({ isVisible }) =>
  isVisible && (
    <div className="alert alert-info mt-3">
      <p className="icontext">
        <i className="icon text-primary fa fa-thumbs-up"></i>User successfully
        connected
      </p>
    </div>
  );
const ErrorMessage = ({ error }) =>
  error && (
    <div className="alert alert-danger mt-3">
      <p className="icontext]" style={{ color: "crimson" }}>
        <i className="icon text-danger fas fa-exclamation-circle"></i>{" "}
        {error?.error}
      </p>
    </div>
  );

const defaultValues = {
  email: "toto@gmail.com",
  password: "password",
};
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loginEmailPassword } = useAuthentication(dispatch);
  const { user, error } = useSelector((state) => state.user);
  const { formValues, validate, register, handleOnChange, isValid } =
    useFormValidation({ formName: "login", defaultValues });
  const { email, password } = formValues["login"] ?? {};

  useEffect(() => {
    validate(formValues["login"] ?? {});
  }, [validate, formValues]);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const user = { email, password };
    loginEmailPassword(user).then(
      (user) => user && setTimeout(() => navigate("/"), 2000)
    );
  };

  return (
    <>
      <div
        className="card mx-auto"
        style={{ maxWidth: "380px", marginTop: "200px" }}
      >
        <div className="card-body">
          <h4 className="card-title mb-4">Sign in</h4>
          <ErrorMessage error={error} />
          <Alert isVisible={!!user} />
          <form name="login" onSubmit={handleOnSubmit}>
            {/* 
          <a href="#" className="btn btn-facebook btn-block mb-2"> <i className="fab fa-facebook-f"></i> &nbsp  Sign in with Facebook</a>
          <a href="#" className="btn btn-google btn-block mb-4"> <i className="fab fa-google"></i> &nbsp  Sign in with Google</a> 
          */}
            <div className="form-group" style={{ marginBottom: 0 }}>
              <Input.Email
                label="Email"
                style={{ padding: 0 }}
                onChange={handleOnChange}
                value={email}
              />
            </div>
            <div className="form-group">
              <Input.Password
                label="Password"
                name="password"
                style={{ padding: 0 }}
                onChange={handleOnChange}
                value={password}
              />
            </div>
            <div className="form-group">
              <Input.Checkbox col="6">Remember</Input.Checkbox>
            </div>
            <div className="form-group">
              <Input.Submit
                classNames="btn-primary btn-block"
                title="Login"
                disabled={!isValid}
              />
            </div>
          </form>
        </div>
      </div>
      <p className="text-center mt-4">
        Don't have account? <Link to="/register">Sign Up</Link>
      </p>
      <br />
      <br />
    </>
  );
};
export default Login;
