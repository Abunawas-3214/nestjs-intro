import { Body, Controller, DefaultValuePipe, Get, Headers, Ip, Param, ParseIntPipe, Patch, Post, Query, ValidationPipe } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { GetUsersParamsDto } from './dtos/get-users-params.dto';
import { PatchUserDto } from './dtos/patch-user.dto';
import { UsersService } from './providers/users.service';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('users')
@ApiTags('Users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Get('/:id?')
    @ApiOperation({
        summary: "Fetches a list of registered users on the application",
    })
    @ApiResponse({
        status: 200,
        description: "Users fetched successfully based on the query",
    })
    @ApiQuery({
        name: 'limit',
        type: Number,
        required: false,
        description: "The  number of users to return per query",
        example: 10
    })
    @ApiQuery({
        name: 'page',
        type: Number,
        required: false,
        description: "The  number of the page number that you want the API to return",
        example: 1
    })
    public getUsers(
        @Param() getUsersParamsDto: GetUsersParamsDto,
        @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
        @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number
    ) {
        return this.usersService.findAll(getUsersParamsDto, limit, page)
    }

    @Post()
    public createUsers(@Body() createUserDto: CreateUserDto,) {
        return this.usersService.createUser(createUserDto)
    }

    @Patch()
    public patchUser(@Body() patchUserDto: PatchUserDto) {
        return patchUserDto
    }
}
