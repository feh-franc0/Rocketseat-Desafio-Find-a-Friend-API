import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateOrg } from '@/utils/test/create-and-authenticate-org'
import { prisma } from '@/lib/prisma'

describe('Create Pet (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })

  it('should be able to create pet', async () => {
    const { token } = await createAndAuthenticateOrg(app)

    const org = await prisma.org.findFirstOrThrow()

    const pet = await prisma.pet.create({
      data: {
        name: 'John Doe',
        age: '2',
        breed: 'golden',
        city: 'RJ',
        feature: 'carinhoso e agitado',
        org_id: org.id,
      },
    })

    const response = await request(app.server)
      .get(`/pet/profile/${pet.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.pet).toEqual({
      pet: expect.objectContaining({
        name: 'John Doe',
        age: '2',
        breed: 'golden',
        city: 'RJ',
        feature: 'carinhoso e agitado',
      }),
    })
  })
})
