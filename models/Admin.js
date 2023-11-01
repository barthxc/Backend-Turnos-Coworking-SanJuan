import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
    usuario:{
        type:String,
        required:true,
        unique:true
    },
    contrasena:{
        type:String,
        required:true
    }
});

const Admin = mongoose.model('admins',adminSchema);

export default Admin;