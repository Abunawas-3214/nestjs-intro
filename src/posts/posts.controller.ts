import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { PostsService } from './providers/posts.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreatePostDto } from './dtos/create-post.dto';
import { PatchPostDto } from './dtos/patch-post.dto';

@Controller('posts')
@ApiTags('Posts')
export class PostsController {
    constructor(
        private readonly postsService: PostsService,
    ) { }

    @Get('/:userId?')
    public getPosts(@Param('userId') userId: string) {
        return this.postsService.findAll(userId);
    }

    @ApiOperation({
        summary: "Creates a new blog post"
    })
    @ApiResponse({
        status: 201,
        description: "You get a 201 response if your post is created successfully"
    })
    @Post()
    public createPost(@Body() CreatePostDto: CreatePostDto) {
        console.log(CreatePostDto)
    }

    @ApiOperation({
        summary: "Updates an existing blog post"
    })
    @ApiResponse({
        status: 200,
        description: "A 200 response if the post is updated successfully"
    })
    @Patch()
    public updatePost(@Body() patchPostDto: PatchPostDto) {
        console.log(patchPostDto)
    }
}
