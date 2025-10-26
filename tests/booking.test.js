const request = require("supertest");
const app = require("../server");
const { sequelize, User, Resource, Booking } = require("../models");
const mongoose = require("mongoose");
const DoctorDetail = require("../mongodb_models/DoctorDetail");
const RestaurantDetail = require("../mongodb_models/RestaurantDetail");
const MeetingRoomDetail = require("../mongodb_models/MeetingRoomDetail");

describe("Booking Endpoints", () => {
  let userToken, adminToken;
  let userBooking, doctorResource, restaurantResource, meetingRoomResource;

  const testUser = {
    username: "bookinguser",
    email: "bookinguser@example.com",
    password: "password123",
    phone: "1234567890",
    role: "user",
  };

  const adminUser = {
    username: "adminuser",
    email: "admin@example.com",
    password: "password123",
    phone: "1234567890",
    role: "admin",
  };

 
  beforeAll(async () => {
    await sequelize.sync({ force: true });

   
    const registerUser = await request(app).post("/api/auth/register").send(testUser);
    expect(registerUser.statusCode).toBe(201);
    userToken = registerUser.body.token;

    
    const registerAdmin = await request(app).post("/api/auth/register").send(adminUser);
    expect(registerAdmin.statusCode).toBe(201);
    adminToken = registerAdmin.body.token;

    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(process.env.MONGO_URL_TEST);
    }

    
    await DoctorDetail.deleteMany({});
    await RestaurantDetail.deleteMany({});
    await MeetingRoomDetail.deleteMany({});

    
    doctorResource = await Resource.create({ name: "Dr. Smith", type: "doctor", status: "available" });
    restaurantResource = await Resource.create({ name: "La Bella", type: "restaurant table", status: "available" });
    meetingRoomResource = await Resource.create({ name: "Conference Room A", type: "meeting room", status: "available" });

    
    await DoctorDetail.create({ my_sql_resource_id: doctorResource.id, bio: "Experienced cardiologist", specializations: ["Cardiology"] });
    await RestaurantDetail.create({ my_sql_resource_id: restaurantResource.id, menu: ["Pizza"], photos: ["photo1.jpg"], faqs: ["Is there parking?"] });
    await MeetingRoomDetail.create({ my_sql_resource_id: meetingRoomResource.id, capacity: 20, amenities: ["Projector"] });
  });

  afterAll(async () => {
    await sequelize.close();
    await mongoose.connection.close();
  });

  
  it("should create a booking successfully", async () => {
    const res = await request(app)
      .post("/api/booking/create")
      .set("Authorization", `Bearer ${userToken}`)
      .send({
        resource_id: doctorResource.id,
        booking_date: "2025-11-01",
        start_time: "10:00",
        end_time: "11:00",
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.booking).toHaveProperty("id");
    expect(res.body.booking.resource_id).toBe(doctorResource.id);
    userBooking = res.body.booking;
  });

  it("should prevent overlapping bookings", async () => {
    const res = await request(app)
      .post("/api/booking/create")
      .set("Authorization", `Bearer ${userToken}`)
      .send({
        resource_id: doctorResource.id,
        booking_date: "2025-11-01",
        start_time: "10:30",
        end_time: "11:30",
      });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toMatch(/already booked/);
  });


});
