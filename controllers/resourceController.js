const { Resource } = require("../models");

exports.getResourceById = async (req, res) => {
  try {
    const { id } = req.params;

    const resource = await Resource.findByPk(id);

    if (!resource) {
      return res.status(404).json({ message: "Resource not found" });
    }

    



    return res.status(200).json(resource);
  } catch (error) {
    console.error("Error fetching resource:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
