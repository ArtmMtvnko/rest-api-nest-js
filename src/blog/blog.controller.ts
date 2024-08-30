import { Controller, Get } from '@nestjs/common';
import { BlogService } from './blog.service';

@Controller('blog')
export class BlogController {
    private readonly blogService: BlogService;

    constructor(blogService: BlogService) {
        this.blogService = blogService;
    }

    @Get()
    findAll() {
        return this.blogService.findAll();
    }
}
