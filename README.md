# Football-Online-Manager

## Project Overview

The app allows users to:
- Register/login (with one unified form)
- Automatically receive a starting team with:
  - $5,000,000 transfer budget
  - 20 players (3 GKs, 6 DEFs, 6 MIDs, 5 ATKs)
- Buy/sell players in a real-time transfer market
- Filter players by name, team, and price
- Maintain team size between 15–25 players

## Tech Stack

Frontend -> React, JavaScript.
Backend -> Node.js, Express. 
DB -> MongoDB.
Styling > Tailwind, MUI. 

---


## Usage Instructions
Register or log in with an email/password
Your squad will be generated asynchronously
View your team, positions, and budget
Browse and filter the transfer market
List your own players or buy others'
Stay within the 15–25 player team rule


## Time Report

FRONTEND -> 15 Hrs
1. Authentication UI -> 3 hrs
Login/Registration single-page form
Email/password fields with validation
Feedback for errors and success
Loading states 

2. Dashboard & Team View -> 3 hrs
Team summary (budget, total players)
Player cards grouped by position


3. Transfer Market UI -> 4 hrs
Filter UI (team name, player name, price)
Player cards 
Purchase action UI 

4. State Management & Routing -> 5 hrs
Store & reducers (user, team, players)
Page routing (Login, Team Dashboard, Transfer Market)
Toasts and alerts (success, errors, validations)

BACKEND -> 16 Hrs
1. Auth System -> 2 hrs
Unified registration/login route
JWT-based session management
Password hashing (bcrypt)

2. Team Generation Logic -> 5 hrs
Async function triggered on user creation
Generates 20 players using predefined rules
3 Goalkeepers, 6 Defenders, 6 Midfielders, 5 Attackers
Assign initial transfer budget ($5M)
Store team and player data

3. Transfer Market APIs -> 7 hrs
Filtered transfer list
Add player to market with asking price
Remove player
Buy player 
Validation: team must have 15–25 players post-transfer

4. Background Processes -> 2 hrs
Team generation queued process (to simulate delay)


✅ DATABASE (MongoDB) -> 3 hrs
1. 👥 Users Collection
2. 🧑‍🤝‍🧑 Teams Collection
3. 🎮 Players Collection

Total->	34 Hours
