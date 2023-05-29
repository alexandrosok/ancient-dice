import {Model, Column, Table, HasMany, DataType} from 'sequelize-typescript';
import { Bet } from './Bet.model';
import { Sequelize } from 'sequelize-typescript';

@Table
export class User extends Model<User> {
    @Column(DataType.STRING)
    name!: string;

    @Column(DataType.NUMBER)
    balance!: number;

    @HasMany(() => Bet)
    bets!: Bet[];
}
