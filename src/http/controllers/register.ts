import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { RegisterUseCase } from '@/use-cases/register'
import { PrismaOrgsRepository } from '@/repositories/prisma-users-repository'

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
    const prismaOrgsRepository = new PrismaOrgsRepository()
    const registerUseCase = new RegisterUseCase(prismaOrgsRepository)

    await registerUseCase.execute({
      address,
      email,
      name,
      number,
      password,
    })
  } catch (error) {
    return reply.status(409).send()
  }

  return reply.status(201).send()
}
