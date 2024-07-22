export interface GetEventsOptions {
  query?: string;
  page: number;
  limit: number;
}

type PipelineStage =
  | {
      $search: {
        index: string;
        text: {
          query: string;
          fuzzy: {
            maxEdits: number;
            prefixLength: number;
            maxExpansions: number;
          };
          path: {
            wildcard: string;
          };
        };
      };
    }
  | {
      $skip: number;
    }
  | {
      $limit: number;
    };

// const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export type EventType =
  | "Physical Meetup"
  | "Product Demo Day"
  | "Technical Workshop"
  | "Virtual Hackathon";

export type LocationType = "VIRTUAL" | "IN-PERSON";

type EventList = {
  eventType: EventType;
  theme: string;
  date: string;
  monthYear: string;
  location: LocationType; // Location type: Virtual or In-Person
  link: string;
};

export const getEvents = ({
  query,
  page = 1,
  limit = 10,
}: GetEventsOptions) => {
  const skip = (page - 1) * limit;

  const pipeline: PipelineStage[] = [{ $skip: skip }, { $limit: limit }];

  if (query) {
    pipeline.unshift({
      $search: {
        index: "search",
        text: {
          query,
          fuzzy: {
            maxEdits: 1,
            prefixLength: 3,
            maxExpansions: 50,
          },
          path: {
            wildcard: "*",
          },
        },
      },
    });
  }

  const totalPages = Math.ceil(eventsList.length / limit);

  const result = eventsList.slice(skip, skip + limit);

  return { events: result, totalPages };
};

export const eventsList: EventList[] = [
  {
    eventType: "Physical Meetup",
    theme: "ETHAbuja Community Launched",
    monthYear: "Aug 2023",
    date: "19",
    location: "IN-PERSON",
    link: "#",
  },
  {
    eventType: "Physical Meetup",
    theme: "Idea Brainstorming & latest updates",
    monthYear: "Sep 2023",
    date: "30",
    location: "IN-PERSON",
    link: "https://lu.ma/1wfrujuj",
  },
  {
    eventType: "Physical Meetup",
    theme: "Eth Abuja Builders EOY Meetup",
    monthYear: "Dec 2023",
    date: "2",
    location: "IN-PERSON",
    link: "https://lu.ma/sti6kqe3",
  },
  {
    eventType: "Physical Meetup",
    theme: "Eth Abuja builders first Meetup of year - ",
    monthYear: "Aug 2024",
    date: "3",
    location: "IN-PERSON",
    link: "https://lu.ma/f4qlz8tx",
  },
  {
    eventType: "Product Demo Day",
    theme: "Tech Showcase: Future Innovations",
    monthYear: "Aug 2024",
    date: "3",
    location: "IN-PERSON",
    link: "https://lu.ma/f4qlz8tx",
  },
  // {
  //   eventType: "Technical Workshop",
  //   theme: "Advanced Web Development Workshop",
  //    monthYear: "Aug 2023",
  //   date: "19",
  //   location: "IN-PERSON",
  //   link: ""
  // },
  // {
  //   eventType: "Virtual Hackathon",
  //   theme: "Decentralized App Development Challenge",
  //   monthYear: "Aug 2023",
  //   date: "19",
  //   location: "VIRTUAL",
  //   link: ""
  // },
];
