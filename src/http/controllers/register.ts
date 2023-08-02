import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { OrgAlreadyExistsError } from '@/use-cases/errors/org-already-exists-error'
import { makeRegisterUseCase } from '@/use-cases/factories/make-register-org-use-case'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
    address: z.string(),
    number: z.string(),
  })

  const { address, email, name, number, password } = registerBodySchema.parse(
    request.body,
  )

  try {
    const registerUseCase = makeRegisterUseCase()

    await registerUseCase.execute({
      address,
      email,
      name,
      number,
      password,
    })
  } catch (error) {
    if (error instanceof OrgAlreadyExistsError) {
      return reply.status(409).send({ message: error.message })
    }

    throw error
  }

  return reply.status(201).send()
}
