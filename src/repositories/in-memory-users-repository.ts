import { Prisma } from '@prisma/client'

export class PrismaOrgsRepository {
  public users: Prisma.OrgCreateInput[] = []

  async create(data: Prisma.OrgCreateInput) {
    this.users.push(data)
  }
}
