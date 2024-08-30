import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    private readonly userService: UserService;

    constructor() {}

    @Get()
    findAll() {
        return this.userService.findAll();
    }
}
