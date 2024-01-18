import { Schema, model } from 'mongoose'

const Metadata = new Schema({
    owner: { type: Schema.Types.ObjectId, ref: 'user' },
    name: { type: String, require: true, default: null },
    hash: { type: String, default: null },
    size: { type: String, require: true, default: null },
    type: { type: String, required: true },
    deparment: { type: String, default: null }
},
    { timestamps: true }
);

export default model('FilesMetaData', Metadata)