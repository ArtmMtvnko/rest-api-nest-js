import { Injectable, NotFoundException } from '@nestjs/common'
import { User } from './entities/user.entity'
import { usersStorage } from 'src/storage/users.storage'
import { v4 as uuid } from 'uuid'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'

@Injectable()
export class UserService {
    async findAll(): Promise<User[]> {
        return usersStorage.users
    }

    async findUnique(id: string): Promise<User | undefined> {
        return usersStorage.users.find(user => user.ID === id)
    }

    async create(createUserDto: CreateUserDto): Promise<User> {
        const user: User = {
            ID: uuid(),
            ...createUserDto,
        }

        usersStorage.users = [...usersStorage.users, user]

        return user
    }

    async delete(id: string): Promise<void> {
        usersStorage.users = usersStorage.users.filter(user => user.ID !== id)
    }

    async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
        const oldUser = usersStorage.users.find(user => user.ID === id)

        if (!oldUser) {
            throw new NotFoundException(`User with id '${id}' was not found`)
        }

        const updatedUser: User = {
            ...oldUser,
            ...updateUserDto,
        }

        usersStorage.users = usersStorage.users.map(user =>
            user.ID === id ? updatedUser : user,
        )

        return updatedUser
    }
}
