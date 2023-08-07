import { FastifyInstance } from 'fastify'

import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { create } from './create'
import { fetchPets } from './fetch-pets'
import { profile } from './profile'

export async function petsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.post('/pet/register', create)
  app.get('/pet/fetchPets', fetchPets)
  app.get('/pet/profile/:id', profile)
}
