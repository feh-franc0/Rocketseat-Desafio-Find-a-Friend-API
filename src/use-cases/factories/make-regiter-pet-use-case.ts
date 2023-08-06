import { RegisterPetUseCase } from '../register-pet'
import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'

export function makeRegisterPetUseCase() {
  const prismaPetsRepository = new PrismaPetsRepository()
  const registerPetUseCase = new RegisterPetUseCase(prismaPetsRepository)

  return registerPetUseCase
}
