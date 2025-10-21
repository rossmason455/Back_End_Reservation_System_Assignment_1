"use strict";
const { faker } = require("@faker-js/faker");

module.exports = {
  async up(queryInterface, Sequelize) {
    const availabilities = [];

    for (let doctorId = 1; doctorId <= 20; doctorId++) {
     
      for (let week = 0; week < 4; week++) {

   
        for (let weekday = 1; weekday <= 5; weekday++) {

        
          for (let hour = 9; hour <= 15; hour++) {

            //current date and time
            const start = new Date();

            //day of current start date
            const dayOfWeek = start.getDay(); 
            //mondaythisweek is the exact date and time in start stored inside
            const mondayThisWeek = new Date(start);
            //set date of mondaythisweek as the date of start - dayof the week which is the day of the date in start and add 1 to it
           mondayThisWeek.setDate(mondayThisWeek.getDate() - dayOfWeek + 1); 

           //setting start to the date in mondaythisweek ^ 
            start.setDate(mondayThisWeek.getDate() + (weekday - 1) + week * 7);

            start.setHours(hour, 0, 0, 0);

          
            const end = new Date(start);
            end.setHours(start.getHours() + 1);

          
              availabilities.push({
          doctor_id: doctorId,
          available_date: start.toISOString().split("T")[0],
          start_datetime: start,
              end_datetime: end,
              status: 'available',
          created_at: new Date(),
          updated_at: new Date(),
        });
          }
        }

      
      }
    }
    await queryInterface.bulkInsert("availabilities", availabilities, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("availabilities", null, {});
  },
};
