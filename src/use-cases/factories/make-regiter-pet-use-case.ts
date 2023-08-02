import { RegisterPetUseCase } from '../register-pet'
import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'

export function makeRegisterUseCase() {
  const prismaPetsRepository = new PrismaPetsRepository()
  const registerPetUseCase = new RegisterPetUseCase(prismaPetsRepository)

  return registerPetUseCase
}
