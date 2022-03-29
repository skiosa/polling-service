import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

export interface rawRSS {
    content: string
}

@Entity()
export class parsedRSS {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    article!: string;
}
