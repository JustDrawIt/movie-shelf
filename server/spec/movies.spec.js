require('dotenv').config();
const axios = require('axios');
const { expect } = require('chai');

const { Movie } = require('../database');

const { PORT } = process.env;
const endpoint = `http://localhost:${PORT}/movies`;

describe('movies', () => {
  const movieId = 4545;

  beforeEach((done) => {
    new Movie({ movieId })
      .save()
      .then(() => done());
  });

  afterEach((done) => {
    Movie.findOneAndRemove({ movieId })
      .exec()
      .then(() => done());
  });

  describe('on get', () => {
    it('returns all the movies', (done) => {
      axios.get(endpoint)
        .then((response) => {
          expect(response.status).to.equal(200);
          expect(response.data.error).to.be.null;
          expect(response.data.data).to.be.an('array');
          expect(response.data.data[0].movieId).to.equal(movieId);

          done();
        });
    });
  });

  describe('on post', () => {
  });

  describe('on put', () => {
  });

  describe('on delete', () => {
  });
});