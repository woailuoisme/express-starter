const request = require('supertest');
const app = require('../server/index');
const connDB = require('../server/common/mongodb');
connDB();

let token;

beforeEach(() => {});

describe('Bootcamps Endpoints : /api/v1/bootcamps', () => {
	describe('Endpoint: POST /api/v1/boottcamps', () => {
		test('should create a new bootcamp for correctness', async () => {
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
	});

	describe('Endpoint: GET /api/v1/boottcamps', () => {
		test('should get bootcamps list ', async () => {
			const res = await request(app)
				.get('/api/v1/bootcamps')
				.set('Accept', 'application/json');
			expect(res.statusCode).toEqual(200);
			expect(res.body).toHaveProperty('success', true);
			// expect(res.body).toHaveProperty('post');
		}, 30000);
	});

	describe('Endpoint: GET /api/v1/boottcamps/:id', function() {
		test('should get single bootcamp ', async () => {
			const res = await request(app)
				.get('/api/v1/bootcamps/:id')
				.set('Accept', 'application/json');
			expect(res.statusCode).toEqual(200);
			expect(res.body).toHaveProperty('success', true);
			expect(res.body.data).not.toBeNull();
		}, 30000);
	});

	describe('Endpoint: PUT /api/v1/boottcamps/:id', function() {
		test('should update single post', async () => {
			const res = await request(app)
				.put('/api/v1/bootcamps/:id')
				.set('Content-Type', 'application/json')
				.set('Accept', 'application/json');

			expect(res.statusCode).toEqual(200);
			expect(res.body).toHaveProperty('success', true);
		});
	});
	describe('Endpoint: Delete /api/v1/boottcamps/:id', function() {
		test('should delete single post', async () => {
			const res = await request(app)
				.delete('/api/v1/bootcamps/:id')
				.set('Accept', 'application/json');

			expect(res.statusCode).toEqual(200);
			expect(res.body).toHaveProperty('success', true);
		});
	});
});
