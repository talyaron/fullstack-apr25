import { Router } from "express";
import { deleteMissions, getMissions, postMissions } from "../controllers/missionsContrtollers";
import { deleteTeam, getTeams, postTeams } from "../controllers/teamsControllers";
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

//get api
// router.get("/api/get/people",getPeople)
// router.get("/api/get/controlCenter",getControlCenter)
// router.get("/api/get/users",getUsers)


// //post api
// router.post("/api/post/people",postPeople)
// router.post("/api/post/controlCenter",postControlCenter)
// router.post("/api/post/users",postUsers)

// //delete api
// router.delete("/api/delete/people", deletePeople)
// router.delete("/api/delete/controlCenter", deleteControlCenter)
// router.delete("/api/delete/users", deleteUsers)


export default router;
