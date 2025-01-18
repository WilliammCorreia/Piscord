
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";


export type AuthDocument = HydratedDocument<Auth>;

@Schema()
export class Auth {
    @Prop({ type: String, required: true })
    email: string;
    
    @Prop({ type: String, required: true })
    password: string;

    @Prop({ type: Boolean, required: true })
    isEmailVerified: boolean;

    @Prop({ type: Date, required: true, default: Date.now })
    createdAt: Date;

    @Prop({ type: Date, default: Date.now })
    updatedAt: Date;

    @Prop({ type: Date })
    lastLogin: Date;

    @Prop({ type: String })
    authToken?: string;

    @Prop({ type: String })
    refreshToken?: string;
}

export const AuthSchema = SchemaFactory.createForClass(Auth);