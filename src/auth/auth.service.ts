import { Model } from "mongoose";
import { ForbiddenException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Auth } from "src/schemas/auth.schema";
import { AuthDto } from "./dto";
import * as argon from "argon2";

@Injectable({})
export class AuthService{
    constructor(@InjectModel(Auth.name) private authModel: Model<Auth>) {}

    async signup(createAuthDto: AuthDto): Promise<Auth> {

        if( await this.authModel.findOne({email: createAuthDto.email})) {
            throw new ForbiddenException('Email déjà utilisé');
        }

        createAuthDto.password = await argon.hash(createAuthDto.password);
        const createdAuth = new this.authModel(createAuthDto);
        return createdAuth.save(); 
    }

    signin() {
        return {name : 'William', age : 20, student: true};
    }
    
}