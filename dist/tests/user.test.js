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
const app_1 = __importDefault(require("../src/app"));
const supertest_1 = __importDefault(require("supertest"));
const i18n_1 = __importDefault(require("../src/i18n"));
const userData = {
    id: 1,
    name: 'Juan',
    lastname: 'Perez',
    email: 'juanperez@gmail.com',
    password: '123456',
};
const ENDPOINT = '/api/v1/session/login';
const request = (0, supertest_1.default)(app_1.default);
describe('Session Endpoint', () => {
    it('POST /api/v1/session/login should login the user correctly with the correct data', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.post(ENDPOINT).send({
            email: userData.email,
            password: userData.password,
        });
        expect(response.status).toBe(200);
        expect(response.body.token).toBeDefined();
        expect(response.body.user).toBeDefined();
    }));
    it('POST /api/v1/session/login should show status code 400, the email is blan', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.post(ENDPOINT).send({
            email: '',
            password: userData.password,
        });
        expect(response.status).toBe(400);
        expect(response.body.message).toBe([{ email: i18n_1.default.email_in_blank }]);
    }));
    it('POST /api/v1/session/login should show status code 400, the password is blank', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.post(ENDPOINT).send({
            email: userData.email,
            password: '',
        });
        expect(response.status).toBe(400);
        expect(response.body.message).toBe([{ password: i18n_1.default.email_in_blank }]);
    }));
    it('POST /api/v1/session/login should show status code 400, the email and the password is blank', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.post(ENDPOINT).send({
            email: '',
            password: '',
        });
        expect(response.status).toBe(400);
        expect(response.body.message).toBe([
            { email: i18n_1.default.email_in_blank },
            { password: i18n_1.default.password_in_blank },
        ]);
    }));
    it('POST /api/v1/session/login should show status code 400, the email is incorrect', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.post(ENDPOINT).send({
            email: 'asdsad@a.com',
            password: userData.password,
        });
        expect(response.status).toBe(400);
        expect(response.body.message).toBe([{ email: i18n_1.default.password_incorrect }]);
    }));
    it('POST /api/v1/session/login should show status code 400, the email and the password is incorrect', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.post(ENDPOINT).send({
            email: userData.email,
            password: '1234',
        });
        expect(response.status).toBe(400);
        expect(response.body.message).toBe([{ password: i18n_1.default.password_incorrect }]);
    }));
    it('POST /api/v1/session/login should show status code 400, the email and the password is incorrect', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.post(ENDPOINT).send({
            email: 'asdsad@a.com',
            password: '123431',
        });
        expect(response.status).toBe(400);
        expect(response.body.message).toBe([
            { email: i18n_1.default.email_incorrect },
            { password: i18n_1.default.password_incorrect },
        ]);
    }));
});
