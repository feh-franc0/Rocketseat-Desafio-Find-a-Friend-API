import { FastifyInstance } from 'fastify'

import { verifyJWT } from '@/http/middlewares/verify-jwt'

import { register } from './register'
import { authenticate } from './authenticate'
import { profile } from './profile'
import { refresh } from './refresh'

export async function orgsRoutes(app: FastifyInstance) {
  app.post('/org', register)
  app.post('/org/sessions', authenticate)

  app.patch('/org/token/refresh', refresh)

  // Auth
  app.get('/org/profile', { onRequest: [verifyJWT] }, profile)
}
