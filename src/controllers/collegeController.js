const collegeModel = require("../models/collegeModel");
const internModel = require("../models/internModel");
const {
  isValidRequest,
  isValidName,
  isValid,
  isValidLink,
} = require("../validator/validator");

// ----------------------------------create author----------------------------------
const createCollege = async function (req, res) {
  try {
    // input validation
    if (!isValidRequest(req.body))
      return res
        .status(400)
        .send({ status: false, message: "Please enter a valid input" });

    let { name, fullName, logoLink, isDeleted } = req.body;

    let college = {};

    // name validation
    if (!name)
      return res
        .status(400)
        .send({ status: false, message: "College name is required" });
    if (!isValidName(name))
      return res.status(400).send({
        status: false,
        message: "Please enter a valid college name",
      });
    // checking for duplicate data
    let clg = await collegeModel.findOne({ name: name, isDeleted: false });
    if (clg)
      return res
        .status(409)
        .send({ status: false, message: "College name is already present" });
    college.name = name;

    // fullName validation
    if (!fullName)
      return res
        .status(400)
        .send({ status: false, message: "Full name of college is required" });
    if (!isValid(fullName))
      return res
        .status(400)
        .send({ status: false, message: "Please enter a valid full name" });

    if (fullName) {
      fullName = req.body.fullName
        .split(" ")
        .filter((word) => word)
        .join(" ");
    }

    college.fullName = fullName;

    // logo link validation
    if (!logoLink)
      return res
        .status(400)
        .send({ status: false, message: "Logo link is required" });
    if (!isValidLink(logoLink))
      return res
        .status(400)
        .send({ status: false, message: "Please enter a valid logo link" });
    college.logoLink = logoLink;

    if (isDeleted === "true" || isDeleted === true)
      return res.status(400).send({
        status: false,
        message:
          "You are not allow to delete the same college while creating it",
      });

    let savedData = await collegeModel.create(college);
    return res.status(201).send({ status: true, data: savedData });
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
};

// -------------------------get list of Interns from particulate college------------------------
const getDetails = async function (req, res) {
  try {
    // checking the body part, college name shouldn't come from body
    if (req.body.collegeName)
      return res.status(400).send({
        status: false,
        message: "Please send the college name in query params",
      });

    let { collegeName } = req.query;

    if (!collegeName) {
      return res
        .status(400)
        .send({ status: false, message: "Enter collegeName in the query" });
    }

    // validating the college name
    if (!isValidName(collegeName))
      return res
        .status(400)
        .send({ status: false, message: "Please enter a valid college name" });

    // solution with help of aggregation
    let result = await collegeModel.aggregate([
      {
        $lookup: {
          from: "interns",
          localField: "_id",
          foreignField: "collegeId",
          as: "interns",
        },
      },
      {
        $unwind: "$interns",
      },
      {
        $match: {
          name: collegeName,
          isDeleted: false,
          "interns.isDeleted": false,
        },
      },
      {
        $group: {
          _id: "$_id",
          name: { $first: "$name" },
          fullName: { $first: "$fullName" },
          logoLink: { $first: "$logoLink" },
          interns: { $push: "$interns" },
        },
      },
      {
        $project: {
          _id: 0,
          name: 1,
          fullName: 1,
          logoLink: 1,
          "interns._id": 1,
          "interns.name": 1,
          "interns.email": 1,
          "interns.mobile": 1,
        },
      },
    ]);

    if (!result.length)
      return res
        .status(404)
        .send({ status: false, message: "Data is not found  " });

    // normal solution

    // let checkCollege = await collegeModel.findOne({
    //   name: collegeName,
    //   isDeleted: false,
    // });

    // if (!checkCollege)
    //   return res
    //     .status(404)
    //     .send({ status: false, message: "College is not found" });

    // let id = checkCollege._id;

    // let getIntern = await internModel
    //   .find({ collegeId: id, isDeleted: false })
    //   .select({ __v: 0, isDeleted: 0, collegeId: 0 });

    // if (!getIntern.length)
    //   return res.status(404).send({
    //     status: false,
    //     message: `No intern present for ${collegeName} college`,
    //   });

    // let result = await collegeModel
    //   .findOne({ name: collegeName, isDeleted: false })
    //   .select({ name: 1, fullName: 1, logoLink: 1, _id: 0 });

    // result._doc["interns"] = getIntern;
    res.setHeader("Access-Control-Allow-Origin", "*");
    return res.status(200).send({ status: true, data: result[0] });
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
};

module.exports = {
  createCollege,
  getDetails,
};
