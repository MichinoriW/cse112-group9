const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../backend/server.js'); // Adjust the path as needed
const FortuneMsg = require('../backend/models/fortuneMsgModel.js'); // Adjust the path as needed

// Mock the FortuneMsg model
jest.mock('../backend/models/fortuneMsgModel.js');

describe('GET api/fortunesMsg/:user_id', () => {
    it('should return fortunes for a given user_id', async () => {
        // Mock the find method
        const mockFortunes = [{ message: 'You will have a great day!' }];
        FortuneMsg.find.mockResolvedValue(mockFortunes);
        
        const userId = '123';
        const response = await request(app).get(`/api/fortuneMsg/${userId}`);

        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockFortunes);
        expect(FortuneMsg.find).toHaveBeenCalledWith({ user_id: userId });
    });

    it('should handle errors properly', async () => {
        // Mock the find method to throw an error
        FortuneMsg.find.mockRejectedValue(new Error('Internal server error'));

        const userId = '123';
        const response = await request(app).get(`/api/fortuneMsg/${userId}`);

        expect(response.status).toBe(500);
        expect(response.body).toEqual({ error: 'Internal server error' });
    });
});

describe('GET api/fortunesMsg/:user_id/id', () => {
    it('should return fortune for a given user_id and id', async () => {
        // Mock the find method
        const mockFortunes = [{ message: 'You will have a great day!' }];
        FortuneMsg.find.mockResolvedValue(mockFortunes);
        
        const userId = '123';
        const id = '12345';
        const response = await request(app).get(`/api/fortuneMsg/${userId}/?fortune_id=${id}`);

        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockFortunes);
        expect(FortuneMsg.find).toHaveBeenCalledWith({  id : id, user_id: userId});
    });

    it('should handle errors properly', async () => {
        // Mock the find method to throw an error
        FortuneMsg.find.mockRejectedValue(new Error('Internal server error'));

        const userId = '123';
        const id = '12345';
        const response = await request(app).get(`/api/fortuneMsg/${userId}/?fortune_id=${id}`);

        expect(response.status).toBe(500);
        expect(response.body).toEqual({ error: 'Internal server error' });
    });
});



// Close mongoose connection after tests
afterAll(async () => {
    await mongoose.connection.close();
});
