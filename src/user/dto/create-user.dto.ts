import { IsNotEmpty, IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
import { User } from '../entities/user.entity'
import { Transform } from 'class-transformer'

export class CreateUserDto implements Omit<User, 'id'> {
    @ApiProperty({
        description: 'Username which identifies user',
        example: 'jhon_jhonshon42',
        required: true
    })
    @IsString()
    @Transform(({ value }) => value.trim())
    @IsNotEmpty()
    username: string

    @ApiProperty({
        description: 'Name which is shown for other people',
        example: 'Jhon Jhonshon',
        required: true
    })
    @IsString()
    @Transform(({ value }) => value.trim())
    @IsNotEmpty()
    name: string
}
