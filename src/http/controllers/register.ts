import { FastifyReply, FastifyRequest } from 'fastify'
import { hash } from 'bcryptjs'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    passwordHash: z.string().min(6),
    address: z.string(),
    number: z.string(),
  })

  const { address, email, name, number, passwordHash } =
    registerBodySchema.parse(request.body)

  const password_hash = await hash(passwordHash, 6)

  const userWithSameEmail = await prisma.org.findUnique({
    where: {
      email,
    },
  })

  if (userWithSameEmail) {
    return reply.status(409).send()
  }

  await prisma.org.create({
    data: {
      address,
      email,
      name,
      number,
      password_hash,
    },
  })

  return reply.status(201).send()
}
