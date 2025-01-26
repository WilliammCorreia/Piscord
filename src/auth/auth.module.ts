import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { JwtModule } from "@nestjs/jwt";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { Auth, AuthSchema } from "src/schemas/auth.schema";
import { jwtConstants } from "./constants";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Auth.name, schema: AuthSchema }]),
        JwtModule.register({
            global: true,
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '15m' }
        })
    ],
    controllers: [AuthController],
    providers: [AuthService]
})
export class AuthModule {

}