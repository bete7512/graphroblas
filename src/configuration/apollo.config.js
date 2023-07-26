import { GraphQLClient } from 'graphql-request'
// eslint-disable-next-line no-unused-vars
import * as dotenv from 'dotenv'

dotenv.config()
const client = new GraphQLClient(process.env.HASURA_END_POINT || 'https://roblassupplychainpro.hasura.app/v1/graphql', {
  headers: {
    'x-hasura-admin-secret': process.env.HASURA_ADMIN_SECRET || 'NMWO9l2rEQIWPAMyGtAB3WEnYnAARD96H5wvbNRhgrzT9Lfx1fu3IBV5kVNFCGF5',
  },
})
export default client
