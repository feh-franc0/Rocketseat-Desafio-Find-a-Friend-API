import { prisma } from '@/lib/prisma'
import { PrismaOrgsRepository } from '@/repositories/prisma-users-repository'
import { hash } from 'bcryptjs'

interface IRegisterUseCaseRequest {
  name: string
  address: string
  number: string
  email: string
  password: string
}

export async function registerUseCase({
  email,
  address,
  number,
  name,
  password,
}: IRegisterUseCaseRequest) {
  const password_hash = await hash(password, 6)

  const userWithSameEmail = await prisma.org.findUnique({
    where: {
      email,
    },
  })

  if (userWithSameEmail) {
    throw new Error('E-mail already exists')
  }

  const prismaOrgsRepository = new PrismaOrgsRepository()

  await prismaOrgsRepository.create({
    name,
    address,
    email,
    number,
    password_hash,
  })
}
