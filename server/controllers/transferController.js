const Player = require("../models/player");
const Team = require("../models/Team");

exports.getTransferList = async (req, res) => {
  try {
    const { teamName, playerName, maxPrice } = req.query;
    const userId = req?.user?.userId;

    const userTeam = await Team.findOne({ user: userId });

    const filter = {
      isTransferListed: true,
      currentTeam: { $ne: userTeam?._id },
    };

    if (playerName) {
      filter.name = { $regex: playerName, $options: "i" };
    }
    if (maxPrice) {
      filter.askingPrice = { $lte: Number(maxPrice) };
    }

    let players = await Player.find(filter).populate("currentTeam");

    if (teamName) {
      const teamNameLower = teamName.toLowerCase();
      players = players.filter((p) => {
        return (
          p.currentTeam?.name &&
          p.currentTeam.name.toLowerCase().includes(teamNameLower)
        );
      });
    }

    return res.json(players);
  } catch (error) {
    console.error("Error getting transfer list:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

/**
 * POST /api/transfer/list-player
 * Body: { playerId, askingPrice }
 * Sets a player's isTransferListed to true
 */
exports.listPlayer = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { playerId, askingPrice } = req.body;

    const team = await Team.findOne({ user: userId });
    if (!team) {
      return res.status(404).json({ message: "Team not found" });
    }

    if (!team.players.includes(playerId)) {
      return res.status(403).json({ message: "Player not in your team" });
    }

    const player = await Player.findById(playerId);
    player.isTransferListed = true;
    player.askingPrice = askingPrice;
    await player.save();

    return res.json({ message: "Player listed on transfer market", player });
  } catch (error) {
    console.error("Error listing player:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

/**
 * POST /api/transfer/unlist-player
 * Body: { playerId }
 * Removes a player from the transfer list
 */
exports.unlistPlayer = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { playerId } = req.body;

    const team = await Team.findOne({ user: userId });
    if (!team) {
      return res.status(404).json({ message: "Team not found" });
    }
    if (!team.players.includes(playerId)) {
      return res.status(403).json({ message: "Player not in your team" });
    }

    const player = await Player.findById(playerId);
    player.isTransferListed = false;
    player.askingPrice = 0;
    await player.save();

    return res.json({ message: "Player removed from transfer list", player });
  } catch (error) {
    console.error("Error unlisting player:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

exports.buyPlayer = async (req, res) => {
  try {
    const buyerUserId = req.user.userId;
    const { playerId } = req.body;

    const buyerTeam = await Team.findOne({ user: buyerUserId }).populate(
      "players"
    );
    if (!buyerTeam) {
      return res.status(404).json({ message: "Buyer team not found" });
    }

    const player = await Player.findById(playerId);
    if (!player || !player?.isTransferListed) {
      return res
        .status(400)
        .json({ message: "Player is not on the transfer list" });
    }

    const sellerTeam = await Team.findById(player.currentTeam).populate(
      "players"
    );
    if (!sellerTeam) {
      return res.status(404).json({ message: "Seller team not found" });
    }

    if (String(sellerTeam.user) === String(buyerUserId)) {
      return res.status(400).json({ message: "You already own this player" });
    }

    const cost = Math.floor(player.askingPrice * 0.95);

    if (buyerTeam.budget < cost) {
      return res.status(400).json({ message: "Not enough budget" });
    }
    if (buyerTeam.players.length >= 25) {
      return res
        .status(400)
        .json({ message: "Cannot exceed 25 players in a team" });
    }
    if (sellerTeam.players.length <= 15) {
      return res
        .status(400)
        .json({ message: "Seller cannot go below 15 players" });
    }

    sellerTeam.players = sellerTeam.players.filter(
      (p) => p._id.toString() !== playerId
    );
    await sellerTeam.save();

    buyerTeam.players.push(playerId);
    buyerTeam.budget -= cost;
    await buyerTeam.save();

    player.isTransferListed = false;
    player.askingPrice = 0;
    player.currentTeam = buyerTeam._id;
    await player.save();

    sellerTeam.budget += cost;
    await sellerTeam.save();

    if (sellerTeam.players.length === 15) {
      const listedPlayers = await Player.find({
        currentTeam: sellerTeam._id,
        isTransferListed: true,
      });

      if (listedPlayers.length > 0) {
        for (const p of listedPlayers) {
          p.isTransferListed = false;
          p.askingPrice = 0;
          await p.save();
        }
        console.log(
          `Unlisted ${listedPlayers.length} players from team ${sellerTeam.name} to keep them at 15.`
        );
      }
    }

    return res.json({ message: "Player bought successfully", player });
  } catch (error) {
    console.error("Error buying player:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
