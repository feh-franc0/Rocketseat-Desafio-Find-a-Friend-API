import { OrgsRepository } from '@/repositories/orgs-repository'
import { hash } from 'bcryptjs'
import { OrgAlreadyExistsError } from './errors/org-already-exists-error'
import { Org } from '@prisma/client'

interface IRegisterOrgUseCaseRequest {
  name: string
  address: string
  number: string
  email: string
  password: string
}

interface IRegisterOrgUseCaseResponse {
  org: Org
}

export class RegisterOrgUseCase {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute({
    email,
    address,
    number,
    name,
    password,
  }: IRegisterOrgUseCaseRequest): Promise<IRegisterOrgUseCaseResponse> {
    const password_hash = await hash(password, 6)

    const userWithSameEmail = await this.orgsRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new OrgAlreadyExistsError()
    }

    const org = await this.orgsRepository.create({
      name,
      address,
      email,
      number,
      password_hash,
    })

    return {
      org,
    }
  }
}
