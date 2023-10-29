import mongoose from "mongoose";

const estacionSchema = mongoose.Schema({
    nombre:{
        type: String,
        required:true,
        trim:true,
        unique:true
    },
    equipo:{
        type: Boolean,
        required:true,
    },
    contrasena:{
        type:String,
        default:null
    }
})

const Estacion = mongoose.model('estaciones', estacionSchema);

export default Estacion;