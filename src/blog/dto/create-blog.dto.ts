import { ApiProperty } from '@nestjs/swagger'
import { Blog } from '../entities/blog.entity'
import { IsNotEmpty, IsString } from 'class-validator'
import { Transform } from 'class-transformer'

export class CreateBlogDto implements Omit<Blog, 'id' | 'authorId' | 'likes'> {
    @ApiProperty({
        description: 'Header of a blog',
        example: 'Vacation in Cyprus',
        required: true
    })
    @IsString()
    @Transform(({ value }) => value.trim())
    @IsNotEmpty()
    title: string

    @ApiProperty({
        description: 'Main content of a blog',
        example: 'Today I am going to share with you about my recent experience in Cyprus',
        required: true
    })
    @IsString()
    @IsNotEmpty()
    content: string

    @ApiProperty({
        description: 'ID of which user added a blog',
        example: '9173ccac-7a49-40d8-8bb5-6bbbf9b78960',
        required: true
    })
    @IsString()
    @Transform(({ value }) => value.trim())
    @IsNotEmpty()
    authorId: string
}