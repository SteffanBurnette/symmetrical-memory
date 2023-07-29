import React from "react";
import Button from "@mui/material/Button";

function Login() {
  return (
    <>
      <Button
        variant="outlined"
        sx={{
          my: 10,
          marginRight: 10,
          color: "#FBCB1C",
          borderColor: "#FBCB1C",
          "&:hover": {
            color: "black",
            borderColor: "#FBCB1C",
            backgroundColor: "#FBCB1C",
          },
        }}
      >
        Login
      </Button>
    </>
  );
}

export default Login;
