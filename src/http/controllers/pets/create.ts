import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeRegisterPetUseCase } from '@/use-cases/factories/make-regiter-pet-use-case'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    age: z.string(),
    breed: z.string(),
    city: z.string(),
    feature: z.string(),
    name: z.string(),
  })

  const { age, breed, city, feature, name } = registerBodySchema.parse(
    request.body,
  )

  const registerUseCase = makeRegisterPetUseCase()

  await registerUseCase.execute({
    age,
    breed,
    city,
    feature,
    name,
    org_id: request.user.sub,
  })

  return reply.status(201).send()
}
