const request = require("supertest");
const app = require("../server");
const { sequelize, Resource, User } = require("../models");
const mongoose = require("mongoose");
const DoctorDetail = require("../mongodb_models/DoctorDetail");
const RestaurantDetail = require("../mongodb_models/RestaurantDetail");
const MeetingRoomDetail = require("../mongodb_models/MeetingRoomDetail");

describe("Resource Endpoints", () => {
  let authToken;
  let doctorResource, restaurantResource, meetingRoomResource;

  const adminUser = {
    username: "adminuser",
    email: "admin@example.com",
    password: "password123",
    phone: "1234567890",
    role: "admin",
  };

  beforeAll(async () => {
    
    await sequelize.sync({ force: true });

    
    const registerRes = await request(app)
      .post("/api/auth/register")
      .send(adminUser);

    expect(registerRes.statusCode).toBe(201);
    authToken = registerRes.body.token;

    
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(process.env.MONGO_URL_TEST);
    }

    
    await DoctorDetail.deleteMany({});
    await RestaurantDetail.deleteMany({});
    await MeetingRoomDetail.deleteMany({});

    
    doctorResource = await Resource.create({
      name: "Dr. Smith",
      type: "doctor",
      status: "available",
    });

    restaurantResource = await Resource.create({
      name: "La Bella",
      type: "restaurant table",
      status: "available",
    });

    meetingRoomResource = await Resource.create({
      name: "Conference Room A",
      type: "meeting room",
      status: "available",
    });

    
    await DoctorDetail.create({
      my_sql_resource_id: doctorResource.id,
      bio: "Experienced cardiologist with 10 years in practice.",
      specializations: ["Cardiology", "Internal Medicine"],
    });

    await RestaurantDetail.create({
      my_sql_resource_id: restaurantResource.id,
      menu: ["Pizza", "Pasta", "Tiramisu"],
      photos: ["photo1.jpg", "photo2.jpg"],
      faqs: ["Is there parking?", "Do you offer vegan options?"],
    });

    await MeetingRoomDetail.create({
      my_sql_resource_id: meetingRoomResource.id,
      capacity: 20,
      amenities: ["Projector", "Whiteboard", "WiFi"],
    });
  });

  afterAll(async () => {
    await sequelize.close();
    await mongoose.connection.close();
  });

  it("should retrieve all resources", async () => {
    const res = await request(app)
      .get("/api/resource")
      .set("Authorization", `Bearer ${authToken}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(3);

    const doctor = res.body.find(r => r.type === "doctor");
    expect(doctor).toHaveProperty("name", "Dr. Smith");
    const restaurant = res.body.find(r => r.type === "restaurant table");
    expect(restaurant).toHaveProperty("name", "La Bella");
    const meetingRoom = res.body.find(r => r.type === "meeting room");
    expect(meetingRoom).toHaveProperty("name", "Conference Room A");
  });

  it("should retrieve a single resource with its MongoDB details", async () => {
    const res = await request(app)
      .get(`/api/resource/${doctorResource.id}`)
      .set("Authorization", `Bearer ${authToken}`);

    expect(res.statusCode).toBe(200);

    const { resource, detail } = res.body.data;

    expect(resource).toHaveProperty("id", doctorResource.id);
    expect(resource).toHaveProperty("name", "Dr. Smith");
    expect(resource).toHaveProperty("type", "doctor");

    expect(detail).toHaveProperty("bio", "Experienced cardiologist with 10 years in practice.");
    expect(detail.specializations).toContain("Cardiology");
  });
});
