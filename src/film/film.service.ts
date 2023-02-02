import {Inject, Injectable} from '@nestjs/common';
import {Film} from './film.entity';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {WINSTON_MODULE_PROVIDER} from "nest-winston";
import {Logger} from "winston";


@Injectable()
export class FilmService {

    constructor(@InjectRepository(Film) private readonly filmRepository: Repository<Film>, @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger) {
    }

    async getAll() {
        return this.filmRepository.find();
    }

    async getById(id: any) {
        try {
            return this.filmRepository.findOneBy({externalId: id.id});
        } catch (e) {
            this.logger.error(`film-service getById ${JSON.stringify(e)}`);
            throw new Error(e);
        }
    }

    get(name: any) {
        const axios = require('axios');

        const options = {
            method: 'GET',
            url: 'https://imdb8.p.rapidapi.com/auto-complete',
            params: {q: name.name},
            headers: {
                'X-RapidAPI-Key': '7f260cf98cmshbcea1f0cec0824fp1b8e5bjsnc8ba46d3963f',
                'X-RapidAPI-Host': 'imdb8.p.rapidapi.com'
            }
        };

        return axios.request(options).catch(function (error) {
            console.error(error);
        });
    }

    update(name: string) {
        const films = this.get(name).then(response => {
            var data = response.data;
            var films = new Array();

            data.d.forEach(data => {
                films.push(new Film(
                    data.id.replace(new RegExp('([a-zA-Z/-]*)'), '') || Math.floor(Math.random() * 100_000),
                    data.l,
                    data.rank,
                    data.s,
                    data.y,
                    data.i.imageUrl
                    )
                );
            })

            return films;
        }).then(films => {
            console.log(films);

            return this.filmRepository.save(films);
        });
    }
}
