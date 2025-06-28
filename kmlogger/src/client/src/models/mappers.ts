import * as coreClient from "@azure/core-client";

export const UseCasesAppCreateRequest: coreClient.CompositeMapper = {
  type: {
    name: "Composite",
    className: "UseCasesAppCreateRequest",
    modelProperties: {
      name: {
        serializedName: "name",
        required: true,
        type: {
          name: "String",
        },
      },
      categoryId: {
        serializedName: "categoryId",
        required: true,
        type: {
          name: "Uuid",
        },
      },
      environment: {
        serializedName: "environment",
        required: true,
        type: {
          name: "Number",
        },
      },
    },
  },
};

export const BaseResponseUseCasesAppCreateResponse: coreClient.CompositeMapper =
  {
    type: {
      name: "Composite",
      className: "BaseResponseUseCasesAppCreateResponse",
      modelProperties: {
        statusCode: {
          serializedName: "statusCode",
          required: true,
          type: {
            name: "Number",
          },
        },
        message: {
          serializedName: "message",
          required: true,
          type: {
            name: "String",
          },
        },
        data: {
          serializedName: "data",
          type: {
            name: "Composite",
            className: "UseCasesAppCreateResponse",
          },
        },
        notifications: {
          serializedName: "notifications",
          required: true,
          type: {
            name: "Sequence",
            element: {
              type: {
                name: "Composite",
                className: "FluntNotificationsNotification",
              },
            },
          },
        },
      },
    },
  };

export const UseCasesAppCreateResponse: coreClient.CompositeMapper = {
  type: {
    name: "Composite",
    className: "UseCasesAppCreateResponse",
    modelProperties: {
      appId: {
        serializedName: "appId",
        required: true,
        type: {
          name: "Uuid",
        },
      },
      name: {
        serializedName: "name",
        required: true,
        type: {
          name: "String",
        },
      },
      categoryName: {
        serializedName: "categoryName",
        required: true,
        type: {
          name: "String",
        },
      },
      environment: {
        serializedName: "environment",
        required: true,
        type: {
          name: "String",
        },
      },
    },
  },
};

export const FluntNotificationsNotification: coreClient.CompositeMapper = {
  type: {
    name: "Composite",
    className: "FluntNotificationsNotification",
    modelProperties: {
      key: {
        serializedName: "key",
        required: true,
        type: {
          name: "String",
        },
      },
      message: {
        serializedName: "message",
        required: true,
        type: {
          name: "String",
        },
      },
    },
  },
};

export const BaseResponseSystemObject: coreClient.CompositeMapper = {
  type: {
    name: "Composite",
    className: "BaseResponseSystemObject",
    modelProperties: {
      statusCode: {
        serializedName: "statusCode",
        required: true,
        type: {
          name: "Number",
        },
      },
      message: {
        serializedName: "message",
        required: true,
        type: {
          name: "String",
        },
      },
      data: {
        serializedName: "data",
        required: true,
        type: {
          name: "any",
        },
      },
      notifications: {
        serializedName: "notifications",
        required: true,
        type: {
          name: "Sequence",
          element: {
            type: {
              name: "Composite",
              className: "FluntNotificationsNotification",
            },
          },
        },
      },
    },
  },
};

export const BaseResponseListUseCasesAppReadAllResponse: coreClient.CompositeMapper =
  {
    type: {
      name: "Composite",
      className: "BaseResponseListUseCasesAppReadAllResponse",
      modelProperties: {
        statusCode: {
          serializedName: "statusCode",
          required: true,
          type: {
            name: "Number",
          },
        },
        message: {
          serializedName: "message",
          required: true,
          type: {
            name: "String",
          },
        },
        data: {
          serializedName: "data",
          required: true,
          type: {
            name: "Sequence",
            element: {
              type: {
                name: "Composite",
                className: "UseCasesAppReadAllResponse",
              },
            },
          },
        },
        notifications: {
          serializedName: "notifications",
          required: true,
          type: {
            name: "Sequence",
            element: {
              type: {
                name: "Composite",
                className: "FluntNotificationsNotification",
              },
            },
          },
        },
      },
    },
  };

export const UseCasesAppReadAllResponse: coreClient.CompositeMapper = {
  type: {
    name: "Composite",
    className: "UseCasesAppReadAllResponse",
    modelProperties: {
      id: {
        serializedName: "id",
        required: true,
        type: {
          name: "Uuid",
        },
      },
      name: {
        serializedName: "name",
        nullable: true,
        type: {
          name: "String",
        },
      },
      categoryName: {
        serializedName: "categoryName",
        nullable: true,
        type: {
          name: "String",
        },
      },
      environment: {
        serializedName: "environment",
        nullable: true,
        type: {
          name: "String",
        },
      },
    },
  },
};

export const UseCasesCategoryCreateRequest: coreClient.CompositeMapper = {
  type: {
    name: "Composite",
    className: "UseCasesCategoryCreateRequest",
    modelProperties: {
      name: {
        serializedName: "name",
        required: true,
        type: {
          name: "String",
        },
      },
    },
  },
};

export const BaseResponseUseCasesCategoryCreateResponse: coreClient.CompositeMapper =
  {
    type: {
      name: "Composite",
      className: "BaseResponseUseCasesCategoryCreateResponse",
      modelProperties: {
        statusCode: {
          serializedName: "statusCode",
          required: true,
          type: {
            name: "Number",
          },
        },
        message: {
          serializedName: "message",
          required: true,
          type: {
            name: "String",
          },
        },
        data: {
          serializedName: "data",
          type: {
            name: "Composite",
            className: "UseCasesCategoryCreateResponse",
          },
        },
        notifications: {
          serializedName: "notifications",
          required: true,
          type: {
            name: "Sequence",
            element: {
              type: {
                name: "Composite",
                className: "FluntNotificationsNotification",
              },
            },
          },
        },
      },
    },
  };

export const UseCasesCategoryCreateResponse: coreClient.CompositeMapper = {
  type: {
    name: "Composite",
    className: "UseCasesCategoryCreateResponse",
    modelProperties: {
      id: {
        serializedName: "id",
        required: true,
        type: {
          name: "Uuid",
        },
      },
      name: {
        serializedName: "name",
        nullable: true,
        type: {
          name: "String",
        },
      },
    },
  },
};

export const BaseResponseUseCasesCategoryDeleteResponse: coreClient.CompositeMapper =
  {
    type: {
      name: "Composite",
      className: "BaseResponseUseCasesCategoryDeleteResponse",
      modelProperties: {
        statusCode: {
          serializedName: "statusCode",
          required: true,
          type: {
            name: "Number",
          },
        },
        message: {
          serializedName: "message",
          required: true,
          type: {
            name: "String",
          },
        },
        data: {
          serializedName: "data",
          required: true,
          type: {
            name: "Dictionary",
            value: { type: { name: "any" } },
          },
        },
        notifications: {
          serializedName: "notifications",
          required: true,
          type: {
            name: "Sequence",
            element: {
              type: {
                name: "Composite",
                className: "FluntNotificationsNotification",
              },
            },
          },
        },
      },
    },
  };

export const BaseResponseListUseCasesCategoryReadRealAllResponse: coreClient.CompositeMapper =
  {
    type: {
      name: "Composite",
      className: "BaseResponseListUseCasesCategoryReadRealAllResponse",
      modelProperties: {
        statusCode: {
          serializedName: "statusCode",
          required: true,
          type: {
            name: "Number",
          },
        },
        message: {
          serializedName: "message",
          required: true,
          type: {
            name: "String",
          },
        },
        data: {
          serializedName: "data",
          required: true,
          type: {
            name: "Sequence",
            element: {
              type: {
                name: "Composite",
                className: "UseCasesCategoryReadRealAllResponse",
              },
            },
          },
        },
        notifications: {
          serializedName: "notifications",
          required: true,
          type: {
            name: "Sequence",
            element: {
              type: {
                name: "Composite",
                className: "FluntNotificationsNotification",
              },
            },
          },
        },
      },
    },
  };

export const UseCasesCategoryReadRealAllResponse: coreClient.CompositeMapper = {
  type: {
    name: "Composite",
    className: "UseCasesCategoryReadRealAllResponse",
    modelProperties: {
      id: {
        serializedName: "id",
        required: true,
        type: {
          name: "Uuid",
        },
      },
      name: {
        serializedName: "name",
        required: true,
        type: {
          name: "String",
        },
      },
    },
  },
};

export const UseCasesLogCreateRequest: coreClient.CompositeMapper = {
  type: {
    name: "Composite",
    className: "UseCasesLogCreateRequest",
    modelProperties: {
      appId: {
        serializedName: "appId",
        required: true,
        type: {
          name: "Uuid",
        },
      },
      message: {
        serializedName: "message",
        required: true,
        type: {
          name: "String",
        },
      },
      level: {
        serializedName: "level",
        required: true,
        type: {
          name: "String",
        },
      },
      stackTrace: {
        serializedName: "stackTrace",
        nullable: true,
        type: {
          name: "String",
        },
      },
      source: {
        serializedName: "source",
        nullable: true,
        type: {
          name: "String",
        },
      },
      environment: {
        serializedName: "environment",
        required: true,
        type: {
          name: "Number",
        },
      },
    },
  },
};

export const BaseResponseUseCasesLogCreateResponse: coreClient.CompositeMapper =
  {
    type: {
      name: "Composite",
      className: "BaseResponseUseCasesLogCreateResponse",
      modelProperties: {
        statusCode: {
          serializedName: "statusCode",
          required: true,
          type: {
            name: "Number",
          },
        },
        message: {
          serializedName: "message",
          required: true,
          type: {
            name: "String",
          },
        },
        data: {
          serializedName: "data",
          type: {
            name: "Composite",
            className: "UseCasesLogCreateResponse",
          },
        },
        notifications: {
          serializedName: "notifications",
          required: true,
          type: {
            name: "Sequence",
            element: {
              type: {
                name: "Composite",
                className: "FluntNotificationsNotification",
              },
            },
          },
        },
      },
    },
  };

export const UseCasesLogCreateResponse: coreClient.CompositeMapper = {
  type: {
    name: "Composite",
    className: "UseCasesLogCreateResponse",
    modelProperties: {
      id: {
        serializedName: "id",
        required: true,
        type: {
          name: "Uuid",
        },
      },
    },
  },
};

export const BaseResponseListUseCasesLogReadAllByDateResponse: coreClient.CompositeMapper =
  {
    type: {
      name: "Composite",
      className: "BaseResponseListUseCasesLogReadAllByDateResponse",
      modelProperties: {
        statusCode: {
          serializedName: "statusCode",
          required: true,
          type: {
            name: "Number",
          },
        },
        message: {
          serializedName: "message",
          required: true,
          type: {
            name: "String",
          },
        },
        data: {
          serializedName: "data",
          required: true,
          type: {
            name: "Sequence",
            element: {
              type: {
                name: "Composite",
                className: "UseCasesLogReadAllByDateResponse",
              },
            },
          },
        },
        notifications: {
          serializedName: "notifications",
          required: true,
          type: {
            name: "Sequence",
            element: {
              type: {
                name: "Composite",
                className: "FluntNotificationsNotification",
              },
            },
          },
        },
      },
    },
  };

export const UseCasesLogReadAllByDateResponse: coreClient.CompositeMapper = {
  type: {
    name: "Composite",
    className: "UseCasesLogReadAllByDateResponse",
    modelProperties: {
      id: {
        serializedName: "id",
        required: true,
        type: {
          name: "Uuid",
        },
      },
      appId: {
        serializedName: "appId",
        required: true,
        type: {
          name: "Uuid",
        },
      },
      message: {
        serializedName: "message",
        required: true,
        type: {
          name: "String",
        },
      },
      level: {
        serializedName: "level",
        required: true,
        type: {
          name: "String",
        },
      },
      createdDate: {
        serializedName: "createdDate",
        required: true,
        type: {
          name: "DateTime",
        },
      },
    },
  },
};

export const BaseResponseListUseCasesLogReadByAppResponse: coreClient.CompositeMapper =
  {
    type: {
      name: "Composite",
      className: "BaseResponseListUseCasesLogReadByAppResponse",
      modelProperties: {
        statusCode: {
          serializedName: "statusCode",
          required: true,
          type: {
            name: "Number",
          },
        },
        message: {
          serializedName: "message",
          required: true,
          type: {
            name: "String",
          },
        },
        data: {
          serializedName: "data",
          required: true,
          type: {
            name: "Sequence",
            element: {
              type: {
                name: "Composite",
                className: "UseCasesLogReadByAppResponse",
              },
            },
          },
        },
        notifications: {
          serializedName: "notifications",
          required: true,
          type: {
            name: "Sequence",
            element: {
              type: {
                name: "Composite",
                className: "FluntNotificationsNotification",
              },
            },
          },
        },
      },
    },
  };

export const UseCasesLogReadByAppResponse: coreClient.CompositeMapper = {
  type: {
    name: "Composite",
    className: "UseCasesLogReadByAppResponse",
    modelProperties: {
      id: {
        serializedName: "id",
        required: true,
        type: {
          name: "Uuid",
        },
      },
      appId: {
        serializedName: "appId",
        required: true,
        type: {
          name: "Uuid",
        },
      },
      message: {
        serializedName: "message",
        required: true,
        type: {
          name: "String",
        },
      },
      level: {
        serializedName: "level",
        required: true,
        type: {
          name: "String",
        },
      },
      createdDate: {
        serializedName: "createdDate",
        required: true,
        type: {
          name: "DateTime",
        },
      },
    },
  },
};

export const BaseResponseUseCasesLogReadByIdResponse: coreClient.CompositeMapper =
  {
    type: {
      name: "Composite",
      className: "BaseResponseUseCasesLogReadByIdResponse",
      modelProperties: {
        statusCode: {
          serializedName: "statusCode",
          required: true,
          type: {
            name: "Number",
          },
        },
        message: {
          serializedName: "message",
          required: true,
          type: {
            name: "String",
          },
        },
        data: {
          serializedName: "data",
          type: {
            name: "Composite",
            className: "UseCasesLogReadByIdResponse",
          },
        },
        notifications: {
          serializedName: "notifications",
          required: true,
          type: {
            name: "Sequence",
            element: {
              type: {
                name: "Composite",
                className: "FluntNotificationsNotification",
              },
            },
          },
        },
      },
    },
  };

export const UseCasesLogReadByIdResponse: coreClient.CompositeMapper = {
  type: {
    name: "Composite",
    className: "UseCasesLogReadByIdResponse",
    modelProperties: {
      id: {
        serializedName: "id",
        required: true,
        type: {
          name: "Uuid",
        },
      },
      appId: {
        serializedName: "appId",
        required: true,
        type: {
          name: "Uuid",
        },
      },
      message: {
        serializedName: "message",
        required: true,
        type: {
          name: "String",
        },
      },
      level: {
        serializedName: "level",
        required: true,
        type: {
          name: "String",
        },
      },
      createdDate: {
        serializedName: "createdDate",
        required: true,
        type: {
          name: "DateTime",
        },
      },
    },
  },
};

export const UseCasesUserLoginRequest: coreClient.CompositeMapper = {
  type: {
    name: "Composite",
    className: "UseCasesUserLoginRequest",
    modelProperties: {
      email: {
        serializedName: "email",
        required: true,
        type: {
          name: "String",
        },
      },
      password: {
        serializedName: "password",
        required: true,
        type: {
          name: "String",
        },
      },
    },
  },
};

export const BaseResponseUseCasesUserLoginResponse: coreClient.CompositeMapper =
  {
    type: {
      name: "Composite",
      className: "BaseResponseUseCasesUserLoginResponse",
      modelProperties: {
        statusCode: {
          serializedName: "statusCode",
          required: true,
          type: {
            name: "Number",
          },
        },
        message: {
          serializedName: "message",
          required: true,
          type: {
            name: "String",
          },
        },
        data: {
          serializedName: "data",
          type: {
            name: "Composite",
            className: "UseCasesUserLoginResponse",
          },
        },
        notifications: {
          serializedName: "notifications",
          required: true,
          type: {
            name: "Sequence",
            element: {
              type: {
                name: "Composite",
                className: "FluntNotificationsNotification",
              },
            },
          },
        },
      },
    },
  };

export const UseCasesUserLoginResponse: coreClient.CompositeMapper = {
  type: {
    name: "Composite",
    className: "UseCasesUserLoginResponse",
    modelProperties: {
      token: {
        serializedName: "token",
        required: true,
        type: {
          name: "String",
        },
      },
      refreshToken: {
        serializedName: "refreshToken",
        required: true,
        type: {
          name: "String",
        },
      },
      tokenExpiry: {
        serializedName: "tokenExpiry",
        required: true,
        type: {
          name: "DateTime",
        },
      },
      refreshTokenExpiry: {
        serializedName: "refreshTokenExpiry",
        required: true,
        type: {
          name: "DateTime",
        },
      },
      user: {
        serializedName: "user",
        type: {
          name: "Composite",
          className: "UseCasesUserLoginUserInfo",
        },
      },
    },
  },
};

export const UseCasesUserLoginUserInfo: coreClient.CompositeMapper = {
  type: {
    name: "Composite",
    className: "UseCasesUserLoginUserInfo",
    modelProperties: {
      id: {
        serializedName: "id",
        required: true,
        type: {
          name: "Uuid",
        },
      },
      name: {
        serializedName: "name",
        required: true,
        type: {
          name: "String",
        },
      },
      email: {
        serializedName: "email",
        required: true,
        type: {
          name: "String",
        },
      },
    },
  },
};

export const UseCasesUserRefreshTokenRequest: coreClient.CompositeMapper = {
  type: {
    name: "Composite",
    className: "UseCasesUserRefreshTokenRequest",
    modelProperties: {
      accessToken: {
        serializedName: "accessToken",
        required: true,
        type: {
          name: "String",
        },
      },
      refreshToken: {
        serializedName: "refreshToken",
        required: true,
        type: {
          name: "String",
        },
      },
    },
  },
};

export const BaseResponseUseCasesUserRefreshTokenResponse: coreClient.CompositeMapper =
  {
    type: {
      name: "Composite",
      className: "BaseResponseUseCasesUserRefreshTokenResponse",
      modelProperties: {
        statusCode: {
          serializedName: "statusCode",
          required: true,
          type: {
            name: "Number",
          },
        },
        message: {
          serializedName: "message",
          required: true,
          type: {
            name: "String",
          },
        },
        data: {
          serializedName: "data",
          type: {
            name: "Composite",
            className: "UseCasesUserRefreshTokenResponse",
          },
        },
        notifications: {
          serializedName: "notifications",
          required: true,
          type: {
            name: "Sequence",
            element: {
              type: {
                name: "Composite",
                className: "FluntNotificationsNotification",
              },
            },
          },
        },
      },
    },
  };

export const UseCasesUserRefreshTokenResponse: coreClient.CompositeMapper = {
  type: {
    name: "Composite",
    className: "UseCasesUserRefreshTokenResponse",
    modelProperties: {
      token: {
        serializedName: "token",
        required: true,
        type: {
          name: "String",
        },
      },
      refreshToken: {
        serializedName: "refreshToken",
        required: true,
        type: {
          name: "String",
        },
      },
      tokenExpiry: {
        serializedName: "tokenExpiry",
        required: true,
        type: {
          name: "DateTime",
        },
      },
      refreshTokenExpiry: {
        serializedName: "refreshTokenExpiry",
        required: true,
        type: {
          name: "DateTime",
        },
      },
      user: {
        serializedName: "user",
        type: {
          name: "Composite",
          className: "UseCasesUserLoginUserInfo",
        },
      },
    },
  },
};

export const BaseResponseUseCasesUserLogoutResponse: coreClient.CompositeMapper =
  {
    type: {
      name: "Composite",
      className: "BaseResponseUseCasesUserLogoutResponse",
      modelProperties: {
        statusCode: {
          serializedName: "statusCode",
          required: true,
          type: {
            name: "Number",
          },
        },
        message: {
          serializedName: "message",
          required: true,
          type: {
            name: "String",
          },
        },
        data: {
          serializedName: "data",
          type: {
            name: "Composite",
            className: "UseCasesUserLogoutResponse",
          },
        },
        notifications: {
          serializedName: "notifications",
          required: true,
          type: {
            name: "Sequence",
            element: {
              type: {
                name: "Composite",
                className: "FluntNotificationsNotification",
              },
            },
          },
        },
      },
    },
  };

export const UseCasesUserLogoutResponse: coreClient.CompositeMapper = {
  type: {
    name: "Composite",
    className: "UseCasesUserLogoutResponse",
    modelProperties: {
      message: {
        serializedName: "message",
        required: true,
        type: {
          name: "String",
        },
      },
      logoutTime: {
        serializedName: "logoutTime",
        required: true,
        type: {
          name: "DateTime",
        },
      },
    },
  },
};

export const UseCasesUserRegisterRequest: coreClient.CompositeMapper = {
  type: {
    name: "Composite",
    className: "UseCasesUserRegisterRequest",
    modelProperties: {
      fullName: {
        serializedName: "fullName",
        type: {
          name: "Composite",
          className: "DomainValueObjectsFullName",
        },
      },
      email: {
        serializedName: "email",
        required: true,
        type: {
          name: "String",
        },
      },
      rolesId: {
        serializedName: "rolesId",
        required: true,
        type: {
          name: "Sequence",
          element: {
            type: {
              name: "Uuid",
            },
          },
        },
      },
    },
  },
};

export const DomainValueObjectsFullName: coreClient.CompositeMapper = {
  type: {
    name: "Composite",
    className: "DomainValueObjectsFullName",
    modelProperties: {
      notifications: {
        serializedName: "notifications",
        required: true,
        readOnly: true,
        type: {
          name: "Sequence",
          element: {
            type: {
              name: "Composite",
              className: "FluntNotificationsNotification",
            },
          },
        },
      },
      isValid: {
        serializedName: "isValid",
        required: true,
        readOnly: true,
        type: {
          name: "Boolean",
        },
      },
      firstName: {
        serializedName: "firstName",
        required: true,
        type: {
          name: "String",
        },
      },
      lastName: {
        serializedName: "lastName",
        required: true,
        type: {
          name: "String",
        },
      },
    },
  },
};

export const BaseResponseUseCasesUserRegisterResponse: coreClient.CompositeMapper =
  {
    type: {
      name: "Composite",
      className: "BaseResponseUseCasesUserRegisterResponse",
      modelProperties: {
        statusCode: {
          serializedName: "statusCode",
          required: true,
          type: {
            name: "Number",
          },
        },
        message: {
          serializedName: "message",
          required: true,
          type: {
            name: "String",
          },
        },
        data: {
          serializedName: "data",
          required: true,
          type: {
            name: "Dictionary",
            value: { type: { name: "any" } },
          },
        },
        notifications: {
          serializedName: "notifications",
          required: true,
          type: {
            name: "Sequence",
            element: {
              type: {
                name: "Composite",
                className: "FluntNotificationsNotification",
              },
            },
          },
        },
      },
    },
  };

export const BaseResponseListDomainRecordsDtosUserDto: coreClient.CompositeMapper =
  {
    type: {
      name: "Composite",
      className: "BaseResponseListDomainRecordsDtosUserDto",
      modelProperties: {
        statusCode: {
          serializedName: "statusCode",
          required: true,
          type: {
            name: "Number",
          },
        },
        message: {
          serializedName: "message",
          required: true,
          type: {
            name: "String",
          },
        },
        data: {
          serializedName: "data",
          required: true,
          type: {
            name: "Sequence",
            element: {
              type: {
                name: "Composite",
                className: "DomainRecordsDtosUserDto",
              },
            },
          },
        },
        notifications: {
          serializedName: "notifications",
          required: true,
          type: {
            name: "Sequence",
            element: {
              type: {
                name: "Composite",
                className: "FluntNotificationsNotification",
              },
            },
          },
        },
      },
    },
  };

export const DomainRecordsDtosUserDto: coreClient.CompositeMapper = {
  type: {
    name: "Composite",
    className: "DomainRecordsDtosUserDto",
    modelProperties: {
      id: {
        serializedName: "id",
        required: true,
        type: {
          name: "String",
        },
      },
      name: {
        serializedName: "name",
        required: true,
        type: {
          name: "String",
        },
      },
      email: {
        serializedName: "email",
        required: true,
        type: {
          name: "String",
        },
      },
      createdAt: {
        serializedName: "createdAt",
        required: true,
        type: {
          name: "DateTime",
        },
      },
      roles: {
        serializedName: "roles",
        required: true,
        type: {
          name: "Sequence",
          element: {
            type: {
              name: "Composite",
              className: "DomainRecordsDtosRoleDto",
            },
          },
        },
      },
      active: {
        serializedName: "active",
        required: true,
        type: {
          name: "Boolean",
        },
      },
    },
  },
};

export const DomainRecordsDtosRoleDto: coreClient.CompositeMapper = {
  type: {
    name: "Composite",
    className: "DomainRecordsDtosRoleDto",
    modelProperties: {
      id: {
        serializedName: "id",
        required: true,
        type: {
          name: "String",
        },
      },
      name: {
        serializedName: "name",
        required: true,
        type: {
          name: "String",
        },
      },
      slug: {
        serializedName: "slug",
        required: true,
        type: {
          name: "String",
        },
      },
    },
  },
};

export const UseCasesUserCompleteRegistrationRequest: coreClient.CompositeMapper =
  {
    type: {
      name: "Composite",
      className: "UseCasesUserCompleteRegistrationRequest",
      modelProperties: {
        id: {
          serializedName: "id",
          required: true,
          type: {
            name: "Uuid",
          },
        },
        token: {
          serializedName: "token",
          required: true,
          type: {
            name: "Uuid",
          },
        },
        password: {
          serializedName: "password",
          required: true,
          type: {
            name: "String",
          },
        },
      },
    },
  };
