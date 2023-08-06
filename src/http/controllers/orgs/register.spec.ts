import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Register (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })

  it('should be able to register', async () => {
    const response = await request(app.server).post('/org').send({
      name: 'John Doe',
      email: 'johndor@example.com',
      password: '123456',
      address: 'rua dos devs',
      number: '21 9 1020-3040',
    })

    expect(response.statusCode).toEqual(201)
  })
})
