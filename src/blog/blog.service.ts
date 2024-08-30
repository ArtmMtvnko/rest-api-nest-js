import { Injectable } from '@nestjs/common'
import { Blog } from './entities/blog.entity'
import { blogsStorage } from 'src/storage/blogs.storage'
import { UUID } from 'crypto'

@Injectable()
export class BlogService {
    async findAll(): Promise<Blog[]> {
        return blogsStorage
    }

    async findUnique(id: UUID): Promise<Blog | undefined> {
        return blogsStorage.find(blog => blog.ID === id)
    }
}
