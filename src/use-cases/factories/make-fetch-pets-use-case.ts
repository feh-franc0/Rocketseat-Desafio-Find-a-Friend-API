import { FetchPetsUseCase } from '../fetch-pets'
import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'

export function makeFetchPetsUseCase() {
  const prismaPetsRepository = new PrismaPetsRepository()
  const fetchPetsUseCase = new FetchPetsUseCase(prismaPetsRepository)

  return fetchPetsUseCase
}
