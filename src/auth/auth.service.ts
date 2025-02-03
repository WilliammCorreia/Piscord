import { Model } from "mongoose";
import { ForbiddenException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { JwtService } from "@nestjs/jwt";
import { Auth } from "src/schemas/auth.schema";
import { AuthDto } from "./dto";
import * as argon from "argon2";

@Injectable({})
export class AuthService {
    constructor(
        @InjectModel(Auth.name) private authModel: Model<Auth>,
        private jwtService: JwtService
    ) { }

    async signup(createAuthDto: AuthDto): Promise<Auth> {

        // Verify if the email address isn't used
        if (await this.authModel.findOne({ email: createAuthDto.email })) {
            throw new ForbiddenException('Email déjà utilisé');
        }

        createAuthDto.password = await argon.hash(createAuthDto.password);
        const createdAuth = new this.authModel(createAuthDto);
        return createdAuth.save();
    }

    async signin(loginAuthDto: AuthDto): Promise<{ accessToken: string }> {
        const auth = await this.authModel.findOne({ email: loginAuthDto.email });

        // Verify if the email address is in the database
        if (!auth) {
            throw new ForbiddenException('Identifiant invalide');
        }

        // Verify if the password is correct
        const isPasswordValid = await argon.verify(auth.password, loginAuthDto.password);
        if (!isPasswordValid) {
            throw new ForbiddenException('Identifiant invalide');
        }

        const payload = { sub: auth._id, username: auth.email };

        return {
            accessToken: await this.jwtService.signAsync(payload),
        };
    }
}