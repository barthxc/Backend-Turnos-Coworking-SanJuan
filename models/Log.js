import mongoose from "mongoose";

const logSchema = mongoose.Schema({
    idReserva:{
        type: mongoose.Schema.Types.ObjectId,
        requird:true,
        red:'Reserva'
    },
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
    },
    telefono:{
        type:String,
        required:true
    },
    mensaje:{
        type:String,
    },
    cancelada:{
        type:Boolean,
        default:false
    }
    
})

const Log = mongoose.model('logs', logSchema);

export default Log;