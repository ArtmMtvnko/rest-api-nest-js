import { User } from 'src/user/entities/user.entity';

class UsersStorage {
    private storage: User[] = [
        {
            id: '7957d287-e4ec-472e-938a-a69a4bbfa288',
            username: 'test_teston123',
            name: 'Test Teston',
        },
        {
            id: '9173ccac-7a49-40d8-8bb5-6bbbf9b78960',
            username: 'jhon_sm1th',
            name: 'Jhon Smith'
        }
    ]

    constructor() {}

    get users(): User[] {
        return this.storage
    }

    set users(storage: User[]) {
        this.storage = storage
    }
}

export const usersStorage = new UsersStorage() 
