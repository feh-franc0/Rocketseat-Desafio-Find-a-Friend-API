import { Pet } from '@prisma/client'
import { PetsRepository } from '@/repositories/pets-repository'

interface ISearchPetByCityUseCaseRequest {
  id: string
}

interface ISearchPetByCityUseCaseResponse {
  pet: Pet
}

// export class SearchPetByCityUseCase {
export class GetPetByIdUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    id,
  }: ISearchPetByCityUseCaseRequest): Promise<ISearchPetByCityUseCaseResponse> {
    const pet = await this.petsRepository.findById(id)

    if (!pet) {
      throw new Error('Pet not found.')
    }

    return { pet }
  }
}
