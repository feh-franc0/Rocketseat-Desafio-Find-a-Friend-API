import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { ViewPetAdoptionProfileUseCase } from '../view-pet-adoption-profile'
import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repository'

export function makeRegisterUseCase() {
  const prismaPetsRepository = new PrismaPetsRepository()
  const prismaOrgsRepository = new PrismaOrgsRepository()
  const viewPetAdoptionProfileUseCase = new ViewPetAdoptionProfileUseCase(
    prismaPetsRepository,
    prismaOrgsRepository,
  )

  return viewPetAdoptionProfileUseCase
}
