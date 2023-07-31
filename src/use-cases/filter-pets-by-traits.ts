import { Pet } from '@prisma/client'
import { PetsRepository } from '@/repositories/pets-repository'

interface ISearchPetByCityUseCaseRequest {
  trait: string
}

interface ISearchPetByCityUseCaseResponse {
  pet: Pet[]
}

// export class SearchPetByCityUseCase {
export class GetPetByTraitUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    trait,
  }: ISearchPetByCityUseCaseRequest): Promise<ISearchPetByCityUseCaseResponse> {
    const pet = await this.petsRepository.findByTraits(trait)

    if (!pet) {
      throw new Error('Pet not found.')
    }

    return { pet }
  }
}
