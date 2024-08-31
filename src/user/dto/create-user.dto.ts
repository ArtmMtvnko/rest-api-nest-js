import { ApiProperty } from '@nestjs/swagger'
import { User } from '../entities/user.entity'

export class CreateUserDto implements Omit<User, 'id'> {
    @ApiProperty({
        description: 'Username which identifies user',
        example: 'jhon_jhonshon42',
        required: true
    })
    username: string

    @ApiProperty({
        description: 'Name which is shown for other people',
        example: 'Jhon Jhonshon',
        required: true
    })
    name: string
}
