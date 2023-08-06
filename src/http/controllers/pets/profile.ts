import { makeViewPetAdoptionUseCase } from '@/use-cases/factories/make-view-pet-adoption-profile-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function profile(request: FastifyRequest, reply: FastifyReply) {
  const getPetsProfile = makeViewPetAdoptionUseCase()

  console.log(request.user)

  const { pet } = await getPetsProfile.execute({
    id: request.user.sub,
  })

  return reply.status(200).send({
    pet: {
      pet,
    },
  })
}
