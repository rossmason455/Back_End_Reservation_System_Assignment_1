const request = require('supertest');
const app = require('../server');
const { sequelize, User, Token } = require('../models');


describe('User / Auth Endpoints', () => {
  let authToken;
  let userId;

  const testUser = {
    username: 'testuser',
    email: 'testuser@example.com',
    password: 'password123',
    phone: '1234567890',
    role: 'user',
  };


    /* ************************ REGISTER ************************ */
  it('should register a new user', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send(testUser);

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('token');
    userId = res.body.id;
  });

  it('should fail to register with missing fields', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({ email: 'invalid@example.com' }); 

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('errors');
  });

});

