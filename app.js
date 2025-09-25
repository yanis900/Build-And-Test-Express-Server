const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const events = [
  {
    name: "QCon San Francisco 2025",
    image:
      "https://pbs.twimg.com/profile_images/1357604752377470976/tTMWJpMp_400x400.png",
    description:
      "A premier software conference for senior software engineers, architects, and team leads focusing on emerging software trends and technical leadership.",
    date: "2025-11-17T09:00:00.000Z",
    location: "San Francisco, CA, USA",
    id: 1,
  },
  {
    name: "AWS re:Invent 2025",
    image: "https://shinesolutions.com/wp-content/uploads/2023/12/twitter.png",
    description:
      "Amazon Web Services' flagship conference, showcasing the latest in cloud computing, new service announcements, and hands-on learning labs for developers and IT professionals.",
    date: "2025-12-01T09:00:00.000Z",
    location: "Las Vegas, NV, USA",
    id: 2,
  },
  {
    name: "Google I/O 2025",
    image:
      "https://testlio.com/wp-content/uploads/google-image-credit-dev_blog_02-1.png",
    description:
      "Google’s annual developer festival, where they announce the latest updates for Android, Google Cloud Platform, AI, and other developer technologies.",
    date: "2025-05-14T17:00:00.000Z",
    location: "Mountain View, CA, USA",
    id: 3,
  },
];

app.get("/events", (req, res) => {
  res.send(events);
});

app.post("/events", (req, res) => {
  const newEvent = req.body
  events.push(newEvent)

  const result = {
    message: "Successfuly created new event",
    events: events
  }
  res.status(201).send(result);
});

app.get("/events/:id", (req, res) => {
  const id = Number(req.params["id"]);

  const eventById = events.find((event) => {
    return event.id === id;
  });
  res.send(eventById);
});

app.delete("/events/:id", (req, res) => {
  const id = Number(req.params["id"]);

  const index = events.findIndex((event) => {
    return event.id === id;
  });
  events.splice(index, 1);

  const result = {
    message: "Successfully deleted event",
    events: events,
  };

  res.send(result);
});

module.exports = app;
