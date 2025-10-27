#!/bin/sh


echo "--- Waiting a moment for connection stability... ---"
sleep 5 


echo "--- Running Sequelize Migrations (MySQL) ---"
npx sequelize-cli db:migrate


if [ $? -ne 0 ]; then
  echo "MySQL Migrations failed! Exiting application container."
  exit 1
fi


echo "--- Running Sequelize Seeders (MySQL) ---"
npx sequelize-cli db:seed:all


echo "--- Running MongoDB Seeding Scripts ---"
node mongodb_seeders/seedDoctorDetails.js
node mongodb_seeders/seedRestaurantDetails.js
node mongodb_seeders/seedMeetingRoomDetails.js
node mongodb_seeders/seedReviews.js


echo "--- Starting Application Server ---"
npm run dev