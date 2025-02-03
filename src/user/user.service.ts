import { ForbiddenException, Injectable } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { User } from 'src/schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) { }

    async createUser(dto: UserDto): Promise<User> {
        if (await this.userModel.findOne({ username: dto.username })) {
            throw new ForbiddenException("Pseudo déjà utilisé");
        }

        const createdUser = new this.userModel(dto);
        return createdUser.save();
    }
}
