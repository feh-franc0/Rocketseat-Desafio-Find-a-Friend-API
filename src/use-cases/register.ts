import { prisma } from '@/lib/prisma'
import { OrgsRepository } from '@/repositories/orgs-repository'
import { hash } from 'bcryptjs'
import { OrgAlreadyExistsError } from './errors/org-already-exists-error'

interface IRegisterUseCaseRequest {
  name: string
  address: string
  number: string
  email: string
  password: string
}

export class RegisterUseCase {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute({
    email,
    address,
    number,
    name,
    password,
  }: IRegisterUseCaseRequest) {
    const password_hash = await hash(password, 6)

    const userWithSameEmail = await this.orgsRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new OrgAlreadyExistsError()
    }

    await this.orgsRepository.create({
      name,
      address,
      email,
      number,
      password_hash,
    })
  }
}
