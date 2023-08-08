import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'
import { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function createAndAuthenticateOrg(
  app: FastifyInstance,
  isAdmin = false,
) {
  await prisma.org.create({
    data: {
      name: 'John Doe',
      email: 'johndor@example.com',
      password_hash: await hash('123456', 6),
      address: 'rua dos devs',
      number: '21 9 1020-3040',
      role: isAdmin ? 'ADMIN' : 'COMPANY',
    },
  })

  const authResponse = await request(app.server).post('/org/sessions').send({
    email: 'johndor@example.com',
    password: '123456',
  })

  const { token } = authResponse.body

  return { token }
}
