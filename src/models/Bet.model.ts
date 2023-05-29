import {Model, Column, Table, ForeignKey, BelongsTo, DataType} from 'sequelize-typescript';
import { User } from './User.model';

@Table
export class Bet extends Model<Bet> {
    @ForeignKey(() => User)
    @Column(DataType.NUMBER)
    userId!: number;

    @BelongsTo(() => User)
    user!: User;

    @Column(DataType.NUMBER)
    betAmount!: number;

    @Column(DataType.NUMBER)
    chance!: number;

    @Column(DataType.NUMBER)
    payout!: number;

    @Column(DataType.NUMBER)
    win!: boolean;
}
