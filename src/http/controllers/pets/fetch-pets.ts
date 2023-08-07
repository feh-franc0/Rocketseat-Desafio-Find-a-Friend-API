import { makeFetchPetsUseCase } from '@/use-cases/factories/make-fetch-pets-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function fetchPets(request: FastifyRequest, reply: FastifyReply) {
  const fetchPetProfile = makeFetchPetsUseCase()

  const registerBodySchema = z.object({
    city: z.string(),
    page: z.number().default(1),
    age: z.string(),
    breed: z.string(),
    feature: z.string(),
  })

  const { city, page, age, breed, feature } = registerBodySchema.parse(
    request.query,
  )

  const { pets } = await fetchPetProfile.execute({
    city,
    page,
    age,
    breed,
    feature,
  })

  return reply.status(200).send({
    pets: {
      pets,
    },
  })
}
