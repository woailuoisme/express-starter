const request = require('supertest');
const app = require('../../server/index');
class BaseEndpointTest {
  // constructor() {}
  static async showTest() {
    const res = await request(app).get('/api/v1/bootcamps/:id').set('Accept', 'application/json').send();
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('success', true);
    expect(res.body.data).not.toBeNull();
  }

  indexTest() {}
}
BaseEndpointTest.showTest();
module.exports = BaseEndpointTest;
