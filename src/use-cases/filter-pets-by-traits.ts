import { Pet } from '@prisma/client'
import { PetsRepository } from '@/repositories/pets-repository'

interface ISearchPetByCityUseCaseRequest {
  trait: string
  page: number
}

interface ISearchPetByCityUseCaseResponse {
  pets: Pet[]
}

// export class SearchPetByCityUseCase {
export class GetPetByTraitUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    trait,
    page,
  }: ISearchPetByCityUseCaseRequest): Promise<ISearchPetByCityUseCaseResponse> {
    const pets = await this.petsRepository.findByTraits(trait, page)

    if (!pets) {
      throw new Error('Pet not found.')
    }

    return { pets }
  }
}
