import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const TaskSchema = new Schema({
   
        title: { 
            type: String, 
            required: true },
        description: { 
            type: String },
        assignedTo: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'User' },
        status: {
             type: String,
              enum: ['Pending', 'InProgress', 'Completed'], 
              default: 'Pending' }
      });

const Task = mongoose.model('Task', TaskSchema);

export default Task;