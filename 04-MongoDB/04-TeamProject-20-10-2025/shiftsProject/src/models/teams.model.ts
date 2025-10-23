import mongoose, { Document, model, Schema } from "mongoose";
export interface Iteams extends Document {
    teamName : string;
    controlCenter: string;
    personId :{
        idNumber: number;
    }[];
}

const teamsSchema = new Schema ({
    teamName : {type: String , required : true},
    controlCenter : {type : String,required : true},
    personId:[{
        idNumber: {type : Number ,required : true}
    }]
});

const Teams = model <Iteams>("Teams", teamsSchema, "teams");
export default Teams;