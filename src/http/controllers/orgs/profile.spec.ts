import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Profile (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })

  it('should be able to get org profile  ', async () => {
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

    const profileResponse = await request(app.server)
      .get('/org/profile')
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(profileResponse.statusCode).toEqual(200)
    expect(profileResponse.body.org).toEqual(
      expect.objectContaining({
        email: 'johndor@example.com',
      }),
    )
  })
})
