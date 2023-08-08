import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateOrg } from '@/utils/test/create-and-authenticate-org'

describe('Create Pet (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })

  it('should be able to create pet', async () => {
    const { token } = await createAndAuthenticateOrg(app, true)

    const response = await request(app.server)
      .post('/pet/register')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'John Doe',
        age: '2',
        breed: 'golden',
        city: 'RJ',
        feature: 'carinhoso e agitado',
      })

    expect(response.statusCode).toEqual(201)
  })
})
