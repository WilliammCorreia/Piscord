import { Body, Controller, Get, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from 'src/Auth/auth.guard';
import { UpdateUserDto } from './dto/update.dto';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) { }

    @UseGuards(AuthGuard)
    @Patch('update')
    updateUser(@Request() req, @Body() dto: UpdateUserDto) {
        console.log(`req.user : ${req.user}, dto : ${dto}`);
        return this.userService.updateUser(req, dto);
    }
}
