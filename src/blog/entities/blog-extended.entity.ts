import { User } from 'src/user/entities/user.entity'
import { Blog } from './blog.entity'

export interface BlogExtended extends Blog {
    author: User
}
