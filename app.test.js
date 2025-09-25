const app = require("./app");
const request = require("supertest");

describe("/events", () => {
  test("GET - responds with all events", async () => {
    const response = await request(app).get("/events");

    expect(response.body).toEqual([
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
        image:
          "https://shinesolutions.com/wp-content/uploads/2023/12/twitter.png",
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
    ]);

    expect(response.status).toBe(200);
  });
  test("POST - responds with a success message and all events including new event", async () => {
    const response = await request(app).post("/events").send({
          name: "Microsoft Build 2025",
          image:
            "https://msftstories.thesourcemediaassets.com/sites/728/2025/05/screenshot-build-hero.png",
          description:
            "Microsoft's flagship developer conference focusing on AI, cloud, developer tools, and platform innovations, held May 19-22, 2025 in Seattle[88][91].",
          date: "2025-05-19T09:00:00.000Z",
          location: "Seattle, WA, USA",
          id: 4,
        });

    expect(response.body).toEqual({
      message: "Successfuly created new event",
      events: [
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
          image:
            "https://shinesolutions.com/wp-content/uploads/2023/12/twitter.png",
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
        {
          name: "Microsoft Build 2025",
          image:
            "https://msftstories.thesourcemediaassets.com/sites/728/2025/05/screenshot-build-hero.png",
          description:
            "Microsoft's flagship developer conference focusing on AI, cloud, developer tools, and platform innovations, held May 19-22, 2025 in Seattle[88][91].",
          date: "2025-05-19T09:00:00.000Z",
          location: "Seattle, WA, USA",
          id: 4,
        },
      ],
    });
    expect(response.status).toBe(201)
  });
});

describe("/events/:id", () => {
  it("GET - responds with an event with the corresponding id", async () => {
    const response = await request(app).get("/events/2");

    expect(response.body).toEqual({
      name: "AWS re:Invent 2025",
      image:
        "https://shinesolutions.com/wp-content/uploads/2023/12/twitter.png",
      description:
        "Amazon Web Services' flagship conference, showcasing the latest in cloud computing, new service announcements, and hands-on learning labs for developers and IT professionals.",
      date: "2025-12-01T09:00:00.000Z",
      location: "Las Vegas, NV, USA",
      id: 2,
    });
    expect(response.status).toBe(200);
  });
  it("DELETE - responds with a success message and all events minus event with corresponding id", async () => {
    const response = await request(app).delete("/events/1");
    console.log(response.text)
    expect(response.body).toEqual({
      message: "Successfully deleted event",
      events: [
        {
          name: "AWS re:Invent 2025",
          image:
            "https://shinesolutions.com/wp-content/uploads/2023/12/twitter.png",
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
        {
          name: "Microsoft Build 2025",
          image:
            "https://msftstories.thesourcemediaassets.com/sites/728/2025/05/screenshot-build-hero.png",
          description:
            "Microsoft's flagship developer conference focusing on AI, cloud, developer tools, and platform innovations, held May 19-22, 2025 in Seattle[88][91].",
          date: "2025-05-19T09:00:00.000Z",
          location: "Seattle, WA, USA",
          id: 4,
        },
      ],
    });
    expect(response.status).toBe(200);
  });
});
