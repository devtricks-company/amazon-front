import {
  Box,
  Grid,
  InputLabel,
  TextField,
  Typography,
  Button,
  Divider,
} from "@mui/material";
import { textTransform } from "@mui/system";
import { FC, FormEvent } from "react";
import { Link } from "react-router-dom";

const RegisterationFromCompoenet: FC = () => {
  const onSubmitHanlder = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("clicked");
  };
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
