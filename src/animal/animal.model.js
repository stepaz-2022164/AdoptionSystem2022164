import mongoose from "mongoose"

const animalSchema = mongoose.Schema( {
    name: {
        type: String,
        required: true
    },
    animal: {
        type: String,
        required: true
    },
    keeper: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    sex: {
        type: String,
        required: true
    }
})

//Pre mongoose
export default mongoose.model('animal', animalSchema)