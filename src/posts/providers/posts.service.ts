import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/providers/users.service';

@Injectable()
export class PostsService {
    constructor(
        private readonly usersService: UsersService,
    ) { }
    public findAll(userId: string) {
        const user = this.usersService.findOneById(userId);
        return [
            {
                user: user,
                title: 'Test Title 1',
                content: 'Test Content 1',
            },
            {
                user: user,
                title: 'Test Title 2',
                content: 'Test Content 2',
            },
            {
                user: user,
                title: 'Test Title 3',
                content: 'Test Content 3',
            }
        ]
    }
}
