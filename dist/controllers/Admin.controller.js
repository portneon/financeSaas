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
const admin_services_1 = __importDefault(require("../services/admin.services"));
const asyncHandler_1 = __importDefault(require("../utils/asyncHandler"));
class AdminController {
    constructor() {
        this.getAllUsers = (0, asyncHandler_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const subordinates = yield admin_services_1.default.getAllUsers(id);
            res.status(200).json(subordinates);
        }));
        this.registerUser = (0, asyncHandler_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            // Safe check req.user injected from verifyToken middleware
            const adminId = req.user.id;
            const newUser = yield admin_services_1.default.registerUser(adminId, req.body);
            res.status(201).json({
                status: "success",
                data: { user: newUser }
            });
        }));
    }
}
exports.default = new AdminController();
