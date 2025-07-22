import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/auth");
  };

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "#00BF63", 
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        
        <Typography
          variant="h6"
          component={NavLink}
          to="/home"
          sx={{
            textDecoration: "none",
            color: "#fff",
            fontWeight: "bold",
            fontFamily: "Montserrat, sans-serif",
            letterSpacing: 1,
          }}
        >
          ⚽ Football Manager
        </Typography>

        
        <Box sx={{ display: "flex", gap: 2 }}>
          {token && (
            <>
              <Button
                component={NavLink}
                to="/my-team"
                sx={({ isActive }) => ({
                  color: "#fff",
                  fontWeight: isActive ? "bold" : "normal",
                  textDecoration: isActive ? "underline" : "none",
                })}
              >
                My Team
              </Button>
              <Button
                component={NavLink}
                to="/transfer-market"
                sx={({ isActive }) => ({
                  color: "#fff",
                  fontWeight: isActive ? "bold" : "normal",
                  textDecoration: isActive ? "underline" : "none",
                })}
              >
                Transfer Market
              </Button>
            </>
          )}
        </Box>

        {token && (
          <Button
            color="inherit"
            onClick={handleLogout}
            sx={{
              backgroundColor: "#ffffff33",
              color: "#fff",
              "&:hover": {
                backgroundColor: "#ffffff55",
              },
              textTransform: "none",
              fontWeight: "bold",
            }}
          >
            Logout
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
