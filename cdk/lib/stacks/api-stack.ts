import { join } from 'path';
import { Duration, Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { FunctionUrlAuthType, HttpMethod, Runtime } from 'aws-cdk-lib/aws-lambda';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';

interface ApiStackProps extends StackProps {
}

export class ApiStack extends Stack {

  constructor(scope: Construct, id: string, props: ApiStackProps) {
    super(scope, id, props);

    const demoLambda = new NodejsFunction(this, 'DemoLambda', {
      runtime: Runtime.NODEJS_18_X,
      handler: 'index.handler',
      entry: join(__dirname, '../../../src/index.ts'),
      bundling: {
        nodeModules: ['@types/aws-lambda'],
      },
      environment: {
        TEST_VALUE: 'TEST',
      },
    });

    const lambdaFunctionUrl = demoLambda.addFunctionUrl({
      authType: FunctionUrlAuthType.NONE,
      cors: {
        allowedOrigins: ['*'],
        allowedHeaders: ['Authorization'],
        allowedMethods: [
          HttpMethod.ALL,
          // HttpMethod.GET,
          // HttpMethod.HEAD,
          // HttpMethod.OPTIONS,
          // HttpMethod.POST,
          // HttpMethod.DELETE,
          // HttpMethod.PUT,
          // HttpMethod.PATCH,
        ],
        maxAge: Duration.days(1),
      }
    });
  }
}
