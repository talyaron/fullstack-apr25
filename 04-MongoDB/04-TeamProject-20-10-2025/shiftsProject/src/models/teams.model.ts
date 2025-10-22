import mongoose, { Document, model, Schema } from "mongoose";
export interface Iteams extends Document {
    teamNumber : number;
    controlCenter: string;
    personId :{
        idNumber: number;
    }[];
}

const teamsSchema = new Schema ({
    teamNumber : {type: Number , required : true},
    controlCenter : {type : String,required : true},
    personId:[{
        idNumber: {type : Number ,required : true}
    }]
});

const Teams = model <Iteams>("Teams", teamsSchema, "teams");
export default Teams;