// Runtime: Node.js 18.x

import { Context, Handler, LambdaFunctionURLEvent } from 'aws-lambda';

export const handler: Handler = async (event: LambdaFunctionURLEvent, context: Context) => {
  const testEnvVar: string = process.env.TEST_VALUE || '';

  console.log(`Env var: ${testEnvVar}`);
  console.log(event);
  console.log(context);

  const response = {
    msg: 'Hello, world!',
  }

  console.log(response);
  return response;
};
