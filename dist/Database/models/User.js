"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    // Example of referencing another schema type:
    // Suppose you have a ReviewSchema and want to reference it in ProductSchema
    // reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    hash: { type: String, required: true },
    city: { type: String, required: true },
    phoneNumber: { type: String, required: false },
    restaurant: { type: String, required: false },
    address: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "Address", default: [] }],
    favouriteSpices: [{ type: String, default: [] }],
    history: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "Order" }],
    _id: { type: mongoose_1.Schema.Types.ObjectId, auto: true },
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("User", UserSchema);
