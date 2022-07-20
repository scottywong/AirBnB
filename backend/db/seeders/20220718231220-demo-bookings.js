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

    const insertDate = new Date("2021-11-19");

   await queryInterface.bulkInsert('Bookings',[{
    "spotId": 1,
    "userId": 1,
    "startDate": "2021-11-19",
    "endDate": "2021-11-20",
    "createdAt": "2021-11-19 20:39:36",
    "updatedAt": "2021-11-19 20:39:36"
   },{
    "spotId": 2,
    "userId": 1,
    "startDate": "2022-11-19",
    "endDate": "2022-11-20",
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

      await queryInterface.bulkDelete('Bookings', null,{});
  }
};
