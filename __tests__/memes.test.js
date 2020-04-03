require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const Meme = require('../lib/models/Meme');

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
        top: 'My instructor went to Topeka',
        image: '../../assets/facebook-server-farm-arctic-lule-sweden-12.jpg',
        bottom: '...and all I got was this stupid meme.'
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          top: 'My instructor went to Topeka',
          image: '../../assets/facebook-server-farm-arctic-lule-sweden-12.jpg',
          bottom: '...and all I got was this stupid meme.',
          __v: 0
        });
      });
  });

  it('gets all memes', async() => {
    const memes = await Meme.create([
      {
        top: 'My instructor went to Topeka',
        image: '../../assets/facebook-server-farm-arctic-lule-sweden-12.jpg',
        bottom: '...and all I got was this stupid meme.'
      },
      {
        top: 'I am serious.',
        image: 'doge.jpg',
        bottom: 'Dogs are better than people.'
      },
      {
        top: 'Spot',
        image: 'spot.jpg',
        bottom: 'if you don\'t know, now you know.'
      }
    ]);

    return request(app)
      .get('/api/v1/memes')
      .then(res => {
        memes.forEach(meme => {
          expect(res.body).toContainEqual({
            _id: meme._id.toString(),
            top: meme.top,
            image: meme.image,
            bottom: meme.bottom,
            __v: 0
          });
        });
      });
  });

  it('gets a meme by id', async() => {
    const meme = await Meme.create(
      {
        top: 'My instructor went to Topeka',
        image: '../../assets/facebook-server-farm-arctic-lule-sweden-12.jpg',
        bottom: '...and all I got was this stupid meme.'
      });

    return request(app)
      .get(`/api/v1/memes/${meme._id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          top: 'My instructor went to Topeka',
          image: '../../assets/facebook-server-farm-arctic-lule-sweden-12.jpg',
          bottom: '...and all I got was this stupid meme.',
          __v: 0   
        });
      });
  });
});
