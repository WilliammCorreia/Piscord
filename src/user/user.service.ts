import { ForbiddenException, Injectable } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { User } from 'src/schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) { }

    async updateUser(req: any, dto: UserDto): Promise<Omit<User, 'password'>> {
        const userId = req.user.sub;

        const user = await this.userModel.findOne({ _id: userId });
        if(!user) {
            throw new ForbiddenException('Utilisateur introuvable');
        }

        await this.userModel.updateOne({ _id: userId}, dto);

        const {password, ...result} = (await this.userModel.findById(userId)).toObject();
        return result;
    }
}
