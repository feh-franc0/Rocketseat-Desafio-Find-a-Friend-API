import { FastifyReply, FastifyRequest } from 'fastify'

export function verifyOrgRole(roleToVerify: 'ADMIN' | 'COMPANY') {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    const { role } = request.user

    if (role !== roleToVerify) {
      return reply.status(401).send({ message: 'Unauthorized.' })
    }
  }
}
