# Quest Log (React frontend)

Practical 6: React + Node/Express + MongoDB, themed as a retro RPG quest log.
Tasks from the backend are shown as quests. Priority becomes difficulty:
low = Easy (10 XP), medium = Normal (25 XP), high = Boss (50 XP).
Completing quests earns XP and levels you up (100 XP per level).

## 1. Backend changes (one time)

In your `task-manager-api` folder:

```
npm install cors
```

In `server.js`, add these two lines near the top, BEFORE `express.json()` and all routes:

```js
const cors = require("cors");
app.use(cors());
```

Then start it:

```
npm start        # http://localhost:5000
```

## 2. Run the frontend (second terminal)

```
npm install
npm run dev      # http://localhost:5173
```

Keep BOTH terminals running.

## API used

The frontend calls `http://localhost:5000/mongo-tasks` (your Practical 5 MongoDB routes).
The base URL is written once, in `src/api.js`.

| Action | Request |
| --- | --- |
| Load quests | GET /mongo-tasks |
| New quest | POST /mongo-tasks |
| Edit / complete | PUT /mongo-tasks/:id |
| Delete | DELETE /mongo-tasks/:id |

## Folder guide

```
src/
  api.js                 all fetch calls + one BASE_URL
  utils.js               difficulty -> XP, level calculation
  hooks/useQuests.js     list state + create/update/delete logic
  hooks/useToasts.js     success/error messages
  components/            HeroPanel, QuestList, QuestItem, QuestForm, ConfirmDialog, Toasts
  App.jsx                puts everything together
  styles.css             the theme
```

## Test checklist (for your lab file)

1. Create a quest, refresh the page, it is still there.
2. Complete it, XP bar moves. Refresh, still completed.
3. Edit title and difficulty. Refresh, changes stay.
4. Delete it (confirm dialog appears). Refresh, it is gone.
5. Stop the backend and try to create a quest: it appears, then is removed and an error message shows.
6. Stop the backend and refresh: error panel with a "Try again" button.
