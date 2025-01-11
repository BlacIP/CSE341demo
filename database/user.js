const { MongoClient } = require('mongodb');
const { ObjectId } = require('mongodb');  // Add this at the top of your file

const users = () => {
    // Schema definition
    const userSchema = {
        firstName: {
            type: String,
        },
        lastName: {
            type: String,
        }
    };

    // Collection name
    const collection = 'users';

    // Validation function
    const validateUser = (user) => {
        if (!user) {
            throw new Error('User data is required');
        }
        if (!user.firstName) {
            throw new Error('firstName is required');
        }
        if (!user.lastName) {
            throw new Error('lastName is required');
        }
        if (typeof user.firstName !== 'string') {
            throw new Error('firstName must be a string');
        }
        if (typeof user.lastName !== 'string') {
            throw new Error('lastName must be a string');
        }
        return true;
    };

    // CRUD operations
    const userOperations = {
        // Create
        async create(db, userData) {
            if (!validateUser(userData)) {
                throw new Error('Invalid user data');
            }
            const result = await db.collection(collection).insertOne(userData);
            return await db.collection(collection).findOne({ _id: result.insertedId });
        },

        // Read (all)
        async findAll(db) {
            return await db.collection(collection).find({}).toArray();
        },

        // Read (single)
        async findById(db, id) {
            try {
                if (!ObjectId.isValid(id)) {
                    throw new Error('Invalid ID format');
                }
                return await db.collection(collection).findOne(
                    { _id: ObjectId.createFromHexString(id) }
                );
            } catch (error) {
                throw error;
            }
        },

        // Update function
        async update(db, id, userData) {
            try {
                if (!validateUser(userData)) {
                    throw new Error('Invalid user data');
                }
                
                const objectId = new ObjectId(id); // Convert string ID to ObjectId
                
                const result = await db.collection(collection).findOneAndUpdate(
                    { _id: objectId },
                    { $set: userData },
                    { returnDocument: 'after' } // Return the updated document
                );
                
                if (!result) {
                    throw new Error('User not found');
                }
                
                return result;
            } catch (error) {
                throw error;
            }
        },

       // Delete
        async delete(db, id) {
            try {
                if (!ObjectId.isValid(id)) {
                    throw new Error('Invalid ID format');
                }
                return await db.collection(collection).deleteOne(
                    { _id: ObjectId.createFromHexString(id) }
                );
            } catch (error) {
                throw error;
            }
        }
    };

    return {
        userSchema,
        collection,
        userOperations
    };
};

module.exports = users().userOperations; 