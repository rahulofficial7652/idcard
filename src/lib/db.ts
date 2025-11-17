import mongoose from "mongoose"

export async function connect() {
    try {
        const connection = mongoose.connection
     
       
        if(connection.readyState >=1) {
            console.log("MongoDB already connected");
            return;
        }
        
         await mongoose.connect(process.env.MONGODB_URL!)
            connection.on('connected', () => {
            console.log('MongoDB connect')
        })

        connection.on('error', (err) => {
            console.log('MongoDB connection error', err)
            process.exit()
        })
        console.log('Database connected successfully')
        
    } catch (error) {
        console.log('Something went wrong for Database connection')        
    }
}