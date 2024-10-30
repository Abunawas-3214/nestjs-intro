import { Body, Injectable } from '@nestjs/common';
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
        let tags = await this.tagsService.findMultipleTags(patchPostDto.tags)
        let post = await this.postRepository.findOneBy({
            id: patchPostDto.id
        })

        post.title = patchPostDto.title ?? post.title
        post.content = patchPostDto.content ?? post.content
        post.status = patchPostDto.status ?? post.status
        post.postType = patchPostDto.postType ?? post.postType
        post.slug = patchPostDto.slug ?? post.slug
        post.featuredImageUrl = patchPostDto.featuredImageUrl ?? post.featuredImageUrl
        post.publishOn = patchPostDto.publishOn ?? post.publishOn

        post.tags = tags

        return await this.postRepository.save(post)
    }

    public async delete(id: number) {
        await this.postRepository.delete(id)
        return { deleted: true, id }
    }
}
