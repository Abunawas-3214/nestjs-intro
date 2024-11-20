import { BadRequestException, Body, Injectable, RequestTimeoutException } from '@nestjs/common';
import { UsersService } from 'src/users/providers/users.service';
import { CreatePostDto } from '../dtos/create-post.dto';
import { Repository } from 'typeorm';
import { Post } from '../post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { MetaOption } from 'src/meta-options/meta-option.entity';
import { TagsService } from 'src/tags/providers/tags.service';
import { PatchPostDto } from '../dtos/patch-post.dto';
import { GetPostsDto } from '../dtos/get-post.dto';
import { PaginationProvider } from 'src/common/pagination/providers/pagination.provider';
import { Paginated } from 'src/common/pagination/interfaces/paginated.interface';
import { CreatePostProvider } from './create-post.provider';
import { ActiveUserData } from 'src/auth/interfaces/active-user-data.intervace';

@Injectable()
export class PostsService {
    constructor(
        private readonly usersService: UsersService,

        @InjectRepository(Post)
        private readonly postRepository: Repository<Post>,

        @InjectRepository(MetaOption)
        private readonly metaOptionsRepository: Repository<MetaOption>,

        private readonly tagsService: TagsService,

        private readonly paginationProvider: PaginationProvider,

        private readonly createPostProvider: CreatePostProvider
    ) { }
    public async findAll(postQuery: GetPostsDto, userId: number): Promise<Paginated<Post>> {
        let posts = await this.paginationProvider.paginateQuery({
            limit: postQuery.limit,
            page: postQuery.page
        }, this.postRepository)

        return posts;
    }

    public async create(createPostDto: CreatePostDto, user: ActiveUserData) {
        return await this.createPostProvider.create(createPostDto, user)
    }

    public async update(patchPostDto: PatchPostDto) {
        let tags = undefined
        let post = undefined

        try {
            tags = await this.tagsService.findMultipleTags(patchPostDto.tags)
        } catch (error) {
            throw new RequestTimeoutException('Unable to process your request at the moment please try later')
        }

        if (!tags || tags.length !== patchPostDto.tags.length) {
            throw new BadRequestException(
                'Please check your tag Ids and ensure they are correct'
            )
        }


        try {
            post = await this.postRepository.findOneBy({
                id: patchPostDto.id
            })
        } catch (error) {
            throw new RequestTimeoutException('Unable to process your request at the moment please try later')
        }

        if (!post) {
            throw new BadRequestException('The post ID does not exist')
        }


        post.title = patchPostDto.title ?? post.title
        post.content = patchPostDto.content ?? post.content
        post.status = patchPostDto.status ?? post.status
        post.postType = patchPostDto.postType ?? post.postType
        post.slug = patchPostDto.slug ?? post.slug
        post.featuredImageUrl = patchPostDto.featuredImageUrl ?? post.featuredImageUrl
        post.publishOn = patchPostDto.publishOn ?? post.publishOn

        post.tags = tags

        try {
            return await this.postRepository.save(post)
        } catch (error) {
            throw new RequestTimeoutException(
                'Unable to process your request at the moment please try later'
            )
        }
        return post
    }

    public async delete(id: number) {
        await this.postRepository.delete(id)
        return { deleted: true, id }
    }
}
