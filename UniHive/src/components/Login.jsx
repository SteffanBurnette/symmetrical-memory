import React from "react";
import Button from "@mui/material/Button";

function Login() {
  return (
    <>
      <Button
        variant="outlined"
        sx={{
          my: 10,
          px:8,
          borderWidth: "2px",
          marginRight: 20,
          color: "#FBCB1C",
          borderColor: "#FBCB1C",
          "&:hover": {
            color: "black",
            borderColor: "#FBCB1C",
            backgroundColor: "#FBCB1C",
            borderWidth: "2px",
          },
        }}
      >
        Login
      </Button>
    </>
  );
}

export default Login;
