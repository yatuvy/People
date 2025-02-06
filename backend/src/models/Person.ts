import { Schema, model } from 'mongoose';

const personSchemeDefinition = {
    gender: {
        type: String,
        enum: ['male', 'female'],
        required: true
    },
    name: {
        type: Schema.Types.Mixed,
        default: {}
    },
    location: {
        type: Schema.Types.Mixed,
        default: {}
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    login: {
        type: Schema.Types.Mixed,
        default: {}
    },
    dob: {
        type: Schema.Types.Mixed,
        default: {}
    },
    registered: {
        type: Schema.Types.Mixed,
        default: {}
    },
    phone: {
        type: String,
        required: true
    },
    cell: {
        type: String,
        required: true
    },
    id: {
        type: Schema.Types.Mixed,
        default: {}
    },
    picture: {
        large: {
            type: String,
            required: true
        },
        medium: {
            type: String,
            required: true
        },
        thumbnail: {
            type: String,
            required: true
        }
    },
    nat: {
        type: String,
        required: true
    }
};

const UserSchema = new Schema(personSchemeDefinition);
const Person = model('Person', UserSchema);

export default Person;
