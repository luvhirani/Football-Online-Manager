import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchMyTeam, listPlayer, unlistPlayer } from "./teamSlice";
import {
  Typography,
  Box,
  Card,
  CardContent,
  Button,
  TextField,
} from "@mui/material";

const TeamPage = () => {
  const dispatch = useDispatch();
  const { team, loading, error } = useSelector((state) => state.team);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [askingPrice, setAskingPrice] = useState("");

  useEffect(() => {
    dispatch(fetchMyTeam());
  }, [dispatch]);

  const handleListClick = (player) => {
    setSelectedPlayer(player);
    setAskingPrice("");
  };

  const handleConfirmList = () => {
    if (selectedPlayer) {
      dispatch(listPlayer({ playerId: selectedPlayer._id, askingPrice }));
      setSelectedPlayer(null);
    }
  };

  const handleUnlist = (playerId) => {
    dispatch(unlistPlayer({ playerId }));
  };

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;
  if (!team) {
    return <Typography>No team found or still being created...</Typography>;
  }

  return (
    <Box p={2}>
      <Typography variant="h4">{team.name}</Typography>
      <Typography variant="h6">Budget: ${team.budget}</Typography>

      <Box display="flex" flexWrap="wrap" gap={2} mt={2}>
        {team.players.map((player) => (
          <Card key={player._id} sx={{ width: "250px" }}>
            <CardContent>
              <Typography variant="h6">{player.name}</Typography>
              <Typography>Position: {player.position}</Typography>
              <Typography>
                Transfer Listed: {player.isTransferListed ? "Yes" : "No"}
              </Typography>
              {player.isTransferListed && (
                <Typography>Asking Price: ${player.askingPrice}</Typography>
              )}
              {!player.isTransferListed ? (
                <Button
                  variant="outlined"
                  onClick={() => handleListClick(player)}
                  sx={{ mt: 1 }}
                >
                  List for Transfer
                </Button>
              ) : (
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => handleUnlist(player._id)}
                  sx={{ mt: 1 }}
                >
                  Unlist
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </Box>

      {selectedPlayer && (
        <Box
          position="fixed"
          top={0}
          left={0}
          width="100%"
          height="100%"
          bgcolor="rgba(0,0,0,0.4)"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Box
            bgcolor="#fff"
            p={4}
            borderRadius={2}
            minWidth="300px"
            display="flex"
            flexDirection="column"
            gap={2}
          >
            <Typography variant="h6">Set Asking Price</Typography>
            <TextField
              label="Asking Price"
              type="number"
              value={askingPrice}
              onChange={(e) => setAskingPrice(e.target.value)}
            />
            <Box display="flex" gap={2}>
              <Button variant="contained" onClick={handleConfirmList}>
                Confirm
              </Button>
              <Button
                variant="outlined"
                color="error"
                onClick={() => setSelectedPlayer(null)}
              >
                Cancel
              </Button>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default TeamPage;
