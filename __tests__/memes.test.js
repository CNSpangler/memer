require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');

describe('memes routes', () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  it('creates a meme', () => {
    return request(app)
      .post('/api/v1/memes')
      .send({
        top: 'My instructor went to topeka',
        image: '../../assets/facebook-server-farm-arctic-lule-sweden-12.jpg',
        bottom: '...and all I got was this stupid meme.'
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          top: 'My instructor went to topeka',
          image: '../../assets/facebook-server-farm-arctic-lule-sweden-12.jpg',
          bottom: '...and all I got was this stupid meme.',
          __v: 0
        });
      });
  });
});
