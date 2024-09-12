import { Injectable, NotFoundException } from '@nestjs/common'
import { User } from './entities/user.entity'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { UserRepository } from './user.repository'
import { BcryptService } from 'src/services/bcrypt.service'

@Injectable()
export class UserService {
    private readonly repository: UserRepository
    private readonly bcryptService: BcryptService

    constructor(repository: UserRepository, bcryptService: BcryptService) {
        this.repository = repository
        this.bcryptService = bcryptService
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
        const passwordHash = await this.bcryptService.hashPassword(createUserDto.password)
        
        return await this.repository.create({
            ...createUserDto,
            password: passwordHash
        })
    }

    async delete(id: string): Promise<void> {
        await this.repository.delete(id)
    }

    async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
        return await this.repository.update(id, updateUserDto)
    }
}
