import {Bet} from '../models/Bet.model';
import {User} from "../models/User.model";

const betResolvers = {
    Query: {
        getBet: async ({id}: any) => {
            try {
                return await Bet.findByPk(id);
            } catch (error) {
                console.error(error);
                throw new Error('error to get bet');
            }
        },
        getBetList: async () => {
            try {
                return await Bet.findAll();
            } catch (error) {
                console.error(error);
                throw new Error('error to get bet list');
            }
        },
        getBestBetPerUser: async ({limit}: any) => {
            try {
                return await Bet.findAll({
                    attributes: ['id', 'userId', 'betAmount', 'chance', 'payout', 'win'],
                    group: ['userId'],
                    order: [['payout', 'DESC']],
                    limit,
                });
            } catch (error) {
                console.error(error);
                throw new Error('error to get best bets per user');
            }
        },
    },
    Mutation: {
        createBet: async (args: any) => {
            const { userId, betAmount, chance } = args || {};

            try {
                const win = Math.random() <= chance;
                const payout = win ? betAmount * (1 / chance) : 0;

                const user = await User.findByPk(userId);
                if (!user) {
                    throw new Error('user not found');
                }

                if (user.balance < betAmount) {
                    throw new Error('no enough balance');
                }

                user.balance -= betAmount;
                await user.save();

                return await Bet.create({
                    userId,
                    betAmount,
                    chance,
                    payout,
                    win,
                } as any);

            } catch (error) {
                console.error(error);
                throw new Error('Failed to create bet');
            }
        },
    },
};

export default betResolvers;
