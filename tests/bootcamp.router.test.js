const request = require('supertest');
const app = require('../server/index');
const connDB = require('../server/common/mongodb');
connDB();

let token;

beforeEach(() => {});

describe('Post Endpoints', () => {
	test('should create a new post', async () => {
		const res = await request(app)
			.post('/api/v1/bootcamps')
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.send({
				userId: 1,
				title: 'test is cool',
			});
		expect(res.headers).toHaveProperty('content-type', 'application/json');
		expect(res.statusCode).toEqual(201);
		expect(res.body).toHaveProperty('success', true);
		expect(res.body).toHaveProperty('data');
	});

	test('should get bootcamps list ', async () => {
		const res = await request(app)
			.get('/api/v1/bootcamps')
			.set('Accept', 'application/json');
		expect(res.statusCode).toEqual(200);
		// expect(res.body).toHaveProperty('post');
	}, 30000);

	test('should get a bootcamp ', async () => {
		const res = await request(app)
			.get('/api/v1/bootcamps/:id')
			.set('Accept', 'application/json');
		expect(res.statusCode).toEqual(200);
		// expect(res.body).toHaveProperty('post');
	}, 30000);

	test('should update a post', async () => {
		const res = await request(app)
			.put('/api/v1/bootcamps/:id')
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json');

		expect(res.statusCode).toEqual(200);
		// expect(res.body).toHaveProperty('post');
	});

	test('should delete a post', async () => {
		const res = await request(app)
			.delete('/api/v1/bootcamps/:id')
			.set('Accept', 'application/json');

		expect(res.statusCode).toEqual(200);
		// expect(res.body).toHaveProperty('post');
	});
});
