import { ConflictException, Injectable, RequestTimeoutException } from '@nestjs/common';
import { User } from '../user.entity';
import { DataSource } from 'typeorm';
import { CreateUserDto } from '../dtos/create-user.dto';
import { CreateManyUsersDto } from '../dtos/create-many-users.dto';

@Injectable()
export class UsersCreateManyProvider {
    constructor(
        private readonly dataSource: DataSource,
    ) { }

    public async createMany(createManyUsersDto: CreateManyUsersDto) {
        let newUsers: User[] = []
        // Create Query RUnner Instance
        const queryRunner = this.dataSource.createQueryRunner()

        try {
            // Conect Query Runner to Datasource
            await queryRunner.connect()
            // Start Transaction
            await queryRunner.startTransaction()

        } catch (error) {
            throw new RequestTimeoutException('Could not connect to the database')
        }

        try {
            for (let user of createManyUsersDto.users) {
                let newUser = queryRunner.manager.create(User, user)
                let result = await queryRunner.manager.save(newUser)
                newUsers.push(result)
            }
            // If Succesfully Inserted Commit Transaction
            await queryRunner.commitTransaction()
        } catch (error) {
            // If Not Rollback Transaction
            await queryRunner.rollbackTransaction()
            throw new ConflictException('Could not complete the transaction', {
                description: String(error)
            })
        } finally {
            try {
                // Relase Connection
                await queryRunner.release()
            } catch (error) {
                throw new RequestTimeoutException('Could not release the connection', {
                    description: String(error)
                })
            }
        }

        return newUsers
    }
}
