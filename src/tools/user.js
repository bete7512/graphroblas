import client from "../configuration/apollo.config";
import { USER_BY_USERNAME } from "../constants/query";
const User = async (variables) => {
    const data = await client.request(USER_BY_USERNAME, variables);
    return data['users'][0];
    }

export { User}