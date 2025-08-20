"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const OrderSchema = new mongoose_1.Schema({
    // Example of referencing another schema type:
    // Suppose you have a ReviewSchema and want to reference it in ProductSchema
    // reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
    userEmail: { type: String, required: true },
    orderedSpices: [
        {
            userID: {
                type: mongoose_1.Schema.Types.ObjectId,
                ref: "User",
            },
            spiceName: { type: String },
            weight: { type: Number },
            quantity: { type: Number },
        },
    ],
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("Order", OrderSchema);
