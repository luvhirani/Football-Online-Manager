import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTransferList, buyPlayer} from "./transferSlice";
import {
  Box,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  Alert,
} from "@mui/material";
import { toast } from "react-toastify";

const TransferMarketPage = () => {
  const dispatch = useDispatch();
  const { players, loading, error, buySuccess } = useSelector(
    (state) => state.transfer
  );

  const [teamName, setTeamName] = useState("");
  const [playerName, setPlayerName] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  useEffect(() => {
    dispatch(fetchTransferList({}));
  }, [dispatch]);

  const handleSearch = () => {
    dispatch(fetchTransferList({ teamName, playerName, maxPrice }));
  };

  const handleReset = () => {
    setTeamName("");
    setPlayerName("");
    setMaxPrice("");
    dispatch(fetchTransferList({}));
  };

  const handleBuy = (playerId) => {
    dispatch(buyPlayer({ playerId }))
      .unwrap()
      .then(() => {
        toast.success("Player bought successfully");
        dispatch(fetchTransferList({ teamName, playerName, maxPrice }));
      })
      .catch((err) => {
        toast.error(err || "Failed to buy player");
      });
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        padding: 4,
      }}
    >
      <Typography
        variant="h3"
        gutterBottom
        sx={{
          color: "#48b774",
          fontWeight: 700,
          textAlign: "center",
          mb: 4,
        }}
      >
        Transfer Market
      </Typography>

      <Box
        display="flex"
        gap={2}
        flexWrap="wrap"
        justifyContent="center"
        mb={3}
      >
        <TextField
          label="Team Name"
          variant="outlined"
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
          size="small"
        />
        <TextField
          label="Player Name"
          variant="outlined"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
          size="small"
        />
        <TextField
          label="Max Price"
          variant="outlined"
          type="number"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          size="small"
        />
        <Button
          variant="contained"
          sx={{ backgroundColor: "#48b774", color: "white" }}
          onClick={handleSearch}
        >
          Search
        </Button>
        <Button variant="outlined" color="success" onClick={handleReset}>
          Reset
        </Button>
      </Box>

      {error && (
        <Box mb={2} display="flex" justifyContent="center">
          <Alert severity="error">{error}</Alert>
        </Box>
      )}
      {buySuccess && (
        <Box mb={2} display="flex" justifyContent="center">
          <Alert severity="success">{buySuccess}</Alert>
        </Box>
      )}

      {loading ? (
        <Typography textAlign="center" mt={4}>
          Loading...
        </Typography>
      ) : (
        <Box
          display="flex"
          flexWrap="wrap"
          gap={3}
          justifyContent="center"
          mt={2}
        >
          {players.map((player) => (
            <Card
              key={player._id}
              sx={{
                width: 280,
                backgroundColor: "#f9fdfb",
                border: "1px solid #e0f2e9",
                boxShadow: "0 4px 8px rgba(0,0,0,0.05)",
                transition: "0.3s",
                "&:hover": {
                  boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
                  backgroundColor: "#e8f5ee",
                },
              }}
            >
              <CardContent>
                <Typography variant="h6" color="#2e7d32">
                  {player.name}
                </Typography>
                <Typography variant="body2">
                  Position: {player.position}
                </Typography>
                {player.currentTeam && (
                  <Typography variant="body2">
                    Owned By: {player.currentTeam.name || "Unknown Team"}
                  </Typography>
                )}
                <Typography variant="body2">
                  Asking Price: ${player.askingPrice}
                </Typography>
                <Button
                  variant="contained"
                  fullWidth
                  sx={{
                    mt: 2,
                    backgroundColor: "#48b774",
                    color: "white",
                    "&:hover": {
                      backgroundColor: "#3aa862",
                    },
                  }}
                  onClick={() => handleBuy(player._id)}
                >
                  Buy
                </Button>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default TransferMarketPage;
