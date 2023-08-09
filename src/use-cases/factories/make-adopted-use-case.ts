import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { AdoptedUseCase } from '../adopted'

export function makeAdoptedUseCase() {
  const prismaPetsRepository = new PrismaPetsRepository()
  const adoptedUseCase = new AdoptedUseCase(prismaPetsRepository)

  return adoptedUseCase
}
