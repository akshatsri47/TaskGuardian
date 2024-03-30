import mongoose from "mongoose";

const Schema = mongoose.Schema;

const roleSchema = new Schema({
    name:{
        type: String,
        required: true,
        enum: ['Regular','Admin','Manager'],
        required: true
    },

});
const Role =  mongoose.model('Role', roleSchema);

export default Role;