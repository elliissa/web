import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Film {

  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'film_id',
  })
  externalId: number;

  @Column({nullable: true})
  name: string;

  @Column({nullable: true})
  rating: number;

  @Column({nullable: true})
  scenarists: string;

  @Column({nullable: true})
  year: number;

  @Column({nullable: true})
  imageSrc: string;

  constructor(
    externalId: number,
    name: string,
    rating: number,
    scenarists: string,
    year: number,
  imageSrc: string
  ) {
    this.externalId = externalId;
    this.name = name;
    this.rating = rating;
    this.scenarists = scenarists;
    this.year = year;
    this.imageSrc = imageSrc;
  }
}

export const FilmSchema = SchemaFactory.createForClass(Film);
