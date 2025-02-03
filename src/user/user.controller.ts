import { Body, Controller, Post } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) { }

    @Post('create')
    createUser(@Body() dto: UserDto) {
        console.log("dto : ", dto);
        return this.userService.createUser(dto);
    }
}
