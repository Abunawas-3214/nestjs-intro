import { BadRequestException, forwardRef, Inject, Injectable, RequestTimeoutException } from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-user.dto';
import { Repository } from 'typeorm';
import { User } from '../user.entity';
import { HashingProvider } from 'src/auth/providers/hashing.provider';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CreateUserProvider {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,

        @Inject(forwardRef(() => HashingProvider))
        private readonly hashingProvider: HashingProvider,
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
        let newUser = this.userRepository.create({
            ...createUserDto,
            password: await this.hashingProvider.hashPassword(createUserDto.password)
        })

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
}
