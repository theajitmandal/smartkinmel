const mongoose = require('mongoose');

// 1. Define the Schema (The Blueprint)
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'], // Built-in validation
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true, // Creates a unique index in MongoDB
        lowercase: true
    },
    age: {
        type: Number,
        min: 18,
        max: 100
    },
    roles: {
        type: [String],
        default: ['user']
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true // Automatically adds 'createdAt' and 'updatedAt' fields
});

// 2. Compile the Model (The Database Interface)
// Note: Mongoose automatically pluralizes 'User' to create the 'users' collection.
const User = mongoose.model('User', userSchema);

// 3. Use the Model to Interact with MongoDB
async function run() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/myDatabase');

        // CREATE: Instantiate and save a new document
        const newUser = new User({
            name: '  John Doe  ',
            email: 'John@Example.com',
            age: 28
        });
        const savedUser = await newUser.save();
        console.log('Saved User:', savedUser);

        // READ: Find documents
        const activeUsers = await User.find({ isActive: true });
        console.log('Active Users:', activeUsers);

    } catch (error) {
        console.error('Error:', error.message);
    } finally {
        await mongoose.disconnect();
    }
}