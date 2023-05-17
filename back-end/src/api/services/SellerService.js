const { User } = require('../../database/models');

const SellerService = {
  async getAllSellers() {
    try {
      const sellers = await User.findAll({
        where: {
          role: 'seller',
        },
        attributes: ['id', 'name'],
      });
      return sellers;
    } catch (error) {
      throw new Error('Failed to get sellers');
    }
  },
};

module.exports = SellerService;
