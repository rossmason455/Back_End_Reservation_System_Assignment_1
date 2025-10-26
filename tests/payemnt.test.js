const request = require("supertest");
const app = require("../server");
const { sequelize, Resource, Booking, Payment, User } = require("../models");
const mongoose = require("mongoose");
const DoctorDetail = require("../mongodb_models/DoctorDetail");

describe("Payment Endpoints", () => {
  let userToken;
  let adminToken;
  let doctorResource;
  let confirmedBooking;

  const adminUser = {
    username: "adminuser",
    email: "admin@example.com",
    password: "password123",
    phone: "1234567890",
    role: "admin",
  };

  const normalUser = {
    username: "normaluser",
    email: "user@example.com",
    password: "password123",
    phone: "0987654321",
    role: "user",
  };

  beforeAll(async () => {
    
    await sequelize.sync({ force: true });
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(process.env.MONGO_URL_TEST);
    }
    await DoctorDetail.deleteMany({});
    await Payment.destroy({ where: {} });

   
    const adminRes = await request(app).post("/api/auth/register").send(adminUser);
    expect(adminRes.statusCode).toBe(201);
    adminToken = adminRes.body.token;

    const userRes = await request(app).post("/api/auth/register").send(normalUser);
    expect(userRes.statusCode).toBe(201);
    userToken = userRes.body.token;

   
    doctorResource = await Resource.create({
      name: "Dr. Smith",
      type: "doctor",
      status: "available",
    });

    
    await DoctorDetail.create({
      my_sql_resource_id: doctorResource.id,
      bio: "Experienced cardiologist with 10 years in practice.",
      specializations: ["Cardiology", "Internal Medicine"],
    });

    
    confirmedBooking = await Booking.create({
      user_id: 2, 
      resource_id: doctorResource.id,
      booking_date: "2025-11-01",
      start_time: "10:00",
      end_time: "11:00",
      status: "confirmed",
    });
  });

  afterAll(async () => {
    await sequelize.close();
    await mongoose.connection.close();
  });


  /* ************************************* CREATE PAYMENT ************************************ */

  it("should create a payment for a confirmed booking", async () => {
    const res = await request(app)
      .post(`/api/payment/${confirmedBooking.id}/pay`)
      .set("Authorization", `Bearer ${userToken}`);

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("message", "Payment created");
    expect(res.body.payment).toHaveProperty("amount", "150.00");
    expect(res.body.payment).toHaveProperty("status", "pending");
  });


   /* ************************************* DUPLICATE PAYMENT ********************************* */
  
  it("should not allow duplicate payments for the same booking", async () => {
    const res = await request(app)
      .post(`/api/payment/${confirmedBooking.id}/pay`)
      .set("Authorization", `Bearer ${userToken}`);

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("message", "Payment already exists for this booking");
  });

    /* ************************************* GET PAYMENT BY BOOKING **************************** */

  it("should retrieve payment details for a booking", async () => {
    const res = await request(app)
      .get(`/api/payment/${confirmedBooking.id}`)
      .set("Authorization", `Bearer ${userToken}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("message", "Payment retrieved successfully");
    expect(res.body.payment).toHaveProperty("amount", "150.00");
    expect(res.body.payment.Booking).toBeDefined();
    expect(res.body.payment.Booking.Resource.name).toBe("Dr. Smith");
  });

    /* ************************************* GET ALL PAYMENTS (ADMIN) *************************** */

  it("should allow admin to retrieve all payments", async () => {
    const res = await request(app)
      .get("/api/payment")
      .set("Authorization", `Bearer ${adminToken}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("message", "All payments retrieved");
    expect(Array.isArray(res.body.payments)).toBe(true);
    expect(res.body.count).toBeGreaterThanOrEqual(1);
  });


  /* ************************************* ACCESS CONTROL ************************************* */

  it("should prevent normal users from accessing all payments", async () => {
    const res = await request(app)
      .get("/api/payment")
      .set("Authorization", `Bearer ${userToken}`);

    expect(res.statusCode).toBe(403);
    expect(res.body).toHaveProperty("message", "Access denied. Admins only.");
  });


});