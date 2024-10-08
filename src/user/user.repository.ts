import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { User } from './entities/user.entity'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'

@Injectable()
export class UserRepository {
    private readonly prisma: PrismaService
    private selectParams: Record<keyof User, boolean> = {
        id: true,
        username: true,
        name: true
    }

    constructor(prisma: PrismaService) {
        this.prisma = prisma
    }

    async findAll(): Promise<User[]> {
        return await this.prisma.user.findMany({
            select: this.selectParams,
        })
    }

    async findUnique(id: string): Promise<User | null> {
        return await this.prisma.user.findUnique({
            where: { id },
            select: this.selectParams,
        })
    }

    async create(createUserDto: CreateUserDto): Promise<User> {
        return await this.prisma.user.create({
            data: createUserDto,
            select: this.selectParams,
        })
    }

    async delete(id: string): Promise<void> {
        await this.prisma.user.delete({ where: { id } })
    }

    async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
        return await this.prisma.user.update({
            where: { id },
            data: updateUserDto,
            select: this.selectParams,
        })
    }
}
