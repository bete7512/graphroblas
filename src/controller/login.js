import bcrypt from 'bcrypt';
import { config as dotenvConfig } from 'dotenv';
import { User } from '../tools/user';
import jwt from 'jsonwebtoken';

dotenvConfig();

const handler = async (req, res) => {
  const { username, password } = req.body.input.inputs;
  console.log(username, password);
  const user  = await User({ username });
  console.log(user);

  if (!user) {
    return res.status(400).json({
      message: 'incorrect username or password please enter again',
    });
  } else {
    const value = await bcrypt.compare(password, user.password);
    console.log(value);
    if (!value) {
      return res.status(400).json({
        message: 'incorrect password',
      });
    }

    const token = jwt.sign(
      {
        'https://hasura.io/jwt/claims': {
          'x-hasura-allowed-roles': [
            'manager',
          ],
          'x-hasura-default-role': user.role,
          'x-hasura-user-id': `${user.id}`,
        },
      },
      process.env.HASURA_GRAPHQL_JWT_SECRET
    );

    return res.json({
      accesToken: token,
    });
  }
};


module.exports = handler;