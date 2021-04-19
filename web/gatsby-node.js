const { isFuture } = require("date-fns");
/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const { format } = require("date-fns");

async function createMagazinePostPages(graphql, actions, reporter) {
  const { createPage } = actions;
  const result = await graphql(`
    {
      allSanityPost(filter: { slug: { current: { ne: null } } }) {
        edges {
          node {
            id
            publishedAt
            slug {
              current
            }
          }
        }
      }
    }
  `);

  if (result.errors) throw result.errors;

  const postEdges = (result.data.allSanityPost || {}).edges || [];

  postEdges.forEach((edge, index) => {
    const { id, slug = {}, publishedAt } = edge.node;
    const dateSegment = format(publishedAt, 'YYYY/MM');
    const path = `/magazine/${dateSegment}/${slug.current}/`;

    reporter.info(`Creating magazine post page: ${path}`);

    createPage({
      path,
      component: require.resolve('./src/templates/magazine-post.tsx'),
      context: { id },
    });
  });
}

async function createMagazineCategoryPages(graphql, actions, reporter) {
  const { createPage } = actions;
  const result = await graphql(`
    {
      allSanityCategory {
        edges {
          node {
            id
            title
            slug {
              current
            }
          }
        }
      }
    }
  `);

  if (result.errors) throw result.errors;

  const categoryEdges = (result.data.allSanityCategory || {}).edges || [];

  categoryEdges.forEach((edge, index) => {
    const { id, slug = {} } = edge.node;
    const path = `/magazine/category/${slug.current}/`;

    reporter.info(`Creating magazine category page: ${path}`);

    createPage({
      path,
      component: require.resolve('./src/templates/magazine-category.tsx'),
      context: {
        id,
        slug: slug.current
      },
    });
  });
}

exports.createPages = async ({ graphql, actions, reporter }) => {
  await createMagazinePostPages(graphql, actions, reporter);
  await createMagazineCategoryPages(graphql, actions, reporter);
  // await createProjectPages(graphql, actions, reporter)
};

// exports.sourceNodes = async (
//   { actions: { createNode }, createNodeId, createContentDigest, store, cache },
//   _ref,
//   done
// ) => {
//   const imageNode = await createRemoteFileNode({
//     url,
//     store,
//     cache,
//     createNode,
//     createNodeId,
//     name: `google-doc-image-${imageToken}`,
//   })
// };

// Use to manipulate individual nodes
exports.onCreateNode = async ({
  node,
  actions,
  store,
  cache,
  createNodeId,
}) => {
  // const { createNodeField } = actions;
  // console.log(node.internal.type)
  if (node.internal.type === 'SanityImageAsset') {
    // TODO: Create file node for svg and image files not processed by Gatsby
    // console.log(node.url)
    // const imageNode = await createRemoteFileNode({
    //   url: node.url,
    //   store,
    //   cache,
    //   createNode: actions.createNode,
    //   // createNodeId: actions.createNodeId,
    //   createNodeId: () => Math.floor(Math.random() * 100000000000000).toString(),
    //   name: `custom-local-image`,
    // })
  }
};
