import mongoose, { Document, model, Schema } from "mongoose";

export interface Imission extends Document {
    shiftDate: Date;
    amountPeople: number;
    missionType: string;
    notes: string;
    controlCenter: string;
    assignes_people: {
        firstName : string,
        lastName: string,
        phoneNumber:number,
        personId:number,
        controlCenter:string;
    }[];
    shiftType: string;
}

const misssionSchema = new Schema({
    shiftDate: { type: Date, required: true },
    amountPeople: {type : Number ,required :true},
    missionType: {type: String , required : true},
    notes: {type: String , required : true},
    controlCenter: {type: String , required : true},
    assignes_people: [{
        firstName : {type: String , required : false},
        lastName: {type: String , required : false},
        phoneNumber:{type: String , required : false},
        personId:{type: String , required : false},
        controlCenter:{type: String , required : false}
    }],
    shiftType:{type: String , required : true}
});

const Mission = model<Imission>("Mission", misssionSchema, "missions");
export default Mission;