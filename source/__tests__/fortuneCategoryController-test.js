const controller = require('../backend/controllers/fortuneCategoryController.js')
const httpMocks = require('node-mocks-http');
jest.mock('../backend/controllers/fortuneCategoryController.js')

test('controller can be called', async () => {
  let req, res;

  beforeEach(() => {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
  });

  it('should return categories when the database query is successful', async () => {
    const categories = [{ name: 'Love' }, { name: 'Career' }];
    controller.find.mockResolvedValue(categories);

    await getFortuneCategories(req, res);

    expect(res.statusCode).toBe(200);
    expect(res._getJSONData()).toEqual(categories);
  });
  
  it('should return 500 when the database query fails', async () => {
    FortuneCategory.find.mockRejectedValue(new Error('Database error'));

    await getFortuneCategories(req, res);

    expect(res.statusCode).toBe(500);
    expect(res._getJSONData()).toEqual({ error: 'Internal server error' });
  });
});


// npx jest __tests__/controllers-test.js


// jest.mock('https');

// test('fetches successfully data from an API', async () => {
//   const data = { id: 1, name: 'John Doe' };
//   const mockResponse = JSON.stringify(data);

//   https.get.mockImplementation((url, callback) => {
//     const res = {
//       on: (event, handler) => {
//         if (event === 'data') {
//           handler(mockResponse);
//         } else if (event === 'end') {
//           handler();
//         }
//       },
//     };
//     callback(res);
//     return { on: jest.fn() };
//   });

//   const result = await fetchData('https://api.example.com/user/1');
//   expect(result).toEqual(data);
// });

// test('fetches erroneously data from an API', async () => {
//   https.get.mockImplementation((url, callback) => {
//     const res = {
//       on: jest.fn(),
//     };
//     callback(res);
//     return {
//       on: (event, handler) => {
//         if (event === 'error') {
//           handler(new Error('API call failed'));
//         }
//       },
//     };
//   });

//   await expect(fetchData('https://api.example.com/user/1')).rejects.toThrow('API call failed');
// });