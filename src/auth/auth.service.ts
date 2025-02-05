import { Model } from "mongoose";
import { ForbiddenException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { JwtService } from "@nestjs/jwt";
import * as argon from "argon2";
import { User } from "src/schemas/user.schema";
import { SignUpDto, SignInDto } from "./dto";

@Injectable({})
export class AuthService {
    constructor(
        @InjectModel(User.name) private userModel: Model<User>,
        private jwtService: JwtService
    ) { }

    async signup(createAuthDto: SignUpDto): Promise<Omit<User, 'password'>> {

        // Verify if the email address isn't used
        if (await this.userModel.findOne({ email: createAuthDto.email })) {
            throw new ForbiddenException('Email déjà utilisé');
        }

        // Verify if the username address isn't used
        if (await this.userModel.findOne({ username: createAuthDto.username })) {
            throw new ForbiddenException('Pseudo déjà utilisé');
        }

        createAuthDto.password = await argon.hash(createAuthDto.password);
        const createdUser = new this.userModel(createAuthDto);
        const savedUser = await createdUser.save();

        const { password, ...result } = savedUser.toObject();
        return result;
    }

    async signin(loginAuthDto: SignInDto): Promise<{ accessToken: string }> {
        const user = await this.userModel.findOne({ email: loginAuthDto.email });

        // Verify if the email address is in the database
        if (!user) {
            throw new ForbiddenException('Identifiant invalide');
        }

        // Verify if the password is correct
        const isPasswordValid = await argon.verify(user.password, loginAuthDto.password);
        if (!isPasswordValid) {
            throw new ForbiddenException('Identifiant invalide');
        }

        const payload = { sub: user._id, username: user.email };

        return {
            accessToken: await this.jwtService.signAsync(payload),
        };
    }
}