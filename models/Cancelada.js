import mongoose from "mongoose";

const canceladaSchema = mongoose.Schema({
    estacionId: {
        type: mongoose.Schema.Types.ObjectId,  // Tipo de dato: Identificador único
        required: true,  // Campo obligatorio
        ref: 'Estacion'  // Referencia al modelo 'Estacion'
    },
    fecha: {
        type: String,  // Tipo de dato String por ahora. No se hacer el casting que necesito
        required: true,  // Campo obligatorio
    },
    nombre:{
        type:String,
        required:true
    },
    dni:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    telefono:{
        type:String,
        required:true
    },
    cancelada:{
        type:Boolean,
        default:true
    }
});

const Cancelada = mongoose.model('canceladas', canceladaSchema);  // Definición del modelo

export default Cancelada;  // Exportación del modelo
