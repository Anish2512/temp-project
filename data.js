export const data = {
    interns: [
      { id: 1, name: "John Doe" },
      { id: 2, name: "Jane Smith" },
      { id: 3, name: "Alice Johnson" },
    ],
    directors: [
      {
        id: 1,
        name: "Director A",
        supervisors: [
          {
            id: 101,
            name: "Supervisor 1",
            teamMembers: [
              { id: 1001, name: "FTE 1A" },
              { id: 1002, name: "FTE 2A" },
            ],
          },
          {
            id: 102,
            name: "Supervisor 2",
            teamMembers: [
              { id: 1003, name: "FTE 3A" },
              { id: 1004, name: "FTE 4A" },
            ],
          },
        ],
        smes: ["SME 1A", "SME 2A"],
      },
      {
        id: 2,
        name: "Director B",
        supervisors: [
          {
            id: 201,
            name: "Supervisor 3",
            teamMembers: [
              { id: 2001, name: "FTE 1B" },
              { id: 2002, name: "FTE 2B" },
            ],
          },
          {
            id: 202,
            name: "Supervisor 4",
            teamMembers: [
              { id: 2003, name: "FTE 3B" },
              { id: 2004, name: "FTE 4B" },
            ],
          },
        ],
        smes: ["SME 1B", "SME 2B"],
      },
    ],
  };
  