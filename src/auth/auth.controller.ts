import { Body, Controller, Get, Post, Request, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthGuard } from "./auth.guard";
import { SignUpDto, SignInDto } from "./dto";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('signup')
    signup(@Body() dto: SignUpDto) {
        console.log({
            dto,
        });
        return this.authService.signup(dto);
    }

    @Post('signin')
    signin(@Body() dto: SignInDto) {
        console.log("dto : ", dto);
        return this.authService.signin(dto);
    }

    @UseGuards(AuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
        console.log(req.user);
        return req.user;
    }
}