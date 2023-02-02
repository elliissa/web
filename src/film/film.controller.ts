import {
  Controller,
  Get,
  HttpCode,
  HttpStatus, Inject,
  Param, Post, UseGuards,
} from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { FilmService } from './film.service';
import {AdminGuard, JwtAuthGuard} from "../auth/guards";
import {Logger} from "winston";

@Controller('film')
export class FilmController {
  constructor(private readonly filmService: FilmService, @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger) {}

  @Get('')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  getAll() {
    this.logger.info(`film-controller getAll`);
    return this.filmService.getAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  getById(@Param() id: number) {
    console.log("123")
    this.logger.info(`film-controller getById`, { id });
    return this.filmService.getById(id);
  }

  @Post("update/:name")
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard, AdminGuard)
  updateFilms(@Param() name: string) {
    return this.filmService.update(name);
  }
}
