import { BadRequestException, Body, Injectable, RequestTimeoutException } from '@nestjs/common';
import { UsersService } from 'src/users/providers/users.service';
import { CreatePostDto } from '../dtos/create-post.dto';
import { Repository } from 'typeorm';
import { Post } from '../post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { MetaOption } from 'src/meta-options/meta-option.entity';
import { TagsService } from 'src/tags/providers/tags.service';
import { PatchPostDto } from '../dtos/patch-post.dto';

@Injectable()
export class PostsService {
    constructor(
        private readonly usersService: UsersService,

        @InjectRepository(Post)
        private readonly postRepository: Repository<Post>,

        @InjectRepository(MetaOption)
        private readonly metaOptionsRepository: Repository<MetaOption>,

        private readonly tagsService: TagsService
    ) { }
    public async findAll(userId: number) {
        let posts = await this.postRepository.find({
            relations: {
                metaOptions: true,
                // author: true
                // tags: true
            }
        })

        return posts;
    }

    public async create(@Body() createPostDto: CreatePostDto) {
        let author = await this.usersService.findOneById(createPostDto.authorId)
        let tags = await this.tagsService.findMultipleTags(createPostDto.tags)

        let post = this.postRepository.create({ ...createPostDto, author: author, tags: tags })

        return await this.postRepository.save(post)
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
