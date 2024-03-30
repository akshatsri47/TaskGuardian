import mongoose from 'mongoose';
 const UserSchema = new mongoose.Schema({
    username: {
        type :String,
        required:true,
        
    },
    password:{
        type:String,
        required:true,
        
    },
    role:{
        type: String, 
        enum: ['Admin', 'Manager', 'Regular'],
         required: true ,
 }
});
UserSchema.virtual('roleDetail', {
    ref: 'Role',
    localField: 'role',
    foreignField: '_id',
    justOne: true 
  });
  
  
UserSchema.virtual('tasks', {
    ref: 'Task',
    localField: '_id',
    foreignField: 'assignedTo'
  });
    
const User = mongoose.model('User', UserSchema);

export default User;