import mongoose from "mongoose";

const logSchema = mongoose.Schema({
    nombreEstacion:{
        type: String,
        required:true,
        trim:true,
    },
    equipo:{
        type: Boolean,
        required:true,
    },
    contrasena:{
        type:String,
        default:null
    },
    fecha:{
        type:String,
        required:true
    },
    nombrePersona:{
        type:String,
        require:true
    },
    dniPersona:{
        type:String,
        required:true
    },
    emailPersona:{
        type:String,
        required:true
    }

})

const Log = mongoose.model('logs', logSchema);

export default Log;