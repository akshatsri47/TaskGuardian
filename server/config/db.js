import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        const mongoURI = 'mongodb+srv://akshatsrivastav38:RGacnOEMc145ERZA@cluster0.9umuh6k.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
        await mongoose.connect(mongoURI, );
        console.log('Connected to MongoDB Atlas');
    } catch (error) {
        console.error('MongoDB Atlas connection error:', error);
        process.exit(1); 
    }
};

export default connectDB;
