import { ApiProperty } from '@nestjs/swagger'

export class CreateBlogDto {
    @ApiProperty({
        description: 'Header of a blog',
        example: 'Vacation in Cyprus',
        required: true
    })
    title: string

    @ApiProperty({
        description: 'Main content of a blog',
        example: 'Today I am going to share with you about my recent experience in Cyprus',
        required: true
    })
    content: string

    @ApiProperty({
        description: 'ID of which user added a blog',
        example: '9173ccac-7a49-40d8-8bb5-6bbbf9b78960',
        required: true
    })
    userID: string
}