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
   await queryInterface.bulkInsert('Spots', [{
      ownerId: 1,
      address: '123 Main St',
      city: 'New York',
      state: 'NY',
      country: 'USA',
      lat: 40.7128,
      lng: -74.0060,
      name: 'The NY Spot',
      description: 'This is a great spot',
      price: 100,
      previewImage: 'https://as2.ftcdn.net/v2/jpg/02/05/70/33/1000_F_205703370_cdgaQw8I6ZxvIJ1I6LK3Vr3XbjzH3zWW.jpg',
      numReviews: 0,
      avgStarRating: null
   },{
      ownerId: 1,
      address: '456 Sesame St',
      city: 'San Francisco',
      state: 'CA',
      country: 'USA',
      lat: 37.7749,
      lng: -122.4194,
      name: 'The SF Spot',
      description: 'This is a really great spot',
      price: 200,
      previewImage: 'https://as2.ftcdn.net/v2/jpg/03/33/03/19/1000_F_333031995_KbrUWup1EWl59nVB1e41AL0HsL5qEFVO.jpg',
      numReviews: 0,
      avgStarRating: 4.5
   }], {});
   },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     const Op = Sequelize.Op;
     await queryInterface.bulkDelete('Spots', null,{});
  }
};
