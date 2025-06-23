import * as coreClient from "@azure/core-client";

export const UseCasesAppCreateRequest: coreClient.CompositeMapper = {
  type: {
    name: "Composite",
    className: "UseCasesAppCreateRequest",
    modelProperties: {
      name: {
        serializedName: "name",
        nullable: true,
        type: {
          name: "String",
        },
      },
      categoryId: {
        serializedName: "categoryId",
        type: {
          name: "Uuid",
        },
      },
      environment: {
        serializedName: "environment",
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
          type: {
            name: "Number",
          },
        },
        message: {
          serializedName: "message",
          nullable: true,
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
          nullable: true,
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

export const FluntNotificationsNotification: coreClient.CompositeMapper = {
  type: {
    name: "Composite",
    className: "FluntNotificationsNotification",
    modelProperties: {
      key: {
        serializedName: "key",
        nullable: true,
        type: {
          name: "String",
        },
      },
      message: {
        serializedName: "message",
        nullable: true,
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
        type: {
          name: "Number",
        },
      },
      message: {
        serializedName: "message",
        nullable: true,
        type: {
          name: "String",
        },
      },
      data: {
        serializedName: "data",
        nullable: true,
        type: {
          name: "any",
        },
      },
      notifications: {
        serializedName: "notifications",
        nullable: true,
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
          type: {
            name: "Number",
          },
        },
        message: {
          serializedName: "message",
          nullable: true,
          type: {
            name: "String",
          },
        },
        data: {
          serializedName: "data",
          nullable: true,
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
          nullable: true,
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
        nullable: true,
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
          type: {
            name: "Number",
          },
        },
        message: {
          serializedName: "message",
          nullable: true,
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
          nullable: true,
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
          type: {
            name: "Number",
          },
        },
        message: {
          serializedName: "message",
          nullable: true,
          type: {
            name: "String",
          },
        },
        data: {
          serializedName: "data",
          type: {
            name: "Dictionary",
            value: { type: { name: "any" } },
          },
        },
        notifications: {
          serializedName: "notifications",
          nullable: true,
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
          type: {
            name: "Number",
          },
        },
        message: {
          serializedName: "message",
          nullable: true,
          type: {
            name: "String",
          },
        },
        data: {
          serializedName: "data",
          nullable: true,
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
          nullable: true,
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

export const UseCasesLogCreateRequest: coreClient.CompositeMapper = {
  type: {
    name: "Composite",
    className: "UseCasesLogCreateRequest",
    modelProperties: {
      appId: {
        serializedName: "appId",
        type: {
          name: "Uuid",
        },
      },
      message: {
        serializedName: "message",
        nullable: true,
        type: {
          name: "String",
        },
      },
      level: {
        serializedName: "level",
        nullable: true,
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
          type: {
            name: "Number",
          },
        },
        message: {
          serializedName: "message",
          nullable: true,
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
          nullable: true,
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
          type: {
            name: "Number",
          },
        },
        message: {
          serializedName: "message",
          nullable: true,
          type: {
            name: "String",
          },
        },
        data: {
          serializedName: "data",
          nullable: true,
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
          nullable: true,
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
        type: {
          name: "Uuid",
        },
      },
      appId: {
        serializedName: "appId",
        type: {
          name: "Uuid",
        },
      },
      message: {
        serializedName: "message",
        nullable: true,
        type: {
          name: "String",
        },
      },
      level: {
        serializedName: "level",
        nullable: true,
        type: {
          name: "String",
        },
      },
      createdDate: {
        serializedName: "createdDate",
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
          type: {
            name: "Number",
          },
        },
        message: {
          serializedName: "message",
          nullable: true,
          type: {
            name: "String",
          },
        },
        data: {
          serializedName: "data",
          nullable: true,
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
          nullable: true,
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
        type: {
          name: "Uuid",
        },
      },
      appId: {
        serializedName: "appId",
        type: {
          name: "Uuid",
        },
      },
      message: {
        serializedName: "message",
        nullable: true,
        type: {
          name: "String",
        },
      },
      level: {
        serializedName: "level",
        nullable: true,
        type: {
          name: "String",
        },
      },
      createdDate: {
        serializedName: "createdDate",
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
          type: {
            name: "Number",
          },
        },
        message: {
          serializedName: "message",
          nullable: true,
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
          nullable: true,
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
        type: {
          name: "Uuid",
        },
      },
      appId: {
        serializedName: "appId",
        type: {
          name: "Uuid",
        },
      },
      message: {
        serializedName: "message",
        nullable: true,
        type: {
          name: "String",
        },
      },
      level: {
        serializedName: "level",
        nullable: true,
        type: {
          name: "String",
        },
      },
      createdDate: {
        serializedName: "createdDate",
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
        nullable: true,
        type: {
          name: "String",
        },
      },
      password: {
        serializedName: "password",
        nullable: true,
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
          type: {
            name: "Number",
          },
        },
        message: {
          serializedName: "message",
          nullable: true,
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
          nullable: true,
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
        nullable: true,
        type: {
          name: "String",
        },
      },
      refreshToken: {
        serializedName: "refreshToken",
        nullable: true,
        type: {
          name: "String",
        },
      },
      tokenExpiry: {
        serializedName: "tokenExpiry",
        type: {
          name: "DateTime",
        },
      },
      refreshTokenExpiry: {
        serializedName: "refreshTokenExpiry",
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
      email: {
        serializedName: "email",
        nullable: true,
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
        nullable: true,
        type: {
          name: "String",
        },
      },
      refreshToken: {
        serializedName: "refreshToken",
        nullable: true,
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
          type: {
            name: "Number",
          },
        },
        message: {
          serializedName: "message",
          nullable: true,
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
          nullable: true,
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
        nullable: true,
        type: {
          name: "String",
        },
      },
      refreshToken: {
        serializedName: "refreshToken",
        nullable: true,
        type: {
          name: "String",
        },
      },
      tokenExpiry: {
        serializedName: "tokenExpiry",
        type: {
          name: "DateTime",
        },
      },
      refreshTokenExpiry: {
        serializedName: "refreshTokenExpiry",
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
          type: {
            name: "Number",
          },
        },
        message: {
          serializedName: "message",
          nullable: true,
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
          nullable: true,
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
        nullable: true,
        type: {
          name: "String",
        },
      },
      logoutTime: {
        serializedName: "logoutTime",
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
        nullable: true,
        type: {
          name: "String",
        },
      },
      rolesId: {
        serializedName: "rolesId",
        nullable: true,
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
        readOnly: true,
        nullable: true,
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
        readOnly: true,
        type: {
          name: "Boolean",
        },
      },
      firstName: {
        serializedName: "firstName",
        nullable: true,
        type: {
          name: "String",
        },
      },
      lastName: {
        serializedName: "lastName",
        nullable: true,
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
          type: {
            name: "Number",
          },
        },
        message: {
          serializedName: "message",
          nullable: true,
          type: {
            name: "String",
          },
        },
        data: {
          serializedName: "data",
          type: {
            name: "Dictionary",
            value: { type: { name: "any" } },
          },
        },
        notifications: {
          serializedName: "notifications",
          nullable: true,
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
          type: {
            name: "Number",
          },
        },
        message: {
          serializedName: "message",
          nullable: true,
          type: {
            name: "String",
          },
        },
        data: {
          serializedName: "data",
          nullable: true,
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
          nullable: true,
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
        nullable: true,
        type: {
          name: "String",
        },
      },
      name: {
        serializedName: "name",
        nullable: true,
        type: {
          name: "String",
        },
      },
      email: {
        serializedName: "email",
        nullable: true,
        type: {
          name: "String",
        },
      },
      roles: {
        serializedName: "roles",
        nullable: true,
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
        nullable: true,
        type: {
          name: "String",
        },
      },
      name: {
        serializedName: "name",
        nullable: true,
        type: {
          name: "String",
        },
      },
      slug: {
        serializedName: "slug",
        nullable: true,
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
          type: {
            name: "Uuid",
          },
        },
        token: {
          serializedName: "token",
          type: {
            name: "Uuid",
          },
        },
        password: {
          serializedName: "password",
          nullable: true,
          type: {
            name: "String",
          },
        },
      },
    },
  };
