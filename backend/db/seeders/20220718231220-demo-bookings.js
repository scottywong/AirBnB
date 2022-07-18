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
   await queryInterface.bulkInsert('Bookings',[{
    "spotId": 15,
    "userId": 1,
    "startDate": "2021-11-19",
    "endDate": "2021-11-19",
    "createdAt": "2021-11-19 20:39:36",
    "updatedAt": "2021-11-19 20:39:36"
   },{
    "spotId": 16,
    "userId": 1,
    "startDate": "2022-11-19",
    "endDate": "2022-11-19",
    "createdAt": "2021-11-19 20:39:36",
    "updatedAt": "2021-11-19 20:39:36"
   }],{});

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

      await queryInterface.bulkDelete('Bookings', null, {truncate: true, cascade: true });
  }
};
