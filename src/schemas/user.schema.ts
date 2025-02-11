import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
    @Prop({ type: String, required: true, unique: true })
    username: string;

    @Prop({ type: String, required: true, unique: true })
    email: string;

    @Prop({ type: String, required: true })
    password: string;

    @Prop({ type: Boolean, default: false })
    isEmailVerified: boolean;

    @Prop({ type: String })
    avatarUrl: string;

    @Prop({ type: Boolean, required: true, default: false })
    setOffline: boolean;

    @Prop({ type: Boolean })
    isOnline?: boolean;

    @Prop({ type: Date })
    lastLogin: Date;

    @Prop({ type: String, required: true, default: "user" })
    role: string;

    @Prop({ type: [String] })
    friends: string[];

    @Prop({ type: [String] })
    blockedUsers: string[];

    @Prop({ type: [String] })
    servers: string[];

    @Prop({ type: Date, required: true, default: Date.now })
    createdAt: Date;

    @Prop({ type: Date, default: Date.now })
    updatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);