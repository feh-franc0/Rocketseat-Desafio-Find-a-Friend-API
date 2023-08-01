import { Pet } from '@prisma/client'
import { PetsRepository } from '@/repositories/pets-repository'

interface IPetRegistryCreateUseCaseRequest {
  age: string
  breed: string
  city: string
  feature: string
  org_id: string
  name: string
}

interface IPetRegistryCreateUseCaseResponse {
  pet: Pet
}

export class PetRegistryCreateUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    org_id,
    name,
    breed,
    age,
    city,
    feature,
  }: IPetRegistryCreateUseCaseRequest): Promise<IPetRegistryCreateUseCaseResponse> {
    const pet = await this.petsRepository.create({
      org_id,
      name,
      breed,
      age,
      city,
      feature,
    })

    return {
      pet,
    }
  }
}
