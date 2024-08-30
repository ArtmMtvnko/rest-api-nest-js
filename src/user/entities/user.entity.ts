import { UUID } from 'crypto'

export interface User {
    ID: UUID
    username: string
    name: string
    // blogsID: UUID[]
}
