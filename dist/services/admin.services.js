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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const admin_repositories_1 = __importDefault(require("../repositories/admin.repositories"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const ApiError_1 = require("../utils/ApiError");
class AdminService {
    getAllUsers(adminId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield admin_repositories_1.default.findAll(adminId);
        });
    }
    registerUser(adminId, userData) {
        return __awaiter(this, void 0, void 0, function* () {
            // Enforce strong validation
            if (userData.role !== "ANALYST" && userData.role !== "VIEWER") {
                throw new ApiError_1.ApiError(400, "Admins can only register ANALYST or VIEWER roles.");
            }
            const salt = yield bcrypt_1.default.genSalt(10);
            const hashedPassword = yield bcrypt_1.default.hash(userData.password, salt);
            const newUser = yield admin_repositories_1.default.createUser({
                name: userData.name,
                email: userData.email,
                password: hashedPassword,
                role: userData.role,
                adminId: adminId
            });
            // Exclude return password
            const { password } = newUser, userWithoutPassword = __rest(newUser, ["password"]);
            return userWithoutPassword;
        });
    }
}
exports.default = new AdminService();
