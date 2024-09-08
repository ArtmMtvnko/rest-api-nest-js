import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import { CACHE_MANAGER } from '@nestjs/cache-manager'
import { Cache } from 'cache-manager'
import { Blog } from './entities/blog.entity'
import { CreateBlogDto } from './dto/create-blog.dto'
import { UpdateBlogDto } from './dto/update-blog.dto'
import { BlogRepository } from './blog.repository'
import { CacheKeys } from 'src/enums/cache.enum'
import { BlogExtended } from './entities/blog-extended.entity'

@Injectable()
export class BlogService {
    private readonly repository: BlogRepository
    private cacheManager: Cache

    constructor(repository: BlogRepository, @Inject(CACHE_MANAGER) cacheManager: Cache) {
        this.repository = repository
        this.cacheManager = cacheManager
    }

    async findAll(): Promise<Blog[]> {
        const cachedBlogs = await this.cacheManager.get<Blog[]>(CacheKeys.BLOGS)

        if (!cachedBlogs) {
            const blogs = await this.repository.findAll()
            this.cacheManager.set(CacheKeys.BLOGS, blogs, 0)
            return blogs
        }

        return cachedBlogs
    }

    async findUnique(id: string): Promise<BlogExtended> {
        const blog = await this.repository.findUnique(id)

        if (!blog) {
            throw new NotFoundException(`Blog with id '${id}' was not found`)
        }

        return blog
    }

    async create(createBlogDto: CreateBlogDto): Promise<Blog> {
        const blog = await this.repository.create(createBlogDto)
        await this.cacheManager.del(CacheKeys.BLOGS)
        return blog
    }

    async delete(id: string): Promise<void> {
        await this.repository.delete(id)
        await this.cacheManager.del(CacheKeys.BLOGS)
    }

    async update(id: string, updateBlogDto: UpdateBlogDto): Promise<Blog> {
        const blog = await this.repository.update(id, updateBlogDto)
        await this.cacheManager.del(CacheKeys.BLOGS)
        return blog
    }
}
