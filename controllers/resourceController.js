const { Resource } = require("../models");
const DoctorDetail = require("../mongodb_models/doctorDetail");
const RestaurantDetail = require("../mongodb_models/restaurantDetail");
const MeetingRoomDetail = require("../mongodb_models/meetingRoomDetail");

/* ****************************************************************************************** */
/* ************************************* GET A SINGLE RESOURCE ****************************** */
/* ****************************************************************************************** */

exports.getResourceById = async (req, res) => {
  try {
    const { id } = req.params;

    const resource = await Resource.findByPk(id);

    if (!resource) {
      return res.status(404).json({ message: "Resource not found" });
    }

    let detail = null;

    switch (resource.type) {
      case "doctor":
        detail = await DoctorDetail.findOne({ my_sql_resource_id: id });
        break;

      case "restaurant table":
        detail = await RestaurantDetail.findOne({ my_sql_resource_id: id });
        break;

      case "meeting room":
        detail = await MeetingRoomDetail.findOne({ my_sql_resource_id: id });
        break;

      default:
        break;
    }

    const response = {
      resource,
      detail,
    };

    return res.status(200).json({
      message: "Resource retrieved successfully",
      data: response,
    });
  } catch (error) {
    console.error("Error fetching resource:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

/* ****************************************************************************************** */
/* ************************************* END ************************************************ */
/* ****************************************************************************************** */

/* ****************************************************************************************** */
/* ************************************* GET ALL RESOURCES ********************************** */
/* ****************************************************************************************** */

exports.getAllResources = async (req, res) => {
  try {
    const resources = await Resource.findAll();

    const resourcesWithDetails = await Promise.all(
      resources.map(async (resource) => {
        let mongoDetail = null;

        if (resource.type === "doctor") {
          mongoDetail = await DoctorDetail.findOne({
            my_sql_resource_id: resource.id,
          });
        } else if (resource.type === "restaurant table") {
          mongoDetail = await RestaurantDetail.findOne({
            my_sql_resource_id: resource.id,
          });
        } else if (resource.type === "meeting room") {
          mongoDetail = await MeetingRoomDetail.findOne({
            my_sql_resource_id: resource.id,
          });
        }

        return {
          id: resource.id,
          name: resource.name,
          type: resource.type,
          status: resource.status,
          details: mongoDetail || null,
        };
      })
    );

    res.status(200).json(resourcesWithDetails);
  } catch (err) {
    console.error("Error fetching resources:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

/* ****************************************************************************************** */
/* ************************************* END ************************************************ */
/* ****************************************************************************************** */
