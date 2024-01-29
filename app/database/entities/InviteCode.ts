import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class InviteCode {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    code: string;

    @Column()
    use: boolean;


}
