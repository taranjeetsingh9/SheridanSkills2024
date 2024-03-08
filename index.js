const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodoverride = require("method-override");
const Feedback = require("./models/feedback.js");
const RegistrationS = require("./models/registrationS.js");


app.use(methodoverride("_method"));

// mongo db connect
app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: "true" }));

main()
  .then(() => {
    console.log("connection Successful to database");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/skillSheridan");
}

// home page

app.get("/", (req, res) => {
  res.render("home.ejs");
});

// registerations
app.get("/register", (req, res) => {
  res.render("registration.ejs");
});

// Handle registration form submission
app.post("/registrationform/submitted", async (req, res) => {
  try {
    const { studentName, studentEmail, studentNumber, eventSelection } =
      req.body;

    const newRegistration = new RegistrationS({
      studentName,
      studentEmail,
      studentNumber,
      eventSelection,
    });

    await newRegistration.save();

    console.log(newRegistration);
    res.status(200).redirect("/");
  } catch (error) {
    console.error("Error submitting registration:", error);
    res.status(500).send("Internal Server Error");
  }
});

// show registrations

app.get("/showRegistrations", async (req, res) => {
  let registrations = await RegistrationS.find();
  res.render("showRegistrations.ejs", { registrations });
});

// feedback
app.get("/feedback", (req, res) => {
  res.render("feedback.ejs");
});

// feeback form submitted post /feedbackform/submitted

app.post("/feedbackform/submitted", async (req, res) => {
  try {
    const {
      studentName,
      eventRating,
      feedbackComments,
      suggestions,
      favoritePart,
    } = req.body;

    let newFeedback = new Feedback({
      studentName: studentName,
      eventRating: eventRating,
      feedbackComments: feedbackComments,
      suggestions: suggestions,
      favoritePart: favoritePart,
    });

    newFeedback.save();

    console.log(newFeedback);

    res.status(200).redirect("/");
  } catch (error) {
    console.error("Error submitting feedback:", error);
    res.status(500).send("Internal Server Error");
  }
});

// get all feedbacks

app.get("/feedback/show", async (req, res) => {
  let feedbacks = await Feedback.find();
  res.render("showFeedback.ejs", { feedbacks });
});

// get list of participants

app.get("/showParticipants", async (req, res) => {
  try {
    // Retrieve registrations from the database
    const registrations = await RegistrationS.find(
      {},
      "studentName eventSelection"
    );

    // Render the EJS template and pass the registrations data
    res.render("list.ejs", { registrations });
  } catch (error) {
    console.error("Error retrieving registrations:", error);
    res.status(500).send("Internal Server Error");
  }
});

// about us
app.get("/about", (req, res) => {
  res.render("about.ejs");
});

// set port number
app.listen("8080", () => {
  console.log("server is listening on port 8080");
});
