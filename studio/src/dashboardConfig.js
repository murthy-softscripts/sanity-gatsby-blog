export default {
  widgets: [
    { name: "structure-menu" },
    {
      name: "project-info",
      options: {
        __experimental_before: [
          {
            name: "netlify",
            options: {
              description:
                "NOTE: Because these sites are static builds, they need to be re-deployed to see the changes when documents are published.",
              sites: [
                {
                  buildHookId:
                    "607d655d9d474651dba223ad",
                  title: "Sanity Studio",
                  name: "sanity-gatsby-blog-studio-6nh93y6p",
                  apiId: "f6372900-ba02-488b-b506-a56cfed6a674",
                },
                {
                  buildHookId: "607d655dcaf56521423bba65",
                  title: "Blog Website",
                  name: "sanity-gatsby-blog-web-m78gkfpu",
                  apiId: "c354c9ed-fee0-40a3-896f-1b6b419bcd8b",
                },
              ],
            },
          },
        ],
        data: [
          {
            title: "GitHub repo",
            value:
              "https://github.com/murthy-softscripts/sanity-gatsby-blog",
            category: "Code",
          },
          {
            title: "Frontend",
            value: "https://sanity-gatsby-blog-web-m78gkfpu.netlify.app",
            category: "apps",
          },
        ],
      },
    },
    { name: "project-users", layout: { height: "auto" } },
    {
      name: "document-list",
      options: {
        title: "Recent blog posts",
        order: "_createdAt desc",
        types: ["post"],
      },
      layout: { width: "medium" },
    },
  ],
};
