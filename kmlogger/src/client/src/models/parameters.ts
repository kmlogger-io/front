import {
  OperationParameter,
  OperationURLParameter,
  OperationQueryParameter,
} from "@azure/core-client";
import {
  UseCasesAppCreateRequest as UseCasesAppCreateRequestMapper,
  UseCasesCategoryCreateRequest as UseCasesCategoryCreateRequestMapper,
  UseCasesLogCreateRequest as UseCasesLogCreateRequestMapper,
  UseCasesUserLoginRequest as UseCasesUserLoginRequestMapper,
  UseCasesUserRefreshTokenRequest as UseCasesUserRefreshTokenRequestMapper,
  UseCasesUserRegisterRequest as UseCasesUserRegisterRequestMapper,
  UseCasesUserUpdateRequest as UseCasesUserUpdateRequestMapper,
  UseCasesUserCompleteRegistrationRequest as UseCasesUserCompleteRegistrationRequestMapper,
} from "../models/mappers.js";

export const contentType: OperationParameter = {
  parameterPath: ["options", "contentType"],
  mapper: {
    defaultValue: "application/json-patch+json",
    isConstant: true,
    serializedName: "Content-Type",
    type: {
      name: "String",
    },
  },
};

export const body: OperationParameter = {
  parameterPath: ["options", "body"],
  mapper: UseCasesAppCreateRequestMapper,
};

export const accept: OperationParameter = {
  parameterPath: "accept",
  mapper: {
    defaultValue: "application/json",
    isConstant: true,
    serializedName: "Accept",
    type: {
      name: "String",
    },
  },
};

export const $host: OperationURLParameter = {
  parameterPath: "$host",
  mapper: {
    serializedName: "$host",
    required: true,
    type: {
      name: "String",
    },
  },
  skipEncoding: true,
};

export const skip: OperationQueryParameter = {
  parameterPath: ["options", "skip"],
  mapper: {
    serializedName: "skip",
    type: {
      name: "Number",
    },
  },
};

export const take: OperationQueryParameter = {
  parameterPath: ["options", "take"],
  mapper: {
    serializedName: "take",
    type: {
      name: "Number",
    },
  },
};

export const body1: OperationParameter = {
  parameterPath: ["options", "body"],
  mapper: UseCasesCategoryCreateRequestMapper,
};

export const id: OperationQueryParameter = {
  parameterPath: ["options", "id"],
  mapper: {
    serializedName: "id",
    type: {
      name: "Uuid",
    },
  },
};

export const body2: OperationParameter = {
  parameterPath: ["options", "body"],
  mapper: UseCasesLogCreateRequestMapper,
};

export const dateParam: OperationQueryParameter = {
  parameterPath: ["options", "date"],
  mapper: {
    serializedName: "Date",
    type: {
      name: "DateTime",
    },
  },
};

export const appId: OperationQueryParameter = {
  parameterPath: ["options", "appId"],
  mapper: {
    serializedName: "AppId",
    type: {
      name: "Uuid",
    },
  },
};

export const startDate: OperationQueryParameter = {
  parameterPath: ["options", "startDate"],
  mapper: {
    serializedName: "StartDate",
    type: {
      name: "DateTime",
    },
  },
};

export const endDate: OperationQueryParameter = {
  parameterPath: ["options", "endDate"],
  mapper: {
    serializedName: "EndDate",
    type: {
      name: "DateTime",
    },
  },
};

export const id1: OperationQueryParameter = {
  parameterPath: ["options", "id"],
  mapper: {
    serializedName: "Id",
    type: {
      name: "Uuid",
    },
  },
};

export const page: OperationQueryParameter = {
  parameterPath: ["options", "page"],
  mapper: {
    serializedName: "Page",
    type: {
      name: "Number",
    },
  },
};

export const pageSize: OperationQueryParameter = {
  parameterPath: ["options", "pageSize"],
  mapper: {
    serializedName: "PageSize",
    type: {
      name: "Number",
    },
  },
};

export const search: OperationQueryParameter = {
  parameterPath: ["options", "search"],
  mapper: {
    serializedName: "Search",
    type: {
      name: "String",
    },
  },
};

export const sortBy: OperationQueryParameter = {
  parameterPath: ["options", "sortBy"],
  mapper: {
    serializedName: "SortBy",
    type: {
      name: "String",
    },
  },
};

export const sortOrder: OperationQueryParameter = {
  parameterPath: ["options", "sortOrder"],
  mapper: {
    serializedName: "SortOrder",
    type: {
      name: "String",
    },
  },
};

export const body3: OperationParameter = {
  parameterPath: ["options", "body"],
  mapper: UseCasesUserLoginRequestMapper,
};

export const body4: OperationParameter = {
  parameterPath: ["options", "body"],
  mapper: UseCasesUserRefreshTokenRequestMapper,
};

export const body5: OperationParameter = {
  parameterPath: ["options", "body"],
  mapper: UseCasesUserRegisterRequestMapper,
};

export const body6: OperationParameter = {
  parameterPath: ["options", "body"],
  mapper: UseCasesUserUpdateRequestMapper,
};

export const body7: OperationParameter = {
  parameterPath: ["options", "body"],
  mapper: UseCasesUserCompleteRegistrationRequestMapper,
};

export const email: OperationQueryParameter = {
  parameterPath: ["options", "email"],
  mapper: {
    serializedName: "email",
    type: {
      name: "String",
    },
  },
};

export const token: OperationQueryParameter = {
  parameterPath: ["options", "token"],
  mapper: {
    serializedName: "token",
    type: {
      name: "Uuid",
    },
  },
};

export const password: OperationQueryParameter = {
  parameterPath: ["options", "password"],
  mapper: {
    serializedName: "password",
    type: {
      name: "String",
    },
  },
};
