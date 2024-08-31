import { PartialType } from '@nestjs/mapped-types'
import { CreateUserDto } from './create-user.dto'
import { ApiProperty } from '@nestjs/swagger'

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @ApiProperty({
        description: 'Username which identifies user',
        example: 'jhon_sm1th',
        required: false
    })
    username?: string | undefined

    @ApiProperty({
        description: 'Name which is shown for other people',
        example: 'Jhon Smith',
        required: false
    })
    name?: string | undefined
}
