import { BadRequestException, Body, ConflictException, Injectable } from '@nestjs/common';
import { CreatePostDto } from '../dtos/create-post.dto';
import { UsersService } from 'src/users/providers/users.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from '../post.entity';
import { Repository } from 'typeorm';
import { TagsService } from 'src/tags/providers/tags.service';
import { ActiveUserData } from 'src/auth/interfaces/active-user-data.intervace';

@Injectable()
export class CreatePostProvider {
    constructor(
        private readonly usersService: UsersService,

        @InjectRepository(Post)
        private readonly postRepository: Repository<Post>,

        private readonly tagsService: TagsService,
    ) { }

    public async create(createPostDto: CreatePostDto, user: ActiveUserData) {
        let author = undefined
        let tags = undefined
        try {
            author = await this.usersService.findOneById(user.sub)
            tags = await this.tagsService.findMultipleTags(createPostDto.tags)
        } catch (error) {
            throw new ConflictException(error)
        }

        if (createPostDto.tags.length !== tags.length) {
            throw new BadRequestException('Please check your tag Ids')
        }

        let post = this.postRepository.create({ ...createPostDto, author: author, tags: tags })

        try {
            return await this.postRepository.save(post)
        } catch (error) {
            throw new ConflictException(error, {
                description: "Ensure post slug is unique and not a duplicate"
            })
        }

    }
}
