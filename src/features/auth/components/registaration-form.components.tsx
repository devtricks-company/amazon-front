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
import { FC, FormEvent, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useInput } from "../../../hooks/input/useInput";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux/hooks";
import { validateEmail } from "../../../shared/utils/validate/email";
import {
  validateNameLength,
  ValidatePasswordLength,
} from "../../../shared/utils/validate/length";
import { register, reset } from "../authSlice";
import { NewUser } from "../models/NewUser";

const RegisterationFromCompoenet: FC = () => {
  const {
    text: name,
    textChangeHandler: nameTextChangeHandler,
    blurChangeHandler: nameBlurHandler,
    clearChangeHandler: nameClearHandler,
    shouldDisplayError: nameError,
  } = useInput(validateNameLength);

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

  const {
    text: confirmPassword,
    textChangeHandler: confirmPasswordTextChangeHandler,
    blurChangeHandler: confirmPasswordBlurHandler,
    clearChangeHandler: confirmPasswordClearHandler,
    shouldDisplayError: confirmPasswordError,
  } = useInput(ValidatePasswordLength);

  const dispatch = useAppDispatch();
  const { isLoading, isError, isSuccess } = useAppSelector(
    (state) => state.auth
  );

  const navigate = useNavigate();
  useEffect(() => {
    if (isSuccess) {
      dispatch(reset());
      clearForm();
      navigate("/signin");
    }
  }, [isSuccess, dispatch]);
  const clearForm = () => {
    nameClearHandler();
    emailClearHandler();
    passwordClearHandler();
    confirmPasswordClearHandler();
  };
  const onSubmitHanlder = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (confirmPassword !== password) return;
    if (nameError || emailError || passwordError) return;

    const newUser: NewUser = {
      name,
      email,
      password,
    };

    dispatch(register(newUser));
  };

  if (isLoading)
    return <CircularProgress sx={{ marginTop: "64px" }} color="primary" />;
  return (
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
            Create Account
          </Typography>

          <InputLabel
            sx={{ fontWeight: 500, marginTop: 1, color: "#000000" }}
            htmlFor="name"
          >
            Your Name
          </InputLabel>
          <TextField
            value={name}
            onChange={nameTextChangeHandler}
            onBlur={nameBlurHandler}
            error={nameError}
            helperText={
              nameError ? "Your name should be more than 2 characters" : ""
            }
            type="text"
            name="name"
            id="name"
            variant="outlined"
            size="small"
          />

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
              emailError ? "Email should be following the pattern of email" : ""
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

          <InputLabel
            sx={{ fontWeight: 500, marginTop: 1, color: "#000000" }}
            htmlFor="confrimPassword"
          >
            Re-enterd password
          </InputLabel>
          <TextField
            value={confirmPassword}
            onChange={confirmPasswordTextChangeHandler}
            onBlur={confirmPasswordBlurHandler}
            error={confirmPassword !== password}
            helperText={
              confirmPasswordError
                ? "confirm password must be equal to password"
                : ""
            }
            type="password"
            name="confrimPassword"
            id="confrimPassword"
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
            Register
          </Button>
        </Grid>
      </form>
      <div style={{ marginTop: "30px" }}>
        <small>
          <span>By Creating an account, you agree to Amazon's </span>
        </small>
      </div>
      <div>
        <small>
          <a href="#" style={{ textDecoration: "none" }}>
            {" "}
            Conditions of use
          </a>{" "}
          and{" "}
          <a href="#" style={{ textDecoration: "none" }}>
            Privacy Policy
          </a>
        </small>
      </div>
      <Divider sx={{ marginTop: "36px", marginBottom: "36px" }} />
      <div>
        <small>
          Already have an account?{" "}
          <Link
            to="/signin"
            style={{ textDecoration: "none", color: "#0000ee" }}
          >
            Sign-in
          </Link>
        </small>
      </div>
      <div>
        <small>
          Buying for Work?
          <a href="#" style={{ textDecoration: "none" }}>
            {" "}
            Create a free bussines account
          </a>{" "}
        </small>
      </div>
    </Box>
  );
};

export default RegisterationFromCompoenet;
