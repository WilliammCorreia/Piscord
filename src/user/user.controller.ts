import { Body, Controller, Patch, Post, UseGuards } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { UserService } from './user.service';
import { AuthGuard } from 'src/Auth/auth.guard';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) { }

    @UseGuards(AuthGuard)
    @Post('create')
    createUser(@Body() dto: UserDto) {
        console.log("dto createUser: ", dto);
        return this.userService.createUser(dto);
    }

    @Patch('update')
    updateUser(@Body() dto: UserDto) {
        console.log("dto updateUser : ", dto);
    }
}
