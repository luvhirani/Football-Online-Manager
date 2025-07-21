import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginOrRegister } from "./authSlice";
import { useNavigate } from "react-router-dom";

import {
  Box,
  Button,
  TextField,
  Typography,
  CircularProgress,
  Paper,
} from "@mui/material";

const AuthPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, token } = useSelector((state) => state.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (token) {
      navigate("/my-team");
    }
  }, [token, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(loginOrRegister({ email, password })).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        navigate("/home");
      }
    });
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
      }}
    > 
      <Paper
        elevation={8}
        sx={{
          p: 4,
          maxWidth: 400,
          width: "100%",
          bgcolor: "rgba(255, 255, 255, 0.95)",
          borderRadius: 3,
          textAlign: "center",
        }}
      >
        <Typography
          variant="h4"
          mb={3}
          fontWeight="bold"
          sx={{ color: "#009254" }}
        >
          Kick Off Your Fantasy Team
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit}
          display="flex"
          flexDirection="column"
          gap={2}
        >
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && (
            <Typography color="error" variant="body2">
              {error}
            </Typography>
          )}
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              bgcolor: "#009254",
              "&:hover": {
                bgcolor: "#007b44",
              },
              color: "white",
              py: 1.2,
              fontWeight: "bold",
            }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} sx={{ color: "#fff" }} /> : "Login / Register"}
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default AuthPage;
