import {Injectable} from '@nestjs/common';
import {User} from '../user/user.entity';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from 'typeorm';
import {JwtService} from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(@InjectRepository(User) private readonly userRepository: Repository<User>, private jwtService: JwtService) {
    }

    async validateUser(email: string, pass: string): Promise<User | null> {
        const user = await this.userRepository.findOneBy({email: email});

        const match = pass == user.password;

        if (user && match) {
            return user;
        }
        return null;
    }

    login(user: User) {
        console.log(user);
        const payload = {email: user.email, role: user.role};
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    signup(user: User) {
        const newUser = this.userRepository.create(user);
        return this.userRepository.save(newUser);
    }
}
