import { Injectable, NotFoundException } from '@nestjs/common'
import { Blog } from './entities/blog.entity'
import { blogsStorage } from 'src/storage/blogs.storage'
import { CreateBlogDto } from './dto/create-blog.dto'
import { v4 as uuid } from 'uuid'
import { UpdateBlogDto } from './dto/update-blog.dto'

@Injectable()
export class BlogService {
    async findAll(): Promise<Blog[]> {
        return blogsStorage.blogs
    }

    async findUnique(id: string): Promise<Blog | undefined> {
        return blogsStorage.blogs.find(blog => blog.id === id)
    }

    async create(createBlogDto: CreateBlogDto): Promise<Blog> {
        const blog: Blog = {
            id: uuid(),
            likes: 0,
            ...createBlogDto,
        }

        blogsStorage.blogs = [...blogsStorage.blogs, blog]

        return blog
    }

    async delete(id: string): Promise<void> {
        blogsStorage.blogs = blogsStorage.blogs.filter(blog => blog.id !== id)
    }

    async update(id: string, updateBlogDto: UpdateBlogDto) {
        const oldBlog = blogsStorage.blogs.find(blog => blog.id === id)

        if (!oldBlog) {
            throw new NotFoundException(`Blog with id '${id}' was not found`)
        }

        const updatedBlog: Blog = {
            ...oldBlog,
            ...updateBlogDto,
        }

        blogsStorage.blogs = blogsStorage.blogs.map(blog =>
            blog.id === id ? updatedBlog : blog,
        )

        return updatedBlog
    }
}
