import { Org, Pet } from '@prisma/client'
import { PetsRepository } from '@/repositories/pets-repository'
import { OrgsRepository } from '@/repositories/orgs-repository'

interface ISearchPetByCityUseCaseRequest {
  id: string
}

interface ISearchPetByCityUseCaseResponse {
  pet: Pet
  org: Org
  linkWhatsApp: string
}

// export class SearchPetByCityUseCase {
export class ViewPetAdoptionProfileUseCase {
  constructor(
    private petsRepository: PetsRepository,
    private orgsRepository: OrgsRepository,
  ) {}

  async execute({
    id,
  }: ISearchPetByCityUseCaseRequest): Promise<ISearchPetByCityUseCaseResponse> {
    const pet = await this.petsRepository.findById(id)

    if (!pet) {
      throw new Error('Pet not found.')
    }

    const org = await this.orgsRepository.findById(pet.org_id)

    if (!org) {
      throw new Error('Org not found.')
    }

    const sendMessage =
      'olá, gostaria de adotar um Cãopanheiro, como posso prosseguir com a adoção?'
    const numberOfOrg = '15196154641'
    const linkWhatsApp = `https://api.whatsapp.com/send/?phone=${numberOfOrg}&text=${sendMessage}&type=phone_number&app_absent=0`

    return { pet, org, linkWhatsApp }
  }
}
