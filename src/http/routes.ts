import { FastifyInstance } from 'fastify'
import { register } from './controllers/register'
import { authenticate } from './controllers/authenticate'
import { profile } from './controllers/profile'

export async function appRoutes(app: FastifyInstance) {
  app.post('/org', register)
  app.post('/org/sessions', authenticate)

  // Auth
  app.get('/profile', profile)
}
