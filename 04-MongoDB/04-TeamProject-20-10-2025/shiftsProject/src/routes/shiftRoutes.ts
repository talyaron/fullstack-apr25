import { Router } from "express";
import { deleteMissions, getAmountOfMissions, getAssignesPeopleAmount, getMissions, getMissionsDone, getMissionsWaiting, patchNewStatus, postMissions } from "../controllers/missionsContrtollers";
import { deleteTeam, getTeams, postTeams } from "../controllers/teamsControllers";
import { deletePeople, getAmountOfPeople, getPeople, postPeople } from "../controllers/peopleControlles";
import { deleteControlCenter, getControlCenter, postControlCenter } from "../controllers/controlCenterController";
import { addShiftTypes, getShiftTypes } from "../controllers/shiftOptionsControlles";
import { authenticate, authorize } from "../middleware/auth.middleware"; // ✅ חדש!

import { patch } from "@mui/material";
const router = Router();
// ========================================
// 🔐 MISSIONS
// ========================================
router.get("/get/missions", authenticate, getMissions);
router.post("/post/missions", authenticate, authorize("admin", "manager"), postMissions);
router.delete("/delete/missions/:id", authenticate, authorize("admin"), deleteMissions);
router.get("/get/missions-amount", authenticate, getAmountOfMissions);
router.get("/get/assignesPeople-amount", authenticate, getAssignesPeopleAmount);
router.get("/get/missions-waiting", authenticate, getMissionsWaiting);
router.get("/get/missions-done", authenticate, getMissionsDone);

// ========================================
// 👥 TEAMS
// ========================================
router.get("/get/teams", authenticate, getTeams);
router.post("/post/teams", authenticate, authorize("admin", "manager"), postTeams);
router.delete("/delete/teams/:id", authenticate, authorize("admin"), deleteTeam);

// ========================================
// 👤 PEOPLE
// ========================================
router.get("/get/people", authenticate, getPeople);
router.get("/get/people-amount", authenticate, getAmountOfPeople);
router.post("/post/people", authenticate, authorize("admin", "manager"), postPeople);
router.delete("/delete/people/:id", authenticate, authorize("admin"), deletePeople);

// ========================================
// 🏢 CONTROL CENTER
// ========================================
router.get("/get/controlCenter", authenticate, getControlCenter);
router.post("/post/controlCenter", authenticate, authorize("admin"), postControlCenter);
router.delete("/delete/controlCenter/:id", authenticate, authorize("admin"), deleteControlCenter);
//missions
router.get("/get/missions",getMissions)
router.post("/post/missions",postMissions)
router.delete("/delete/missions/:id", deleteMissions)
router.get("/get/missions-amount",getAmountOfMissions)
router.get("/get/assignesPeople-amount",getAssignesPeopleAmount)
router.get("/get/missions-waiting",getMissionsWaiting)
router.get("/get/missions-done",getMissionsDone)
router.patch("/patch/mission-newStatus/:id",patchNewStatus)

// ========================================
// ⏰ SHIFTS
// ========================================
router.get("/get/shiftTypes", authenticate, getShiftTypes);
router.post("/post/shiftTypes", authenticate, authorize("admin", "manager"), addShiftTypes);

export default router;