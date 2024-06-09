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

describe('GET api/fortunesMsg/:user_id?fortune_id=id', () => {
    it('should return fortune for a given user_id and id', async () => {
        // Mock the find method
        const mockFortunes = [{ message: 'You will have a great day!' }];
        FortuneMsg.find.mockResolvedValue(mockFortunes);
        
        const userId = '123';
        const id = '12345';
        const response = await request(app).get(`/api/fortuneMsg/${userId}?fortune_id=${id}`);

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

describe('POST api/fortunesMsg', () => {
    it('should create a fortune', async () => {
        
        const newDate = new Date();

        const fortuneData = {
            user_id: "123",
            category_id: "love",
            description: "test",
            date: newDate,
        };
        JSON.stringify(fortuneData);
        const response = await request(app).post(`/api/fortuneMsg/`).send(fortuneData);

        expect(response.status).toBe(201);
        expect(FortuneMsg.create).toHaveBeenCalledWith({user_id: "123",category_id: "love",description: "test", date: newDate.toISOString()});
    });

    it('should handle errors properly', async () => {
        // Mock the find method to throw an error
        FortuneMsg.create.mockRejectedValue(new Error('Internal server error'));

        const fortuneData = {
            user_id: "123",
            category_id: "love",
            description: "test",
            date: new Date(),
        };
        const response = await request(app).post(`/api/fortuneMsg/`).send(fortuneData);
        
        expect(response.status).toBe(500);
        expect(response.body).toEqual({ error: 'Internal server error' });
    });
});

describe('DELETE api/fortuneMsg/:user_id?fortune_id=:fortune_id', () => {
    it('should delete a fortune', async () => {
        
        const userId = '123';
        const id = '12345';
        FortuneMsg.deleteOne.mockResolvedValue({deletedCount: 1});
                
        const response = await request(app).delete(`/api/fortuneMsg/${userId}?fortune_id=${id}`);

        expect(response.status).toBe(200);
        expect(response.body).toEqual({ message: 'Fortune message deleted successfully' });
        expect(FortuneMsg.deleteOne).toHaveBeenCalledWith({ user_id: userId, _id: id });
    });

    it('should handle non existant delete', async () => {      
        FortuneMsg.deleteOne.mockResolvedValue({ deletedCount: 0 });
        
        const userId = '123';
        const id = '12345';
                
        const response = await request(app).delete(`/api/fortuneMsg/${userId}?fortune_id=${id}`);

        expect(response.status).toBe(404);
        expect(response.body).toEqual({ error: "Fortune message not found" });
        expect(FortuneMsg.deleteOne).toHaveBeenCalledWith({ user_id: userId, _id: id });
    });
    it('should handle errors properly', async () => {
        // Mock the find method to throw an error
        FortuneMsg.deleteOne.mockRejectedValue(new Error('Internal server error'));

        const userId = '123';
        const id = '12345';
        const response = await request(app).delete(`/api/fortuneMsg/${userId}?fortune_id=${id}`);
        
        expect(response.status).toBe(500);
        expect(response.body).toEqual({ error: 'Internal server error' });
    });
});

describe('DELETE api/fortuneMsg/:user_id', () => {
    it('should delete all fortune', async () => {
        
        const userId = '123';
        FortuneMsg.deleteMany.mockResolvedValue({deletedCount: 5});
                
        const response = await request(app).delete(`/api/fortuneMsg/${userId}`);

        expect(response.status).toBe(200);
        expect(response.body).toEqual({ message: 'All Fortune messages deleted successfully' });
        expect(FortuneMsg.deleteMany).toHaveBeenCalledWith({ user_id: userId });
    });
    it('should handle errors properly', async () => {
        // Mock the find method to throw an error
        FortuneMsg.deleteMany.mockRejectedValue(new Error('Internal server error'));

        const userId = '123';
        const response = await request(app).delete(`/api/fortuneMsg/${userId}`);
        
        expect(response.status).toBe(500);
        expect(response.body).toEqual({ error: 'Internal server error' });
    });
});



// Close mongoose connection after tests
afterAll(async () => {
    await mongoose.connection.close();
});
