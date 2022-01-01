// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { RecipeNT } = initSchema(schema);

export {
  RecipeNT
};