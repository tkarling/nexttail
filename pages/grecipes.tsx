// pages/index.js
import type { NextApiRequest, NextApiResponse } from "next";
// import { Authenticator } from "@aws-amplify/ui-react";
import { Amplify, API, Auth, withSSRContext } from "aws-amplify";
// import Head from "next/head";
// import awsExports from "../src/aws-exports";
// import { createRecipeNT } from "../src/graphql/mutations";
import { listRecipeNTS } from "../src/graphql/queries";
// import styles from "../styles/Home.module.css";

import { Authenticator } from "@aws-amplify/ui-react";
import { Page, PageTitle, Card, Spinner, Button } from "../components/Common";
import { Recipe, RecipeContent } from "../types/index";
import { loadRecipes } from "./api/recipe";
import AddRecipe from "../components/AddRecipe";
import useRecipes from "../hooks/useRecipesMock";
import { createRecipeNT, deleteRecipeNT } from "../src/graphql/mutations";

// Amplify.configure({ ...awsExports, ssr: true });

export async function getServerSideProps({ req }: { req: NextApiRequest }) {
  let recipes = [];
  const SSR = withSSRContext({ req });
  try {
    const response = await SSR.API.graphql({ query: listRecipeNTS });
    recipes = response.data.listRecipeNTS.items
      .filter((item: any) => !item._deleted)
      .map((item: any) => {
        const { id, name, url } = item;
        return { id, name, url };
      });
    console.log(
      "🚀 ~ file: grecipes.tsx ~ line 16 ~ getServerSideProps ~ response",
      response
    );
  } catch (error) {
    console.log(
      "🚀 ~ file: grecipes.tsx ~ line 22 ~ getServerSideProps ~ error",
      error
    );
  }

  return {
    props: {
      recipes,
    },
  };
}

async function addRecipe(recipeContent: RecipeContent) {
  //   event.preventDefault();

  //   const form = new FormData(event.target);

  try {
    const { data } = await API.graphql({
      authMode: "AMAZON_COGNITO_USER_POOLS",
      query: createRecipeNT,
      variables: {
        input: {
          ...recipeContent,
          //   title: form.get("title"),
          //   content: form.get("content"),
        },
      },
    });

    // window.location.href = `/posts/${data.createPost.id}`;
  } catch ({ errors }) {
    console.error(errors);
    // throw new Error(errors[0].message);
  }
}

async function deleteRecipe(recipe: Recipe) {
  //   event.preventDefault();

  //   const form = new FormData(event.target);

  try {
    const { data } = await API.graphql({
      authMode: "AMAZON_COGNITO_USER_POOLS",
      query: deleteRecipeNT,
      variables: {
        input: {
          id: recipe.id,
          _version: 1,
          //   title: form.get("title"),
          //   content: form.get("content"),
        },
      },
    });

    // window.location.href = `/posts/${data.createPost.id}`;
  } catch ({ errors }) {
    console.error(errors);
    // throw new Error(errors[0].message);
  }
}

interface Props {
  recipes: Recipe[];
}

const RecipePage: React.FC<{ addRecipe?: (recipe: RecipeContent) => void }> = ({
  children,
  addRecipe = () => {},
}) => (
  <Page>
    <PageTitle>Add Recipe</PageTitle>
    <AddRecipe addRecipe={addRecipe} />
    <PageTitle>Recipes</PageTitle>
    {children}
  </Page>
);

// const addRecipe = () => {};
// const deleteRecipe = ({ recipe }: Recipe) => {};

const Recipes: React.FC<Props> = ({ recipes: initialRecipes = [] }) => {
  //   const {
  //     data: recipes = [],
  //     isLoading,
  //     error,
  //     addRecipe,
  //     deleteRecipe,
  //   } = useRecipes({ initialRecipes });

  //   if (error) {
  //     return <RecipePage>Error: {error}</RecipePage>;
  //   }
  //   if (isLoading) {
  //     return (
  //       <RecipePage>
  //         <Spinner />
  //       </RecipePage>
  //     );
  //   }

  const recipes = initialRecipes;

  return (
    <Authenticator>
      {() => (
        <RecipePage addRecipe={addRecipe}>
          {recipes.map((recipe) => {
            const { id, name, url } = recipe;
            return (
              <Card key={id}>
                <div className="w-full flex justify-between">
                  <a href={url} target="_blank" rel="noreferrer">
                    <h2 className="capitalize">{name}</h2>
                    {/* <p>Find in-depth information about Next.js features and API.</p> */}
                  </a>
                  <Button onClick={() => deleteRecipe(recipe)} isDelete>
                    x
                  </Button>
                </div>
              </Card>
            );
          })}
          {!recipes.length && (
            <Card>
              <div>You have no Recipes. Please add a Recipe</div>
            </Card>
          )}
        </RecipePage>
      )}
    </Authenticator>
  );
};

export default Recipes;

// export default function Home({ recipes = [] }) {
//   console.log("🚀 ~ file: grecipes.tsx ~ line 66 ~ Home ~ recipes", recipes);
//   return (
//     <div className={styles.container}>
//       <Head>
//         <title>Amplify + Next.js</title>
//         <link rel="icon" href="/favicon.ico" />
//       </Head>

//       <main className={styles.main}>
//         <h1 className={styles.title}>Amplify + Next.js</h1>

//         {/* <p className={styles.description}>
//           <code className={styles.code}>{posts.length}</code>
//           posts
//         </p> */}

//         <div className={styles.grid}>
//           {/* {posts.map((post) => (
//             <a className={styles.card} href={`/posts/${post.id}`} key={post.id}>
//               <h3>{post.title}</h3>
//               <p>{post.content}</p>
//             </a>
//           ))} */}

//           {/* <div className={styles.card}>
//             <h3 className={styles.title}>New Post</h3>

//             <AmplifyAuthenticator>
//               <form onSubmit={handleCreatePost}>
//                 <fieldset>
//                   <legend>Title</legend>
//                   <input
//                     defaultValue={`Today, ${new Date().toLocaleTimeString()}`}
//                     name="title"
//                   />
//                 </fieldset>

//                 <fieldset>
//                   <legend>Content</legend>
//                   <textarea
//                     defaultValue="I built an Amplify app with Next.js!"
//                     name="content"
//                   />
//                 </fieldset>

//                 <button>Create Post</button>
//                 <button type="button" onClick={() => Auth.signOut()}>
//                   Sign out
//                 </button>
//               </form>
//             </AmplifyAuthenticator>
//           </div> */}
//         </div>
//       </main>
//     </div>
//   );
// }
