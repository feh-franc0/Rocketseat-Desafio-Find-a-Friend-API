import fastify from 'fastify'
import { z } from 'zod'
import { prisma } from './lib/prisma'

export const app = fastify()

app.post('/org', async (request, reply) => {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    passwordHash: z.string().min(6),
    address: z.string(),
    number: z.string(),
  })

  const { address, email, name, number, passwordHash } =
    registerBodySchema.parse(request.body)

  await prisma.org.create({
    data: {
      address,
      email,
      name,
      number,
      password_hash: passwordHash,
    },
  })

  return reply.status(201).send()
})
