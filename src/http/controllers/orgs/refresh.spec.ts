import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Refresh tokenn (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })

  it('should be able to refresh a token  ', async () => {
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

    const cookie = authResponse.get('Set-Cookie')

    const response = await request(app.server)
      .patch('/org/token/refresh')
      .set('Cookie', cookie)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual({
      token: expect.any(String),
    })
    expect(response.get('Set-Cookie')).toEqual([
      expect.stringContaining('refreshToken='),
    ])
  })
})
