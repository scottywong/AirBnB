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
      city: 'Chicago',
      state: 'IL',
      country: 'USA',
      lat: 41.8781136,
      lng: -87.6297982,
      name: 'The CHI Spot',
      description: 'This is a great spot',
      price: 150,
      previewImage: 'https://as1.ftcdn.net/v2/jpg/02/19/71/04/1000_F_219710464_N0rrvviaF8UTaJkgBWDTq7Bnpb4yKdNY.jpg',
      numReviews: 0,
      avgStarRating: 2
   },{
      ownerId: 1,
      address: '456 Sesame St',
      city: 'Los Angeles',
      state: 'CA',
      country: 'USA',
      lat: 34.0522342,
      lng: -118.2436849,
      name: 'The LA Spot',
      description: 'This is a really great spot',
      price: 200,
      previewImage: 'https://as2.ftcdn.net/v2/jpg/02/04/56/69/1000_F_204566991_OxzKTOSQxG9uR4F6grhmgRgopg1CO7zd.jpg',
      numReviews: 0,
      avgStarRating: 3
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
     await queryInterface.bulkDelete('Spots');
  }
};
