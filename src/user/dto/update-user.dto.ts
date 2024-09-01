import { PartialType } from '@nestjs/mapped-types'
import { CreateUserDto } from './create-user.dto'
import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsOptional, IsString, Validate, ValidateBy } from 'class-validator'
import { Transform } from 'class-transformer'

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @ApiProperty({
        description: 'Username which identifies user',
        example: 'jhon_sm1th',
        required: false
    })
    @IsOptional()
    @IsString()
    @Transform(({ value }) => value.trim())
    @IsNotEmpty()
    username?: string

    @ApiProperty({
        description: 'Name which is shown for other people',
        example: 'Jhon Smith',
        required: false
    })
    @IsOptional()
    @IsString()
    @Transform(({ value }) => value.trim())
    @IsNotEmpty()
    name?: string
}
