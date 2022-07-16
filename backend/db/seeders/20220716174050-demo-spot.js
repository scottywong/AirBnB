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
      ownerId: 10,
      address: '123 Main St',
      city: 'New York',
      state: 'NY',
      country: 'USA',
      lat: 40.7128,
      lng: -74.0060,
      name: 'The NY Spot',
      description: 'This is a great spot',
      price: 100,
      previewImage: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
      numReviews: 0,
      avgStarRating: null
   },{
      ownerId: 10,
      address: '456 Sesame St',
      city: 'San Francisco',
      state: 'CA',
      country: 'USA',
      lat: 37.7749,
      lng: -122.4194,
      name: 'The SF Spot',
      description: 'This is a really great spot',
      price: 200,
      previewImage: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
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
     return queryInterface.bulkDelete('Spots');
  }
};
