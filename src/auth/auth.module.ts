import {Module} from "@nestjs/common";
import {AuthController} from "./auth.controller";
import {AuthService} from "./auth.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {JwtModule} from '@nestjs/jwt';
import {User} from "../user/user.entity";
import {PassportModule} from '@nestjs/passport';
import {JwtStrategy, LocalStrategy} from './strategies';
import {jwtConfig} from "../config/jwt.config";

@Module({
    imports: [TypeOrmModule.forFeature([User]), JwtModule.registerAsync(jwtConfig), PassportModule],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy],
    exports: [AuthService],
})
export class AuthModule {
}