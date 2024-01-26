const { describe, it, after, before } = require('mocha')
const supertest = require('supertest')
const assert = require('assert')
let app

describe('API Suite test', () => {
  before((done) => {
    app = require('./api')
    app.once('listening', done)
  })
  
  after((done) => app.close(done))

  describe('/contact:get', () => {
    it('should request the contact route and return HTTP Status 200', async () => {
      const response = await supertest(app)
        .get('/contact')
        .expect(200)

      assert.strictEqual(response.text, 'contact us page')
    })
  })

  describe('/login:post', () => {
    it('should request the login route and return HTTP Status 200', async () => {
      const response = await supertest(app)
        .post('/login')
        .send({ username: 'davidson', password: '123'})
        .expect(200)

      assert.strictEqual(response.text, 'Log in successed!')
    })
    it('should request the login route and return HTTP Status 401', async () => {
      const response = await supertest(app)
        .post('/login')
        .send({ username: 'davidson', password: '23'})
        .expect(401)

      assert.strictEqual(response.text, 'Log in failed!')
      assert.ok(response.unauthorized)
    })
  })

  describe('/hi:get -404', () => {
    it('should request the contact route and return HTTP Status 404', async () => {
      const response = await supertest(app)
        .get('/hi')
        .expect(404)

      assert.strictEqual(response.text, 'not found')
    })
  })
})