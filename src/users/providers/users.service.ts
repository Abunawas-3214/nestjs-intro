import { BadRequestException, forwardRef, HttpException, HttpStatus, Inject, Injectable, RequestTimeoutException } from '@nestjs/common';
import { GetUsersParamsDto } from '../dtos/get-users-params.dto';
import { AuthService } from 'src/auth/providers/auth.service';
import { DataSource, Repository } from 'typeorm';
import { User } from '../user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from '../dtos/create-user.dto';
import { ConfigService, ConfigType } from '@nestjs/config';
import profileConfig from '../config/profile.config';
import { error } from 'console';
import { UsersCreateManyProvider } from './users-create-many.provider';
import { CreateManyUsersDto } from '../dtos/create-many-users.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,

        @Inject(profileConfig.KEY)
        private readonly profileConfiguration: ConfigType<typeof profileConfig>,

        private readonly usersCreateManyProvider: UsersCreateManyProvider,
    ) { }

    public async createUser(createUserDto: CreateUserDto) {
        console.log('createUser')
        let existingUser = undefined

        try {
            existingUser = await this.userRepository.findOne({
                where: {
                    email: createUserDto.email
                }
            })
        } catch (error) {
            throw new RequestTimeoutException('Unable to process your request at the moment please try later', {
                description: 'Error connecting to database'
            })
        }

        await this.userRepository.findOne({
            where: { email: createUserDto.email }
        })

        //check is user exist with email

        //Handle exception
        if (existingUser) {
            throw new BadRequestException('This user already exist, please check your email')
        }


        //Create a new user
        let newUser = this.userRepository.create(createUserDto)

        try {
            newUser = await this.userRepository.save(newUser)
        } catch (error) {
            throw new RequestTimeoutException('This user already exist, please check your email', {
                description: 'Error connecting to database'
            })
        }
        newUser = await this.userRepository.save(newUser)

        return newUser
    }

    public findAll(
        getUsersParamsDto: GetUsersParamsDto,
        limit: number,
        page: number
    ) {
        throw new HttpException({
            status: HttpStatus.MOVED_PERMANENTLY,
            error: 'The API endpoint does not exist',
            fileName: 'users.service.ts',
            lineNumber: 63,
        },
            HttpStatus.MOVED_PERMANENTLY,
            {
                cause: new Error(),
                description: 'Occured becouse the API endpoint was permanently moved'
            }
        )
    }

    public async findOneById(id: number) {
        let user = undefined

        try {
            user = await this.userRepository.findOneBy({
                id,
            })
        } catch (error) {
            throw new RequestTimeoutException('Unable to process your request at the moment please try later', {
                description: 'Error connecting to database'
            })
        }

        //Handle the user does not exist

        if (!user) {
            throw new BadRequestException('User does not exist')
        }

        return user
    }

    public async createMany(createManyUsersDto: CreateManyUsersDto) {
        return await this.usersCreateManyProvider.createMany(createManyUsersDto)
    }
}
