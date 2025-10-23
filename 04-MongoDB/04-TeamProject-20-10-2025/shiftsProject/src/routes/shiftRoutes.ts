import { Router } from "express";
import { deleteMissions, getMissions, postMissions } from "../controllers/missionsContrtollers";
import { deleteTeam, getTeams, postTeams } from "../controllers/teamsControllers";
import { deletePeople, getPeople, postPeople } from "../controllers/peopleControlles";
import { deleteControlCenter, getControlCenter, postControlCenter } from "../controllers/controlCenterController";
const router = Router();

// Example route (placeholder)


//missions
router.get("/get/missions",getMissions)
router.post("/post/missions",postMissions)
router.delete("/delete/missions/:id", deleteMissions)

//teams
router.get("/get/teams",getTeams)
router.post("/post/teams",postTeams)
router.delete("/delete/teams/:id", deleteTeam)



//people
router.get("/get/people",getPeople)
router.post("/post/people",postPeople)
router.delete("/delete/people/:id", deletePeople)


//controlCenter
router.get("/api/get/controlCenter",getControlCenter)
router.post("/api/post/controlCenter",postControlCenter)
router.delete("/api/delete/controlCenter/:id", deleteControlCenter)


//users
// router.get("/api/get/users",getUsers)
// router.post("/api/post/users",postUsers)
// router.delete("/api/delete/users", deleteUsers)


export default router;
