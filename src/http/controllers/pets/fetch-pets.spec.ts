import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateOrg } from '@/utils/test/create-and-authenticate-org'
import { prisma } from '@/lib/prisma'

describe('Fetch Pets (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })

  it('should be able to fetch pets', async () => {
    const { token } = await createAndAuthenticateOrg(app)

    const org = await prisma.org.findFirstOrThrow()

    await prisma.pet.createMany({
      data: [
        {
          name: 'timbo',
          age: '1',
          breed: 'golden',
          city: 'RJ',
          feature: 'carinhoso e agitado',
          org_id: org.id,
        },
        {
          name: 'lipe',
          age: '2',
          breed: 'golden',
          city: 'RJ',
          feature: 'amigavel, docil e fofo',
          org_id: org.id,
        },
        {
          name: 'marques',
          age: '3',
          breed: 'golden',
          city: 'SP',
          feature: 'bravo e quieto',
          org_id: org.id,
        },
      ],
    })

    const response = await request(app.server)
      .get('/pet/fetchPets')
      .query({
        city: 'RJ',
        page: 1,
        age: '',
        breed: '',
        feature: '',
      })
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.pets.pets).toHaveLength(2)
    expect(response.body.pets).toEqual({
      pets: expect.arrayContaining([
        expect.objectContaining({
          name: 'timbo',
          age: '1',
          breed: 'golden',
          city: 'RJ',
          feature: 'carinhoso e agitado',
        }),
        expect.objectContaining({
          name: 'lipe',
          age: '2',
          breed: 'golden',
          city: 'RJ',
          feature: 'amigavel, docil e fofo',
        }),
      ]),
    })
  })
})
