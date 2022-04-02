import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

export class rawRSS {
    content!: string
}

@Entity()
export class parsedRSS {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    article!: string;
}
