import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchMyTeam } from "../team/teamSlice";
import { setIsNewUser } from "../auth/authSlice";
import { Box, Typography, CircularProgress } from "@mui/material";

const HomePage = () => {
  const dispatch = useDispatch();
  const { team, loading, error } = useSelector((state) => state.team);
  const { isNewUser } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isNewUser) {
      const timerId = setTimeout(() => {
        dispatch(fetchMyTeam());
        dispatch(setIsNewUser(false));
      }, 5000);

      return () => clearTimeout(timerId);
    } else {
      dispatch(fetchMyTeam());
    }
  }, [dispatch, isNewUser]);

  if (loading)
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="50vh"
      >
        <CircularProgress sx={{ color: "#51C452" }} />
      </Box>
    );

  if (error)
    return (
      <Typography color="error" textAlign="center" mt={4}>
        {error}
      </Typography>
    );

  if (!team)
    return (
      <Typography textAlign="center" mt={4}>
        No team found or still being created...
      </Typography>
    );

  return (
    <Box
      p={4}
      sx={{
        background: "#f5f5f5",
        borderRadius: "16px",
        maxWidth: "800px",
        margin: "40px auto",
        boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Typography
        variant="h3"
        fontWeight="bold"
        color="#51C452"
        gutterBottom
        textAlign="center"
      >
        Welcome, {team.name}!
      </Typography>

      <Typography
        variant="h5"
        fontWeight="500"
        textAlign="center"
        gutterBottom
      >
        💰 Current Budget:{" "}
        <span style={{ color: "#51C452", fontWeight: "600" }}>
          ${team.budget}
        </span>
      </Typography>
    </Box>
  );
};

export default HomePage;
