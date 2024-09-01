import { Injectable, NotFoundException } from '@nestjs/common'
import { User } from './entities/user.entity'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { UserRepository } from './user.repository'

@Injectable()
export class UserService {
    private readonly repository: UserRepository

    constructor(repository: UserRepository) {
        this.repository = repository
    }
    
    async findAll(): Promise<User[]> {
        return await this.repository.findAll()
    }

    async findUnique(id: string): Promise<User> {
        const user = await this.repository.findUnique(id)

        if (!user) {
            throw new NotFoundException(`User with id '${id}' was not found`)
        }

        return user
    }

    async create(createUserDto: CreateUserDto): Promise<User> {
        return await this.repository.create(createUserDto)
    }

    async delete(id: string): Promise<void> {
        await this.repository.delete(id)
    }

    async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
        return await this.repository.update(id, updateUserDto)
    }
}
