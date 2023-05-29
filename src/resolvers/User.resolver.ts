import {User} from '../models/User.model';

const userResolvers = {
    Query: {
        getUser: async (_: any, {id}: { id: number }) => {
            try {
                const user = await User.findByPk(id);
                if (!user) {
                    throw new Error('user not found');
                }
                return user;
            } catch (error) {
                console.error(error);
                throw new Error('error to get user');
            }
        },
        getUserList: async () => {
            try {
                return await User.findAll();
            } catch (error) {
                console.error(error);
                throw new Error('error to get user list');
            }
        },
    }
};

export default userResolvers;
