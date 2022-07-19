'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    await queryInterface.bulkInsert('Reviews',[{

      userId: 1,
      spotId: 1,
      review: 'This is a great spot',
      stars: 5
    },{
      userId: 1,
      spotId: 2,
      review: 'This is also a great spot',
      stars: 5
    },
      {
      userId: 1,
      spotId: 3,
      review: 'This is also a great spot',
      stars: 5
    },
    {
    userId: 1,
    spotId: 4,
    review: 'This is also a great spot',
    stars: 5
    }]);

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('Reviews', null,{});

  }
};
