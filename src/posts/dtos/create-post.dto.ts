import { IsArray, IsEnum, IsIn, IsInt, IsISO8601, IsJSON, IsNotEmpty, IsOptional, IsString, IsUrl, Matches, MaxLength, MinLength, ValidateNested } from "class-validator"
import { postStatus } from "../enums/postStatus.enum"
import { postType } from "../enums/postType.enum"
import { CreatePostMetaOptionsDto } from "../../meta-options/dtos/create-post-meta-options.dto"
import { Type } from "class-transformer"
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"

export class CreatePostDto {
    @ApiProperty({
        example: "This is a title",
        description: "This is the title of the post",
    })
    @IsString()
    @MinLength(4)
    @MaxLength(512)
    @IsNotEmpty()
    title: string

    @ApiProperty({
        enum: postType,
        description: "Possible values, 'post', 'page', 'story', 'series'",
    })
    @IsEnum(postType)
    @IsNotEmpty()
    postType: postType

    @ApiProperty({
        example: "my-blog-post",
        description: "A slug should be all small letters and uses only '-' and without spaces",
    })
    @IsString()
    @MaxLength(512)
    @IsNotEmpty()
    @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
        message: 'A slug should be all small letters and uses only "-" and without spaces. For example: "my-url"',
    })
    slug: string

    @ApiProperty({
        enum: postStatus,
        description: "Possible values, 'draft', 'published', 'scheduled', 'review'",
    })
    @IsEnum(postStatus)
    @IsNotEmpty()
    status: postStatus

    @ApiPropertyOptional({
        example: "This is a content",
        description: "This is the content of the post",
    })
    @IsString()
    @IsOptional()
    content?: string

    @ApiPropertyOptional({
        example: "{\r\n \"@context\": \"https:\/\/schema.org\",\r\n \"@type\": \"Person\"\r\n}",
        description: "Serialize your JSON object else a validation error will be thrown",
    })
    @IsString()
    @IsOptional()
    @IsJSON()
    schema?: string

    @ApiPropertyOptional({
        example: "https://images.unsplash.com/photo-1593720219276-0b1eacd0aef4?q=80&w=2061&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        description: "Featured image for your blog post",
    })
    @IsString()
    @IsOptional()
    @IsUrl()
    @MaxLength(1024)
    featuredImageUrl?: string

    @ApiPropertyOptional({
        example: "2024-03-16T07:46:32+0000",
        description: "The date and time of the post is published",
    })
    @IsISO8601()
    @IsOptional()
    publishOn?: Date

    @ApiPropertyOptional({
        description: "Array of ids of tags",
        example: [1, 2]
    })
    @IsOptional()
    @IsArray()
    @IsInt({ each: true })
    tags?: number[]

    @ApiPropertyOptional({
        type: 'object',
        required: false,
        items: {
            type: 'object',
            properties: {
                metaValue: {
                    type: 'json',
                    description: 'The meta value is a JSON string',
                    example: '{"sidebarEnabled": true}',
                }
            }
        },
    })
    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => CreatePostMetaOptionsDto)
    metaOptions?: CreatePostMetaOptionsDto | null
}