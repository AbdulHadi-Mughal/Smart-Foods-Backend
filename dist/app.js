"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const products_1 = __importDefault(require("./routes/products"));
const users_1 = __importDefault(require("./routes/users"));
const mongoose_1 = __importDefault(require("./Database/mongoose"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const checkOrigin_1 = require("./handlers/validators/checkOrigin");
const sanitizers_1 = require("./handlers/validators/sanitizers");
const app = (0, express_1.default)();
const port = (process.env.PORT || 3000);
const corsOptions = {
    origin: (origin, callback) => {
        if (!origin || checkOrigin_1.allowedOrigins.includes(origin)) {
            callback(null, true);
        }
        else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    credentials: true, // only works with specific origins, NOT "*"
};
app.use((0, cors_1.default)(corsOptions));
// if (process.env.NODE_ENV === "production") {
//   app.use(checkOrigin);
// }
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
// mongoose.set("strictQuery", true);
// mongoose.set("sanitizeFilter", true);
app.use(sanitizers_1.sanitizeBody);
app.get("/api/warmup", (req, res) => {
    res.send("Server is warm");
});
app.use("/api/products", products_1.default);
app.use("/api/users", users_1.default);
app.listen(port, process.env.NODE_ENV === "development" ? "192.168.0.193" : "0.0.0.0", () => {
    console.log("Server Started in " + process.env.NODE_ENV);
    (0, mongoose_1.default)();
});
// imagekit ID: vqu9cto3v
