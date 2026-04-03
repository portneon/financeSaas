"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_services_1 = __importDefault(require("../services/auth.services"));
const asyncHandler_1 = __importDefault(require("../utils/asyncHandler"));
class AuthController {
    constructor() {
        this.login = (0, asyncHandler_1.default)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            if (!email || !password) {
                return res.status(400).json({ status: "fail", message: "Email and password are required" });
            }
            try {
                const data = yield auth_services_1.default.login(email, password);
                return res.status(200).json({ status: "success", data });
            }
            catch (error) {
                return res.status(401).json({ status: "fail", message: error.message });
            }
        }));
    }
}
exports.default = new AuthController();
