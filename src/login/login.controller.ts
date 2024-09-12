import { Body, Controller, Post } from '@nestjs/common'
import { LoginService } from './login.service'
import { ApiTags } from '@nestjs/swagger'
import { LoginUserDto } from './dto/login-user.dto'
import { UserWithToken } from './entities/user-with-token.entity'

@Controller('login')
@ApiTags('Login')
export class LoginController {
    private readonly loginService: LoginService

    constructor(loginService: LoginService) {
        this.loginService = loginService
    }

    @Post()
    async login(@Body() loginUserDto: LoginUserDto): Promise<UserWithToken> {
        return await this.loginService.login(loginUserDto)
    }
}
