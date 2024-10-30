import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { GetUsersParamsDto } from '../dtos/get-users-params.dto';
import { AuthService } from 'src/auth/providers/auth.service';
import { Repository } from 'typeorm';
import { User } from '../user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from '../dtos/create-user.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) { }

    public async createUser(createUserDto: CreateUserDto) {
        //check is user exist with email
        const existingUser = await this.userRepository.findOne({
            where: {
                email: createUserDto.email
            }
        })

        //Handle exception

        //Create a new user
        let newUser = this.userRepository.create(createUserDto)
        newUser = await this.userRepository.save(newUser)

        return newUser
    }

    public findAll(
        getUsersParamsDto: GetUsersParamsDto,
        limit: number,
        page: number
    ) {
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

    public async findOneById(id: number) {
        return await this.userRepository.findOneBy({
            id,
        })
    }
}
