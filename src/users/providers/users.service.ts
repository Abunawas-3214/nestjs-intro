import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { GetUsersParamsDto } from '../dtos/get-users-params.dto';
import { AuthService } from 'src/auth/providers/auth.service';

@Injectable()
export class UsersService {
    constructor(
        @Inject(forwardRef(() => AuthService))
        private readonly authService: AuthService,
    ) { }
    public findAll(
        getUsersParamsDto: GetUsersParamsDto,
        limit: number,
        page: number
    ) {
        const isAuth = this.authService.isAuth()
        console.log(isAuth)

        return [
            {
                firstName: 'John',
                email: 'john@gmail.com'
            },
            {
                firstName: 'Jane',
                email: 'jane@gmail.com'
            }
        ]
    }

    public findOneById(id: string) {
        return {
            id: 1234,
            firstName: 'John',
            email: 'john@gmail.com'
        }
    }
}
