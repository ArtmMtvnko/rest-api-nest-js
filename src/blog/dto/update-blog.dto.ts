import { OmitType, PartialType } from '@nestjs/mapped-types'
import { CreateBlogDto } from './create-blog.dto'
import { ApiProperty } from '@nestjs/swagger'

export class UpdateBlogDto extends OmitType(PartialType(CreateBlogDto), ['userID']) {
    @ApiProperty({
        description: 'Header of a blog',
        example: 'Vacation in Italy',
        required: false
    })
    title?: string | undefined

    @ApiProperty({
        description: 'Main content of a blog',
        example: 'Today, I am going to share with you about my recent experience in Italy',
        required: false
    })
    content?: string | undefined
    
    @ApiProperty({
        description: 'Amount of likes which was set on the blog',
        example: '10',
        required: false
    })
    likes?: number
}
