import * as coreClient from "@azure/core-client";
import * as coreRestPipeline from "@azure/core-rest-pipeline";
import * as coreAuth from "@azure/core-auth";
import * as Parameters from "./models/parameters.js";
import * as Mappers from "./models/mappers.js";
import {
  PresentationOptionalParams,
  AppCreateOptionalParams,
  AppCreateResponse,
  AppReadAllOptionalParams,
  AppReadAllResponse,
  CategoryCreateOptionalParams,
  CategoryCreateResponse,
  CategoryDeleteOptionalParams,
  CategoryDeleteResponse,
  CategoryReadAllOptionalParams,
  CategoryReadAllResponse,
  LogCreateOptionalParams,
  LogCreateResponse,
  LogReadAllTodayOptionalParams,
  LogReadAllTodayResponse,
  LogReadByAppOptionalParams,
  LogReadByAppResponse,
  LogReadByIdOptionalParams,
  LogReadByIdResponse,
  UserLoginOptionalParams,
  UserLoginResponse,
  UserRefreshTokenOptionalParams,
  UserRefreshTokenResponse,
  UserLogoutOptionalParams,
  UserLogoutResponse,
} from "./models/index.js";

export class Presentation extends coreClient.ServiceClient {
  $host: string;

  /**
   * Initializes a new instance of the Presentation class.
   * @param credentials Subscription credentials which uniquely identify client subscription.
   * @param $host server parameter
   * @param options The parameter options
   */
  constructor(
    credentials: coreAuth.TokenCredential,
    $host: string,
    options?: PresentationOptionalParams,
  ) {
    if (credentials === undefined) {
      throw new Error("'credentials' cannot be null");
    }
    if ($host === undefined) {
      throw new Error("'$host' cannot be null");
    }

    // Initializing default values for options
    if (!options) {
      options = {};
    }
    const defaults: PresentationOptionalParams = {
      requestContentType: "application/json; charset=utf-8",
      credential: credentials,
    };

    const packageDetails = `azsdk-js-presentation/1.0.0-beta.1`;
    const userAgentPrefix =
      options.userAgentOptions && options.userAgentOptions.userAgentPrefix
        ? `${options.userAgentOptions.userAgentPrefix} ${packageDetails}`
        : `${packageDetails}`;

    if (!options.credentialScopes) {
      options.credentialScopes = ["https://management.azure.com/.default"];
    }
    const optionsWithDefaults = {
      ...defaults,
      ...options,
      userAgentOptions: {
        userAgentPrefix,
      },
      endpoint: options.endpoint ?? options.baseUri ?? "{$host}",
    };
    super(optionsWithDefaults);

    let bearerTokenAuthenticationPolicyFound: boolean = false;
    if (options?.pipeline && options.pipeline.getOrderedPolicies().length > 0) {
      const pipelinePolicies: coreRestPipeline.PipelinePolicy[] =
        options.pipeline.getOrderedPolicies();
      bearerTokenAuthenticationPolicyFound = pipelinePolicies.some(
        (pipelinePolicy) =>
          pipelinePolicy.name ===
          coreRestPipeline.bearerTokenAuthenticationPolicyName,
      );
    }
    if (
      !options ||
      !options.pipeline ||
      options.pipeline.getOrderedPolicies().length == 0 ||
      !bearerTokenAuthenticationPolicyFound
    ) {
      this.pipeline.removePolicy({
        name: coreRestPipeline.bearerTokenAuthenticationPolicyName,
      });
      this.pipeline.addPolicy(
        coreRestPipeline.bearerTokenAuthenticationPolicy({
          credential: credentials,
          scopes:
            optionsWithDefaults.credentialScopes ??
            `${optionsWithDefaults.endpoint}/.default`,
          challengeCallbacks: {
            authorizeRequestOnChallenge:
              coreClient.authorizeRequestOnClaimChallenge,
          },
        }),
      );
    }
    // Parameter assignments
    this.$host = $host;
  }

  /** @param options The options parameters. */
  appCreate(options?: AppCreateOptionalParams): Promise<AppCreateResponse> {
    return this.sendOperationRequest({ options }, appCreateOperationSpec);
  }

  /** @param options The options parameters. */
  appReadAll(options?: AppReadAllOptionalParams): Promise<AppReadAllResponse> {
    return this.sendOperationRequest({ options }, appReadAllOperationSpec);
  }

  /** @param options The options parameters. */
  categoryCreate(
    options?: CategoryCreateOptionalParams,
  ): Promise<CategoryCreateResponse> {
    return this.sendOperationRequest({ options }, categoryCreateOperationSpec);
  }

  /** @param options The options parameters. */
  categoryDelete(
    options?: CategoryDeleteOptionalParams,
  ): Promise<CategoryDeleteResponse> {
    return this.sendOperationRequest({ options }, categoryDeleteOperationSpec);
  }

  /** @param options The options parameters. */
  categoryReadAll(
    options?: CategoryReadAllOptionalParams,
  ): Promise<CategoryReadAllResponse> {
    return this.sendOperationRequest({ options }, categoryReadAllOperationSpec);
  }

  /** @param options The options parameters. */
  logCreate(options?: LogCreateOptionalParams): Promise<LogCreateResponse> {
    return this.sendOperationRequest({ options }, logCreateOperationSpec);
  }

  /** @param options The options parameters. */
  logReadAllToday(
    options?: LogReadAllTodayOptionalParams,
  ): Promise<LogReadAllTodayResponse> {
    return this.sendOperationRequest({ options }, logReadAllTodayOperationSpec);
  }

  /** @param options The options parameters. */
  logReadByApp(
    options?: LogReadByAppOptionalParams,
  ): Promise<LogReadByAppResponse> {
    return this.sendOperationRequest({ options }, logReadByAppOperationSpec);
  }

  /** @param options The options parameters. */
  logReadById(
    options?: LogReadByIdOptionalParams,
  ): Promise<LogReadByIdResponse> {
    return this.sendOperationRequest({ options }, logReadByIdOperationSpec);
  }

  /** @param options The options parameters. */
  userLogin(options?: UserLoginOptionalParams): Promise<UserLoginResponse> {
    return this.sendOperationRequest({ options }, userLoginOperationSpec);
  }

  /** @param options The options parameters. */
  userRefreshToken(
    options?: UserRefreshTokenOptionalParams,
  ): Promise<UserRefreshTokenResponse> {
    return this.sendOperationRequest(
      { options },
      userRefreshTokenOperationSpec,
    );
  }

  /** @param options The options parameters. */
  userLogout(options?: UserLogoutOptionalParams): Promise<UserLogoutResponse> {
    return this.sendOperationRequest({ options }, userLogoutOperationSpec);
  }
}
// Operation Specifications
const serializer = coreClient.createSerializer(Mappers, /* isXml */ false);

const appCreateOperationSpec: coreClient.OperationSpec = {
  path: "/app/create",
  httpMethod: "POST",
  responses: {
    200: {
      bodyMapper: Mappers.BaseResponseUseCasesAppCreateResponse,
    },
    400: {
      bodyMapper: Mappers.BaseResponseSystemObject,
    },
    401: {
      bodyMapper: Mappers.BaseResponseSystemObject,
    },
    403: {
      bodyMapper: Mappers.BaseResponseSystemObject,
    },
    500: {
      bodyMapper: Mappers.BaseResponseSystemObject,
    },
  },
  requestBody: Parameters.body,
  urlParameters: [Parameters.$host],
  headerParameters: [Parameters.contentType, Parameters.accept],
  mediaType: "json",
  serializer,
};
const appReadAllOperationSpec: coreClient.OperationSpec = {
  path: "/app/read",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.BaseResponseListUseCasesAppReadAllResponse,
    },
    400: {
      bodyMapper: Mappers.BaseResponseSystemObject,
    },
    401: {
      bodyMapper: Mappers.BaseResponseSystemObject,
    },
    403: {
      bodyMapper: Mappers.BaseResponseSystemObject,
    },
    500: {
      bodyMapper: Mappers.BaseResponseSystemObject,
    },
  },
  queryParameters: [Parameters.skip, Parameters.take],
  urlParameters: [Parameters.$host],
  headerParameters: [Parameters.accept],
  serializer,
};
const categoryCreateOperationSpec: coreClient.OperationSpec = {
  path: "/Category/Create",
  httpMethod: "POST",
  responses: {
    200: {
      bodyMapper: Mappers.BaseResponseUseCasesCategoryCreateResponse,
    },
    400: {
      bodyMapper: Mappers.BaseResponseSystemObject,
    },
    401: {
      bodyMapper: Mappers.BaseResponseSystemObject,
    },
    403: {
      bodyMapper: Mappers.BaseResponseSystemObject,
    },
    500: {
      bodyMapper: Mappers.BaseResponseSystemObject,
    },
  },
  requestBody: Parameters.body1,
  urlParameters: [Parameters.$host],
  headerParameters: [Parameters.contentType, Parameters.accept],
  mediaType: "json",
  serializer,
};
const categoryDeleteOperationSpec: coreClient.OperationSpec = {
  path: "/Category/Delete",
  httpMethod: "DELETE",
  responses: {
    200: {
      bodyMapper: Mappers.BaseResponseUseCasesCategoryDeleteResponse,
    },
    400: {
      bodyMapper: Mappers.BaseResponseSystemObject,
    },
    401: {
      bodyMapper: Mappers.BaseResponseSystemObject,
    },
    403: {
      bodyMapper: Mappers.BaseResponseSystemObject,
    },
    500: {
      bodyMapper: Mappers.BaseResponseSystemObject,
    },
  },
  queryParameters: [Parameters.id],
  urlParameters: [Parameters.$host],
  headerParameters: [Parameters.accept],
  serializer,
};
const categoryReadAllOperationSpec: coreClient.OperationSpec = {
  path: "/Category/Read",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.BaseResponseListUseCasesCategoryReadRealAllResponse,
    },
    400: {
      bodyMapper: Mappers.BaseResponseSystemObject,
    },
    401: {
      bodyMapper: Mappers.BaseResponseSystemObject,
    },
    403: {
      bodyMapper: Mappers.BaseResponseSystemObject,
    },
    500: {
      bodyMapper: Mappers.BaseResponseSystemObject,
    },
  },
  queryParameters: [Parameters.skip, Parameters.take],
  urlParameters: [Parameters.$host],
  headerParameters: [Parameters.accept],
  serializer,
};
const logCreateOperationSpec: coreClient.OperationSpec = {
  path: "/logs/create",
  httpMethod: "POST",
  responses: {
    201: {
      bodyMapper: Mappers.BaseResponseUseCasesLogCreateResponse,
    },
    400: {
      bodyMapper: Mappers.BaseResponseSystemObject,
    },
    401: {
      bodyMapper: Mappers.BaseResponseSystemObject,
    },
    403: {
      bodyMapper: Mappers.BaseResponseSystemObject,
    },
    500: {
      bodyMapper: Mappers.BaseResponseSystemObject,
    },
  },
  requestBody: Parameters.body2,
  urlParameters: [Parameters.$host],
  headerParameters: [Parameters.contentType, Parameters.accept],
  mediaType: "json",
  serializer,
};
const logReadAllTodayOperationSpec: coreClient.OperationSpec = {
  path: "/logs/read-all-by-date",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.BaseResponseListUseCasesLogReadAllByDateResponse,
    },
    400: {
      bodyMapper: Mappers.BaseResponseSystemObject,
    },
    401: {
      bodyMapper: Mappers.BaseResponseSystemObject,
    },
    403: {
      bodyMapper: Mappers.BaseResponseSystemObject,
    },
    500: {
      bodyMapper: Mappers.BaseResponseSystemObject,
    },
  },
  queryParameters: [Parameters.dateParam],
  urlParameters: [Parameters.$host],
  headerParameters: [Parameters.accept],
  serializer,
};
const logReadByAppOperationSpec: coreClient.OperationSpec = {
  path: "/logs/read-by-app",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.BaseResponseListUseCasesLogReadByAppResponse,
    },
    400: {
      bodyMapper: Mappers.BaseResponseSystemObject,
    },
    401: {
      bodyMapper: Mappers.BaseResponseSystemObject,
    },
    403: {
      bodyMapper: Mappers.BaseResponseSystemObject,
    },
    500: {
      bodyMapper: Mappers.BaseResponseSystemObject,
    },
  },
  queryParameters: [
    Parameters.skip,
    Parameters.take,
    Parameters.appId,
    Parameters.startDate,
    Parameters.endDate,
  ],
  urlParameters: [Parameters.$host],
  headerParameters: [Parameters.accept],
  serializer,
};
const logReadByIdOperationSpec: coreClient.OperationSpec = {
  path: "/logs/read-by-id",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.BaseResponseUseCasesLogReadByIdResponse,
    },
    400: {
      bodyMapper: Mappers.BaseResponseSystemObject,
    },
    401: {
      bodyMapper: Mappers.BaseResponseSystemObject,
    },
    403: {
      bodyMapper: Mappers.BaseResponseSystemObject,
    },
    500: {
      bodyMapper: Mappers.BaseResponseSystemObject,
    },
  },
  queryParameters: [Parameters.id1],
  urlParameters: [Parameters.$host],
  headerParameters: [Parameters.accept],
  serializer,
};
const userLoginOperationSpec: coreClient.OperationSpec = {
  path: "/User/Login",
  httpMethod: "POST",
  responses: {
    200: {
      bodyMapper: Mappers.BaseResponseUseCasesUserLoginResponse,
    },
    400: {
      bodyMapper: Mappers.BaseResponseSystemObject,
    },
    401: {
      bodyMapper: Mappers.BaseResponseSystemObject,
    },
    403: {
      bodyMapper: Mappers.BaseResponseUseCasesUserLoginResponse,
    },
    500: {
      bodyMapper: Mappers.BaseResponseSystemObject,
    },
  },
  requestBody: Parameters.body3,
  urlParameters: [Parameters.$host],
  headerParameters: [Parameters.contentType, Parameters.accept],
  mediaType: "json",
  serializer,
};
const userRefreshTokenOperationSpec: coreClient.OperationSpec = {
  path: "/User/RefreshToken",
  httpMethod: "POST",
  responses: {
    200: {
      bodyMapper: Mappers.BaseResponseUseCasesUserRefreshTokenResponse,
    },
    400: {
      bodyMapper: Mappers.BaseResponseSystemObject,
    },
    401: {
      bodyMapper: Mappers.BaseResponseSystemObject,
    },
    403: {
      bodyMapper: Mappers.BaseResponseSystemObject,
    },
    500: {
      bodyMapper: Mappers.BaseResponseSystemObject,
    },
  },
  requestBody: Parameters.body4,
  urlParameters: [Parameters.$host],
  headerParameters: [Parameters.contentType, Parameters.accept],
  mediaType: "json",
  serializer,
};
const userLogoutOperationSpec: coreClient.OperationSpec = {
  path: "/User/LogoutByEmail",
  httpMethod: "POST",
  responses: {
    200: {
      bodyMapper: Mappers.BaseResponseUseCasesUserLogoutResponse,
    },
    400: {
      bodyMapper: Mappers.BaseResponseSystemObject,
    },
    401: {
      bodyMapper: Mappers.BaseResponseSystemObject,
    },
    403: {
      bodyMapper: Mappers.BaseResponseSystemObject,
    },
    500: {
      bodyMapper: Mappers.BaseResponseSystemObject,
    },
  },
  requestBody: Parameters.body5,
  urlParameters: [Parameters.$host],
  headerParameters: [Parameters.contentType, Parameters.accept],
  mediaType: "json",
  serializer,
};
