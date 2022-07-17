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
      spotId: 15,
      review: 'This is a great spot',
      stars: 5
    },{
      userId: 1,
      spotId: 16,
      review: 'This is also a great spot',
      stars: 5
    },{
      userId: 1,
      spotId: 17,
      review: 'This is also another great spot',
      stars: 4
    }
  ]);

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */


  }
};
