const Team = require("../models/Team");

const FIRST_NAMES = [
    "Victor",
    "Philipp",
    "Caroline",
    "Mohamed",
    "Ibrahim",
    "Zainab",
    "Tahur",
    "Sophie",
    "Mahmood",
    "Sallie",
    "Liana",
    "Ibrahim",
    "Hiba",       
    "KC",          
    "Yousif",
    "John",       
    "Vans",
    "Chellaiah",
];

const LAST_NAMES = [
"Carreras-Candi",
  "Tachas",
  "Hazlehurst",
  "AlOthman",
  "Shaaban",
  "Mashkoor",
  "Rana",
  "Roberts",
  "Zeyad",
  "Panganiban",
  "Barzal",
  "Ocampo",
  "Okal",
  "Noja",
  "Shanmugavel",
  "Almoayed",
  "Alsawad",
];

const TEAM_NAMES = [
    "Calo Chefs United",
  "Calo Growth FC",
  "Calo Ops Warriors",
  "Calo Experience Knights",
  "Calo Partnerships Eagles",
  "Calo Innovation Dragons",
  "Calo Marketing Hawks",
  "Calo People Panthers",
  "Calo Kitchen Titans",
  "Calo Strategy Champions",
  "Calo United Eagles",
  "Calo Riyadh Rovers",
  "Calo Jeddah Jaguars",
  "Calo London Lions",
  "Calo Bash Barons",
  "Calo Talent Tigers",
  "Calo EX Express",
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
