import { Router } from "express";
import { deleteMissions, getAmountOfMissions, getAssignesPeopleAmount, getMissions, getMissionsDone, getMissionsWaiting, postMissions } from "../controllers/missionsContrtollers";
import { deleteTeam, getTeams, postTeams } from "../controllers/teamsControllers";
import { deletePeople, getAmountOfPeople, getPeople, postPeople } from "../controllers/peopleControlles";
import { deleteControlCenter, getControlCenter, postControlCenter } from "../controllers/controlCenterController";
import { addShiftTypes, getShiftTypes } from "../controllers/shiftOptionsControlles";
const router = Router();

// Example route (placeholder)


//missions
router.get("/get/missions",getMissions)
router.post("/post/missions",postMissions)
router.delete("/delete/missions/:id", deleteMissions)
router.get("/get/missions-amount",getAmountOfMissions)
router.get("/get/assignesPeople-amount",getAssignesPeopleAmount)
router.get("/get/missions-waiting",getMissionsWaiting)
router.get("/get/missions-done",getMissionsDone)

// router.put

//teams
router.get("/get/teams",getTeams)
router.post("/post/teams",postTeams)
router.delete("/delete/teams/:id", deleteTeam)

//people
router.get("/get/people",getPeople)
router.get("/get/people-amount",getAmountOfPeople)
router.post("/post/people",postPeople)
router.delete("/delete/people/:id", deletePeople)

//controlCenter
router.get("/get/controlCenter",getControlCenter)
router.post("/post/controlCenter",postControlCenter)
router.delete("/delete/controlCenter/:id", deleteControlCenter)

//shifts
router.get("/get/shiftTypes",getShiftTypes)
router.post("/post/shiftTypes",addShiftTypes)

//users
// router.get("/api/get/users",getUsers)
// router.post("/api/post/users",postUsers)
// router.delete("/api/delete/users", deleteUsers)


export default router;
