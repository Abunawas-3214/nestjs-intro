import { IsArray, IsEnum, IsISO8601, IsJSON, IsNotEmpty, IsOptional, IsString, IsUrl, Matches, MinLength, ValidateNested } from "class-validator"
import { postStatus } from "../enums/postStatus.enum"
import { postType } from "../enums/postType.enum"
import { CreatePostMetaOptionsDto } from "./create-post-meta-options.dto"
import { Type } from "class-transformer"
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"

export class CreatePostDto {
    @ApiProperty({
        example: "This is a title",
        description: "This is the title of the post",
    })
    @IsString()
    @MinLength(4)
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
    featuredImageUrl?: string

    @ApiPropertyOptional({
        example: "2024-03-16T07:46:32+0000",
        description: "The date and time of the post is published",
    })
    @IsISO8601()
    @IsOptional()
    publishOn?: Date

    @ApiPropertyOptional({
        description: "Array of tags passed as string values",
        example: ["javascript", "typescript", "nestjs"]
    })
    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    @MinLength(3, { each: true })
    tags?: string[]

    @ApiPropertyOptional({
        type: 'array',
        required: false,
        items: {
            type: 'object',
            properties: {
                key: {
                    type: 'string',
                    description: "The key can be any string indentifier for your meta option",
                    example: 'sidebarEnabled'
                },
                value: {
                    type: 'any',
                    description: "Any value that you want to save to the key",
                    example: true
                }
            }
        },
    })
    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreatePostMetaOptionsDto)
    metaOptions: CreatePostMetaOptionsDto[]
}