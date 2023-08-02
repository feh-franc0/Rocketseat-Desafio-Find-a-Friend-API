import { Pet } from '@prisma/client'
import { PetsRepository } from '@/repositories/pets-repository'

interface IRegisterPetUseCaseRequest {
  age: string
  breed: string
  city: string
  feature: string
  org_id: string
  name: string
}

interface IRegisterPetUseCaseResponse {
  pet: Pet
}

export class RegisterPetUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    org_id,
    name,
    breed,
    age,
    city,
    feature,
  }: IRegisterPetUseCaseRequest): Promise<IRegisterPetUseCaseResponse> {
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
