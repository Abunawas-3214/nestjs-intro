import { forwardRef, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { RefreshTokenDto } from '../dtos/refresh-token.dto';
import { JwtService } from '@nestjs/jwt';
import jwtConfig from '../config/jwt.config';
import { ConfigType } from '@nestjs/config';
import { GenerateTokensProvider } from './generate-tokens.provider';
import { UsersService } from 'src/users/providers/users.service';
import { ActiveUserData } from '../interfaces/active-user-data.intervace';

@Injectable()
export class RefreshTokensProvider {
    constructor(
        private readonly jwtService: JwtService,

        @Inject(jwtConfig.KEY)
        private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,

        private readonly generateTokensProvider: GenerateTokensProvider,

        @Inject(forwardRef(() => UsersService))
        private readonly usersService: UsersService,
    ) { }

    public async refreshTokens(refreshTokensDto: RefreshTokenDto) {
        try {
            // Verify the refresh token using jwtService
            const { sub } = await this.jwtService.verifyAsync<Pick<ActiveUserData, 'sub'>>(
                refreshTokensDto.refreshToken,
                {
                    secret: this.jwtConfiguration.secret,
                    audience: this.jwtConfiguration.audience,
                    issuer: this.jwtConfiguration.issuer,
                }
            )

            // Ferch user from the database
            const user = await this.usersService.findOneById(sub)

            // Generate the tokens
            return await this.generateTokensProvider.generateTokens(user)
        } catch (error) {
            throw new UnauthorizedException(error)
        }
    }
}
