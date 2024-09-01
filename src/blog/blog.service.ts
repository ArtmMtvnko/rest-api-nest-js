import { Injectable } from '@nestjs/common'
import { Blog } from './entities/blog.entity'
import { CreateBlogDto } from './dto/create-blog.dto'
import { UpdateBlogDto } from './dto/update-blog.dto'
import { BlogRepository } from './blog.repository'

@Injectable()
export class BlogService {
    private readonly repository: BlogRepository

    constructor(repository: BlogRepository) {
        this.repository = repository
    }

    async findAll(): Promise<Blog[]> {
        return await this.repository.findAll()
    }

    async findUnique(id: string): Promise<Blog | null> {
        return await this.repository.findUnique(id)
    }

    async create(createBlogDto: CreateBlogDto): Promise<Blog> {
        return await this.repository.create(createBlogDto)
    }

    async delete(id: string): Promise<void> {
        await this.repository.delete(id)
    }

    async update(id: string, updateBlogDto: UpdateBlogDto): Promise<Blog> {
        return await this.repository.update(id, updateBlogDto)
    }
}
