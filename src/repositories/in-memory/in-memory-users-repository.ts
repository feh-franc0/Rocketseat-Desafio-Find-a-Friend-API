import { Org, Prisma } from '@prisma/client'
import { OrgsRepository } from '../orgs-repository'

export class InMemoryOrgsRepository implements OrgsRepository {
  public items: Org[] = []

  async findByEmail(email: string) {
    const org = this.items.find((item) => item.email === email)

    if (!org) {
      return null
    }

    return org
  }

  async create(data: Prisma.OrgCreateInput) {
    const org = {
      id: 'user-1',
      name: data.name,
      email: data.email,
      address: data.address,
      number: data.number,
      password_hash: data.password_hash,
    }

    this.items.push(org)

    return org
  }
}
