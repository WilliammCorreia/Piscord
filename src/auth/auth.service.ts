import { Injectable } from "@nestjs/common";

@Injectable({})
export class AuthService{

    signup() {
        return "I am signed up"
    }

    signin() {
        return {name : 'William', age : 20, student: true};
    }
}