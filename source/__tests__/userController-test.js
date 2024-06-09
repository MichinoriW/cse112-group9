const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../backend/server.js'); // Adjust the path as needed
const UserModel = require('../backend/models/userModel.js'); // Adjust the path as needed

// Mock the FortuneMsg model.
jest.mock('../backend/models/userModel.js');

describe('POST api/user/login', () => {
    it('should login user with email and password', async () => {
        // Mock the find method
        const mockUser = {_id: 1234, email:"email@me.com", username:"myUsername"};
        UserModel.login.mockResolvedValue(mockUser);

        const formData = {
            email : "email",
            password : "password",
        };

        const response = await request(app).post(`/api/user/login`).send(formData);

        const expectedBody = {user_id: "1234", email:"email@me.com", username:"myUsername"};

        expect(response.status).toBe(200);
        expect(response.body).toEqual(expectedBody);
        expect(UserModel.login).toHaveBeenCalledWith(formData.email, formData.password);
    });

    it('should handle errors properly', async () => {
        // Mock the find method to throw an error
        UserModel.login.mockRejectedValue(new Error('Internal server error'));

        const formData = {
            email : "email",
            password : "password",
        };

        const response = await request(app).post(`/api/user/login`).send(formData);

        expect(response.status).toBe(400);
        expect(response.body).toEqual({ error: 'Internal server error' });
    });
});

describe('POST api/userModel/signup', () => {
    it('should signup user with email, username, and password', async () => {
        // Mock the find method
        const mockUser = {_id: 1234, email:"email@me.com", username:"myUsername"};
        UserModel.signup.mockResolvedValue(mockUser);

        const formData = {
            email : "email",
            username: "myUsername",
            password : "password",
        };

        const response = await request(app).post(`/api/user/signup`).send(formData);

        const expectedBody = {user_id: "1234", email:"email@me.com", username:"myUsername"};

        expect(response.status).toBe(200);
        expect(response.body).toEqual(expectedBody);
        expect(UserModel.signup).toHaveBeenCalledWith(formData.email, formData.username, formData.password);
    });

    it('should handle errors properly', async () => {
        // Mock the find method to throw an error
        UserModel.signup.mockRejectedValue(new Error('Internal server error'));

        const formData = {
            email : "email",
            username: "myUsername",
            password : "password",
        };

        const response = await request(app).post(`/api/user/signup`).send(formData);

        expect(response.status).toBe(400);
        expect(response.body).toEqual({ error: 'Internal server error' });
    });
});

// Close mongoose connection after tests
afterAll(async () => {
    await mongoose.connection.close();
});
