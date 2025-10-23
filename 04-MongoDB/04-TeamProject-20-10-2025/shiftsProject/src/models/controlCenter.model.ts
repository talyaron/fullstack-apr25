import mongoose, { Document, model, Schema } from "mongoose";
export interface IcontrolCenter extends Document{
 controlCenterName : string;
 controlCenterNumber : number;   
}


const ControlCenterSchema = new Schema({
    controlCenterName : {type : String , required:true,unique:true},
    controlCenterNumber : {type : Number , required:true,unique:true}
})

const ControlCenter = model <IcontrolCenter>("controlCenter",ControlCenterSchema,"control_center")
export default ControlCenter; 