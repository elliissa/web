import {FilmController} from "./film.controller";
import {FilmService} from "./film.service";
import {Module} from "@nestjs/common";
import {Film} from "./film.entity";
import {TypeOrmModule} from "@nestjs/typeorm";

@Module({
    imports: [TypeOrmModule.forFeature([Film])],
    controllers: [FilmController],
    providers: [FilmService],
    exports: [FilmService],
})
export class FilmModule {}