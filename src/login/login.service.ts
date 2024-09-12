import { Injectable, UnauthorizedException } from '@nestjs/common'
import { UserWithToken } from './entities/user-with-token.entity'
import { LoginUserDto } from './dto/login-user.dto'
import { BcryptService } from 'src/services/bcrypt.service'
import { PrismaService } from 'src/prisma.service'
import { JwtService } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'
import { User } from 'src/user/entities/user.entity'

@Injectable()
export class LoginService {
    private readonly prisma: PrismaService
    private readonly bcryptService: BcryptService
    private readonly jwtService: JwtService
    private readonly configService: ConfigService

    constructor(
        prisma: PrismaService,
        bcryptService: BcryptService,
        jwtService: JwtService,
        configService: ConfigService
    ) {
        this.prisma = prisma
        this.bcryptService = bcryptService
        this.jwtService = jwtService
        this.configService = configService
    }

    async login(loginUserDto: LoginUserDto): Promise<UserWithToken> {
        const user = await this.prisma.user.findUnique({
            where: { username: loginUserDto.username },
        })

        if (!user) {
            throw new UnauthorizedException('User is not found')
        }

        const passwordCorrect = await this.bcryptService.comparePasswords(
            loginUserDto.password,
            user.password,
        )

        if (!passwordCorrect) {
            throw new UnauthorizedException('Wrong credentials')
        }

        const userPayload: User = {
            id: user.id,
            username: user.username,
            name: user.name
        }

        const secretKey = this.configService.get<string>('JWT_SECRET')

        const token = await this.jwtService.signAsync(userPayload, {
            secret: secretKey
        })

        return {
            token,
            ...userPayload
        }
    }
}
