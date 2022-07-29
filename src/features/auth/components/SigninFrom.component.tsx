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

const SignInFormComponent: FC = () => {
  const onSubmitHanlder = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("clicked");
  };
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
