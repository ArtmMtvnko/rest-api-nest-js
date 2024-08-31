import { ApiProperty } from '@nestjs/swagger'

export class CreateUserDto {
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
