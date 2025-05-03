import mongoose from 'mongoose' 

const connectDB = async function () {
    try{
        const connection = await mongoose.connect(process.env.MONGODB_URI)

        console.log(`mongo connected ${connection.connection.host}`)
    } catch(err) {
        console.log('error connceting to mongo' , err)
        process.exit(1);
    }
}

export default connectDB