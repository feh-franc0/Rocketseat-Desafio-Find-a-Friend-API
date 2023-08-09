import { makeAdoptedUseCase } from '@/use-cases/factories/make-adopted-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function adopted(request: FastifyRequest, reply: FastifyReply) {
  const adoptedQuerySchema = z.object({
    id: z.string().uuid(),
  })

  const { id } = adoptedQuerySchema.parse(request.params)

  const getPetsProfile = makeAdoptedUseCase()

  const { pet } = await getPetsProfile.execute({
    id,
  })

  return reply.status(200).send({
    pet: {
      pet,
    },
  })
}
