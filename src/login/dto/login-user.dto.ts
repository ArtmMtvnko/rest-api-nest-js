import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsNotEmpty } from 'class-validator'
import { User } from 'src/user/entities/user.entity'
import { Transform } from 'class-transformer'

export class LoginUserDto implements Omit<User, 'id' | 'name'> {
    @ApiProperty({
        description: 'Username which identifies user',
        example: 'jhon_jhonshon42',
        required: true,
    })
    @IsString()
    @Transform(({ value }) => value.trim())
    @IsNotEmpty()
    username: string

    @ApiProperty({
        description: 'Password for account',
        example: 'jhonshon123!',
        required: true,
    })
    @IsString()
    @Transform(({ value }) => value.trim())
    @IsNotEmpty()
    password: string
}
