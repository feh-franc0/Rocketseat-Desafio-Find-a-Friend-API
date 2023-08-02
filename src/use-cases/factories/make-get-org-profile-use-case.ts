import { GetOrgProfileUseCase } from '../get-org-profile'
import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repository'

export function makeGetOrgProfileUseCase() {
  const prismaOrgsRepository = new PrismaOrgsRepository()
  const getOrgProfileUseCase = new GetOrgProfileUseCase(prismaOrgsRepository)

  return getOrgProfileUseCase
}
