import { UUID } from 'crypto'

export interface Blog {
    ID: UUID
    title: string
    content: string
    likes: number
    userID: UUID
}
