import {
  Box,
  Grid,
  InputLabel,
  TextField,
  Typography,
  Button,
  Divider,
  CircularProgress,
} from "@mui/material";
import { textTransform } from "@mui/system";
import { FC, FormEvent, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useInput } from "../../../hooks/input/useInput";
import { validateEmail } from "../../../shared/utils/validate/email";
import { ValidatePasswordLength } from "../../../shared/utils/validate/length";
import { NewUser } from "../models/NewUser";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux/hooks";
import { login, jwtVerify, reset, logout } from "../authSlice";
import { LoginUser } from "../models/LoginUser.interface";

const SignInFormComponent: FC = () => {
  const dispatch = useAppDispatch();
  const { isLoading, isAuthentication, isSuccess } = useAppSelector(
    (state) => state.auth
  );
  const navigate = useNavigate();
  const clearForm = () => {
    emailClearHandler();
    passwordClearHandler();
  };
  useEffect(() => {
    if (isSuccess) {
      dispatch(reset());
      clearForm();
    }
  }, [isSuccess, dispatch]);

  useEffect(() => {
    if (!isAuthentication) return;
    navigate("/");
  }, [isAuthentication]);

  const {
    text: email,
    textChangeHandler: emailTextChangeHandler,
    blurChangeHandler: emailBlurHandler,
    clearChangeHandler: emailClearHandler,
    shouldDisplayError: emailError,
  } = useInput(validateEmail);

  const {
    text: password,
    textChangeHandler: passwordTextChangeHandler,
    blurChangeHandler: passwordBlurHandler,
    clearChangeHandler: passwordClearHandler,
    shouldDisplayError: passwordError,
  } = useInput(ValidatePasswordLength);
  const onSubmitHanlder = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (emailError || passwordError) return;

    const user: LoginUser = {
      email,
      password,
    };

    dispatch(login(user));
  };
  if (isLoading)
    return <CircularProgress sx={{ marginTop: "64px" }} color="primary" />;

  return (
    <>
      <Box
        sx={{
          border: 1,
          padding: 2,
          borderColor: "#cccccc",
          width: "350px",
          marginTop: 2,
        }}
      >
        <form onSubmit={onSubmitHanlder}>
          <Grid container direction="column" justifyContent="flex-start">
            <Typography variant="h4" component="h1">
              Sign In Account
            </Typography>

            <InputLabel
              sx={{ fontWeight: 500, marginTop: 1, color: "#000000" }}
              htmlFor="email"
            >
              Email
            </InputLabel>
            <TextField
              value={email}
              onChange={emailTextChangeHandler}
              onBlur={emailBlurHandler}
              error={emailError}
              helperText={
                emailError
                  ? "Email should be following the pattern of email"
                  : ""
              }
              type="email"
              name="email"
              id="email"
              variant="outlined"
              size="small"
            />

            <InputLabel
              sx={{ fontWeight: 500, marginTop: 1, color: "#000000" }}
              htmlFor="password"
            >
              Password
            </InputLabel>
            <TextField
              value={password}
              onChange={passwordTextChangeHandler}
              onBlur={passwordBlurHandler}
              error={passwordError}
              helperText={
                passwordError ? "password should be more than 6 characters" : ""
              }
              type="password"
              name="password"
              id="password"
              variant="outlined"
              size="small"
            />

            <Button
              type="submit"
              variant="contained"
              style={{
                marginTop: "16px",
                height: "31px",
                backgroundColor: "#f0c14b",
                color: "black",
                borderColor: "#a88734 #9c7e31 ##846a29",
                textTransform: "none",
              }}
            >
              Sign In
            </Button>
          </Grid>
        </form>
      </Box>
      <div style={{ marginTop: "16px" }}>
        <Divider>
          <div>
            <small>
              <span style={{ color: "#767676" }}>New To Amazon? </span>
            </small>
          </div>
        </Divider>
        <Link
          to="/register"
          style={{ textDecoration: "none", color: "#0000ee" }}
        >
          <Button
            variant="contained"
            style={{
              marginTop: "12px",
              height: "31px",
              backgroundColor: "#f1f1f1",
              color: "black",
              borderColor: "#a88734 #9c7e31 ##846a29",
              textTransform: "none",
              width: "100%",
            }}
          >
            Register
          </Button>
        </Link>
      </div>
    </>
  );
};

export default SignInFormComponent;
