const Team = require("../models/team");
const Player = require("../models/player");
const {
  generateRandomName,
  generateRandomTeamName,
} = require("../utils/nameGenerators");

exports.createInitialTeam = async (userId) => {
  try {
    const teamName = await generateRandomTeamName();

    const newTeam = new Team({
      user: userId,
      name: teamName,
      budget: 5000000,
      players: [],
    });
    const savedTeam = await newTeam.save();

    const positions = {
      Goalkeeper: 3,
      Defender: 6,
      Midfielder: 6,
      Attacker: 5,
    };

    const createdPlayers = [];
    for (const [position, count] of Object.entries(positions)) {
      for (let i = 0; i < count; i++) {
        const player = new Player({
          name: generateRandomName(),
          position,
          currentTeam: savedTeam._id,
        });
        const savedPlayer = await player.save();
        createdPlayers.push(savedPlayer._id);
      }
    }

    savedTeam.players = createdPlayers;
    await savedTeam.save();

    console.log(
      `Initial team created for user ${userId} with team name ${teamName}`
    );
  } catch (error) {
    console.error("Error creating initial team:", error);
  }
};

exports.getMyTeam = async (req, res) => {
  try {
    const userId = req.user.userId;

    const team = await Team.findOne({ user: userId }).populate("players");
    if (!team) {
      return res
        .status(404)
        .json({ message: "Team not found. Possibly still being created." });
    }

    return res.json(team);
  } catch (error) {
    console.error("Error fetching team:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
