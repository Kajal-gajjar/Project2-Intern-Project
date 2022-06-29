const collegeModel = require("../models/collegeModel");
const internModel = require("../models/internModel");
const {
  isValidRequest,
  isValidName,
  isValidMobile,
  isValidMail,
} = require("../validator/validator");

// -----------------------------------create Intern-----------------------------------
const createIntern = async function (req, res) {
  try {
    if (!isValidRequest(req.body))
      return res
        .status(400)
        .send({ status: false, message: "Please enter a valid input" });

    const { name, mobile, email, collegeName } = req.body;
    let intern = {};

    // validation for intern name
    if (!name)
      return res
        .status(400)
        .send({ status: false, message: "Intern name is required" });
    if (!isValid(name))
      return res.status(400).send({
        status: false,
        message: "Please enter a valid college name",
      });
    intern.name = name;

    // validating the email ID
    if (!email)
      return res
        .status(400)
        .send({ status: false, message: "Please enter email ID" });
    if (!isValidMail(email))
      return res
        .status(400)
        .send({ status: false, message: "Enter a valid mail ID" });
    // validating mobile number
    if (!mobile)
      return res
        .status(400)
        .send({ status: false, message: "Please enter Mobile number" });
    if (!isValidMobile(mobile))
      return res
        .status(400)
        .send({ status: false, message: "Please enter valid mobile Number" });

    // checking for the duplicate mail ID and mobile number
    let validate = await internModel.findOne({
      $or: [{ email: email }, { mobile: mobile }],
    });
    if (validate)
      return res.status(409).send({
        status: false,
        message: "Email ID or Mobile number is already in use",
      });
    else {
      intern.email = email;
      intern.mobile = mobile;
    }

    // getting college Id from college name
    if (!collegeName)
      return res.status(400).send({
        status: false,
        message: "Please enter the college name",
      });
    if (collegeName) {
      let college = await collegeModel.findOne({
        $or: [{ name: collegeName }, { fullName: collegeName }],
      });
      if (!college)
        return res.status(400).send({
          status: false,
          message: "Please enter valid college name",
        });
      intern.collegeId = college._id;
    }

    // creating the data
    let savedData = await internModel.create(intern);
    return res.status(201).send({ status: true, data: savedData });
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
};

module.exports = {
  createIntern,
};
