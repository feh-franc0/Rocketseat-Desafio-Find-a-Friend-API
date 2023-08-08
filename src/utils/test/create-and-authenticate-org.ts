import { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function createAndAuthenticateOrg(app: FastifyInstance) {
  await request(app.server).post('/org').send({
    name: 'John Doe',
    email: 'johndor@example.com',
    password: '123456',
    address: 'rua dos devs',
    number: '21 9 1020-3040',
  })

  const authResponse = await request(app.server).post('/org/sessions').send({
    email: 'johndor@example.com',
    password: '123456',
  })

  const { token } = authResponse.body

  return { token }
}
