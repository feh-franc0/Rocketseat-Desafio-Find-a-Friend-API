import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { registerUseCase } from '@/use-cases/register'

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
    await registerUseCase({
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
