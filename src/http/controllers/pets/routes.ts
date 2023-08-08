import { FastifyInstance } from 'fastify'

import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { create } from './create'
import { fetchPets } from './fetch-pets'
import { profile } from './profile'
import { verifyOrgRole } from '@/http/middlewares/verify-org-role'

export async function petsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.post('/pet/register', { onRequest: [verifyOrgRole('ADMIN')] }, create)
  app.get('/pet/fetchPets', fetchPets)
  app.get('/pet/profile/:id', profile)
}
