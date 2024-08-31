import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    NotFoundException,
    Param,
    Post,
    Put,
} from '@nestjs/common'
import { UserService } from './user.service'
import { User } from './entities/user.entity'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { ApiParam, ApiTags } from '@nestjs/swagger'

@Controller('users')
@ApiTags('Users')
export class UserController {
    private readonly userService: UserService

    constructor(userService: UserService) {
        this.userService = userService
    }

    @Get()
    async findAll(): Promise<User[]> {
        return await this.userService.findAll()
    }

    @Get(':id')
    @ApiParam({ name: 'id', example: '9173ccac-7a49-40d8-8bb5-6bbbf9b78960' })
    async findUnique(@Param('id') id: string): Promise<User> {
        const user = await this.userService.findUnique(id)

        if (!user) {
            throw new NotFoundException(`User with id '${id}' was not found`)
        }

        return user
    }

    @Post()
    async create(@Body() body: CreateUserDto): Promise<User> {
        return await this.userService.create(body)
    }

    @Delete(':id')
    @HttpCode(204)
    @ApiParam({ name: 'id', example: '9173ccac-7a49-40d8-8bb5-6bbbf9b78960' })
    async delete(@Param('id') id: string): Promise<void> {
        await this.userService.delete(id)
    }

    @Put(':id')
    @ApiParam({ name: 'id', example: '9173ccac-7a49-40d8-8bb5-6bbbf9b78960' })
    async update(
        @Param('id') id: string,
        @Body() body: UpdateUserDto,
    ): Promise<User> {
        return await this.userService.update(id, body)
    }
}
