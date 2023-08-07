import { makeViewPetAdoptionUseCase } from '@/use-cases/factories/make-view-pet-adoption-profile-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function profile(request: FastifyRequest, reply: FastifyReply) {
  const searchPetProfileQuerySchema = z.object({
    id: z.string().uuid(),
  })

  const { id } = searchPetProfileQuerySchema.parse(request.params)

  const getPetsProfile = makeViewPetAdoptionUseCase()

  const { pet } = await getPetsProfile.execute({
    id,
  })

  return reply.status(200).send({
    pet: {
      pet,
    },
  })
}
