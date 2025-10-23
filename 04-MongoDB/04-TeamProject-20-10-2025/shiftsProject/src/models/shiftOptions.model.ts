import mongoose, { Document, model, Schema } from "mongoose";


export interface IshiftOptions extends Document{
    shiftType: string;
    shiftDetails: string;
}


const shiftOptionsSchema = new Schema ({

    shiftType :{type:String,required:true,unique:true},
    shiftDetails:{type:String,required : false}

})


const Shift = model <IshiftOptions>("Shifts",shiftOptionsSchema,"shift_options");
export default Shift;