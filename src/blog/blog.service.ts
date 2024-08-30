import { Injectable } from '@nestjs/common'

@Injectable()
export class BlogService {
    async findAll(): Promise<string> {
        return 'This action returns all blog'
    }
}
