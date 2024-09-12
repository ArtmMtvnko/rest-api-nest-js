import { User } from 'src/user/entities/user.entity'

export interface UserWithToken extends User {
    token: string
}
