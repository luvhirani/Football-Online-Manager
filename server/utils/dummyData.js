const Team = require("../models/Team");

const FIRST_NAMES = [
  "John",
  "Michael",
  "David",
  "Chris",
  "James",
  "Robert",
  "Peter",
  "Mark",
  "Paul",
  "Kevin",
  "Anthony",
  "Andrew",
  "Brian",
  "Jason",
  "Steven",
  "Thomas",
  "Joseph",
  "Daniel",
];

const LAST_NAMES = [
  "Smith",
  "Johnson",
  "Brown",
  "Taylor",
  "Anderson",
  "Jones",
  "White",
  "Harris",
  "Martin",
  "Thompson",
  "Garcia",
  "Martinez",
];

const TEAM_NAMES = [
  "Thunder FC",
  "Lions United",
  "Rising Stars",
  "Red Dragons",
  "Blue Hawks",
  "Golden Eagles",
  "Silver Wolves",
  "Crimson Knights",
  "Emerald Warriors",
  "Black Panthers",
  "Shining Phoenix",
];

function generateRandomName() {
  const firstName = FIRST_NAMES[Math.floor(Math.random() * FIRST_NAMES.length)];
  const lastName = LAST_NAMES[Math.floor(Math.random() * LAST_NAMES.length)];
  return `${firstName} ${lastName}`;
}

async function generateRandomTeamName() {
  let name = "";
  let foundUnique = false;

  for (let i = 0; i < TEAM_NAMES.length * 2; i++) {
    const candidate = TEAM_NAMES[Math.floor(Math.random() * TEAM_NAMES.length)];

    const existing = await Team.findOne({ name: candidate });
    if (!existing) {
      name = candidate;
      foundUnique = true;
      break;
    }
  }

  if (!foundUnique) {
    name = `Team-${Math.random().toString(36).substring(2, 8)}`;
  }

  return name;
}

module.exports = {
  generateRandomName,
  generateRandomTeamName,
};
