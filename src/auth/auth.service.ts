import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Auth } from "src/schemas/auth.schema";
import { AuthDto } from "./dto";

@Injectable({})
export class AuthService{
    constructor(@InjectModel(Auth.name) private authModel: Model<Auth>) {}

    // async create(createAuthDto: CreateAuthDto): Promise<Auth> {
    //     const createdAuth = new this.authModel(createAuthDto);
    //     return createdAuth.save();
    // }

    signup(dto: AuthDto) {
        return "I am signed up"
    }

    signin() {
        return {name : 'William', age : 20, student: true};
    }
    
}