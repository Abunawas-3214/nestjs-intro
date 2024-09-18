import { Body, Controller, Get, Headers, Ip, Param, Post, Query } from '@nestjs/common';

@Controller('users')
export class UsersController {
    @Get('/:id/:optional?')
    public getUsers(@Param('id') id: any, @Query('limit') limit: any) {
        console.log(id)
        console.log(limit)
        return 'You sent a get request to users endpoint'
    }

    @Post()
    public createUsers(
        @Body() request: any,
        @Headers() headers: any,
        @Ip() ip: any
    ) {
        console.log(request)
        console.log(headers)
        console.log(ip)
        return 'You sent a post request to users endpoint'
    }
}
