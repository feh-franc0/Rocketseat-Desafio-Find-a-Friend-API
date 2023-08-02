import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'

import { OrgsRepository } from '../orgs-repository'
import { PetsRepository } from '../pets-repository'
import { GetResult } from '@prisma/client/runtime/library'

export class PrismaOrgsRepository implements PetsRepository {
  async findById(id: string) {
    const pet = await prisma.pet.findUnique({
      where: {
        id,
      },
    })

    return pet
  }

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = await prisma.pet.create({
      data,
    })

    return pet
  }

  async findPetsWithFilters(
    city: string,
    page: number,
    feature?: string | undefined,
    breed?: string | undefined,
    age?: string | undefined,
  ) {
    const filteredPets = await prisma.pet.findMany({
      where: {
        city,
        ...(feature && { feature: { contains: feature } }),
        ...(breed && { breed }),
        ...(age && { age }),
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    return filteredPets
  }
}
