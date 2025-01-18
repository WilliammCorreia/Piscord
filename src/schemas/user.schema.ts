import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
    @Prop({ type: String, required: true })
    id: String;

    @Prop({ type: String, required: true })
    username: string;

    @Prop({ type: String })
    avatarUrl?: string;

    @Prop({ type: String, required: true })
    status: string;

    @Prop({ type: String })
    bio?: string;

    @Prop({ type: Date, required: true, default: Date.now })
    createdAt: Date;

    @Prop({ type: Date, default: Date.now })
    updatedAt: Date;

    @Prop({ type: Boolean, required: true })
    isOnline: boolean;

    @Prop({ type: [String], required: true })
    roles: string[];

    @Prop({ type: [String] })
    friends: string[];

    @Prop({ type: [String] })
    blockedUsers: string[];

    @Prop({ type: [String] })
    servers: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);