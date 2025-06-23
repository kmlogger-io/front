import * as coreClient from "@azure/core-client";

export interface UseCasesAppCreateRequest {
  name?: string;
  categoryId?: string;
  environment?: DomainEnumsEnvironment;
}

export interface BaseResponseUseCasesAppCreateResponse {
  statusCode?: number;
  message?: string;
  data?: UseCasesAppCreateResponse;
  notifications?: FluntNotificationsNotification[];
}

export interface UseCasesAppCreateResponse {
  appId?: string;
  name?: string;
  categoryName?: string;
  environment?: string;
}

export interface FluntNotificationsNotification {
  key?: string;
  message?: string;
}

export interface BaseResponseSystemObject {
  statusCode?: number;
  message?: string;
  /** Anything */
  data?: any;
  notifications?: FluntNotificationsNotification[];
}

export interface BaseResponseListUseCasesAppReadAllResponse {
  statusCode?: number;
  message?: string;
  data?: UseCasesAppReadAllResponse[];
  notifications?: FluntNotificationsNotification[];
}

export interface UseCasesAppReadAllResponse {
  id?: string;
  name?: string;
  categoryName?: string;
  environment?: string;
}

export interface UseCasesCategoryCreateRequest {
  name?: string;
}

export interface BaseResponseUseCasesCategoryCreateResponse {
  statusCode?: number;
  message?: string;
  data?: UseCasesCategoryCreateResponse;
  notifications?: FluntNotificationsNotification[];
}

export interface UseCasesCategoryCreateResponse {
  id?: string;
  name?: string;
}

export interface BaseResponseUseCasesCategoryDeleteResponse {
  statusCode?: number;
  message?: string;
  /** Any object */
  data?: Record<string, unknown>;
  notifications?: FluntNotificationsNotification[];
}

export interface BaseResponseListUseCasesCategoryReadRealAllResponse {
  statusCode?: number;
  message?: string;
  data?: UseCasesCategoryReadRealAllResponse[];
  notifications?: FluntNotificationsNotification[];
}

export interface UseCasesCategoryReadRealAllResponse {
  id?: string;
  name?: string;
}

export interface UseCasesLogCreateRequest {
  appId?: string;
  message?: string;
  level?: string;
  stackTrace?: string;
  source?: string;
  environment?: DomainEnumsEnvironment;
}

export interface BaseResponseUseCasesLogCreateResponse {
  statusCode?: number;
  message?: string;
  data?: UseCasesLogCreateResponse;
  notifications?: FluntNotificationsNotification[];
}

export interface UseCasesLogCreateResponse {
  id?: string;
}

export interface BaseResponseListUseCasesLogReadAllByDateResponse {
  statusCode?: number;
  message?: string;
  data?: UseCasesLogReadAllByDateResponse[];
  notifications?: FluntNotificationsNotification[];
}

export interface UseCasesLogReadAllByDateResponse {
  id?: string;
  appId?: string;
  message?: string;
  level?: string;
  createdDate?: Date;
}

export interface BaseResponseListUseCasesLogReadByAppResponse {
  statusCode?: number;
  message?: string;
  data?: UseCasesLogReadByAppResponse[];
  notifications?: FluntNotificationsNotification[];
}

export interface UseCasesLogReadByAppResponse {
  id?: string;
  appId?: string;
  message?: string;
  level?: string;
  createdDate?: Date;
}

export interface BaseResponseUseCasesLogReadByIdResponse {
  statusCode?: number;
  message?: string;
  data?: UseCasesLogReadByIdResponse;
  notifications?: FluntNotificationsNotification[];
}

export interface UseCasesLogReadByIdResponse {
  id?: string;
  appId?: string;
  message?: string;
  level?: string;
  createdDate?: Date;
}

export interface UseCasesUserLoginRequest {
  email?: string;
  password?: string;
}

export interface BaseResponseUseCasesUserLoginResponse {
  statusCode?: number;
  message?: string;
  data?: UseCasesUserLoginResponse;
  notifications?: FluntNotificationsNotification[];
}

export interface UseCasesUserLoginResponse {
  token?: string;
  refreshToken?: string;
  tokenExpiry?: Date;
  refreshTokenExpiry?: Date;
  user?: UseCasesUserLoginUserInfo;
}

export interface UseCasesUserLoginUserInfo {
  id?: string;
  name?: string;
  email?: string;
}

export interface UseCasesUserRefreshTokenRequest {
  accessToken?: string;
  refreshToken?: string;
}

export interface BaseResponseUseCasesUserRefreshTokenResponse {
  statusCode?: number;
  message?: string;
  data?: UseCasesUserRefreshTokenResponse;
  notifications?: FluntNotificationsNotification[];
}

export interface UseCasesUserRefreshTokenResponse {
  token?: string;
  refreshToken?: string;
  tokenExpiry?: Date;
  refreshTokenExpiry?: Date;
  user?: UseCasesUserLoginUserInfo;
}

export interface BaseResponseUseCasesUserLogoutResponse {
  statusCode?: number;
  message?: string;
  data?: UseCasesUserLogoutResponse;
  notifications?: FluntNotificationsNotification[];
}

export interface UseCasesUserLogoutResponse {
  message?: string;
  logoutTime?: Date;
}

export interface UseCasesUserRegisterRequest {
  fullName?: DomainValueObjectsFullName;
  email?: string;
  rolesId?: string[];
}

export interface DomainValueObjectsFullName {
  /** NOTE: This property will not be serialized. It can only be populated by the server. */
  readonly notifications?: FluntNotificationsNotification[];
  /** NOTE: This property will not be serialized. It can only be populated by the server. */
  readonly isValid?: boolean;
  firstName?: string;
  lastName?: string;
}

export interface BaseResponseUseCasesUserRegisterResponse {
  statusCode?: number;
  message?: string;
  /** Any object */
  data?: Record<string, unknown>;
  notifications?: FluntNotificationsNotification[];
}

export interface BaseResponseListDomainRecordsDtosUserDto {
  statusCode?: number;
  message?: string;
  data?: DomainRecordsDtosUserDto[];
  notifications?: FluntNotificationsNotification[];
}

export interface DomainRecordsDtosUserDto {
  id?: string;
  name?: string;
  email?: string;
  roles?: DomainRecordsDtosRoleDto[];
  active?: boolean;
}

export interface DomainRecordsDtosRoleDto {
  id?: string;
  name?: string;
  slug?: string;
}

export interface UseCasesUserCompleteRegistrationRequest {
  id?: string;
  token?: string;
  password?: string;
}

/** Known values of {@link DomainEnumsEnvironment} that the service accepts. */
export enum KnownDomainEnumsEnvironment {
  /** Zero */
  Zero = 0,
  /** One */
  One = 1,
  /** Two */
  Two = 2,
}

/**
 * Defines values for DomainEnumsEnvironment. \
 * {@link KnownDomainEnumsEnvironment} can be used interchangeably with DomainEnumsEnvironment,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **0** \
 * **1** \
 * **2**
 */
export type DomainEnumsEnvironment = number;

/** Optional parameters. */
export interface AppCreateOptionalParams extends coreClient.OperationOptions {
  body?: UseCasesAppCreateRequest;
}

/** Contains response data for the appCreate operation. */
export type AppCreateResponse = BaseResponseUseCasesAppCreateResponse;

/** Optional parameters. */
export interface AppReadAllOptionalParams extends coreClient.OperationOptions {
  skip?: number;
  take?: number;
}

/** Contains response data for the appReadAll operation. */
export type AppReadAllResponse = BaseResponseListUseCasesAppReadAllResponse;

/** Optional parameters. */
export interface CategoryCreateOptionalParams
  extends coreClient.OperationOptions {
  body?: UseCasesCategoryCreateRequest;
}

/** Contains response data for the categoryCreate operation. */
export type CategoryCreateResponse = BaseResponseUseCasesCategoryCreateResponse;

/** Optional parameters. */
export interface CategoryDeleteOptionalParams
  extends coreClient.OperationOptions {
  id?: string;
}

/** Contains response data for the categoryDelete operation. */
export type CategoryDeleteResponse = BaseResponseUseCasesCategoryDeleteResponse;

/** Optional parameters. */
export interface CategoryReadAllOptionalParams
  extends coreClient.OperationOptions {
  skip?: number;
  take?: number;
}

/** Contains response data for the categoryReadAll operation. */
export type CategoryReadAllResponse =
  BaseResponseListUseCasesCategoryReadRealAllResponse;

/** Optional parameters. */
export interface LogCreateOptionalParams extends coreClient.OperationOptions {
  body?: UseCasesLogCreateRequest;
}

/** Contains response data for the logCreate operation. */
export type LogCreateResponse = BaseResponseUseCasesLogCreateResponse;

/** Optional parameters. */
export interface LogReadAllTodayOptionalParams
  extends coreClient.OperationOptions {
  date?: Date;
}

/** Contains response data for the logReadAllToday operation. */
export type LogReadAllTodayResponse =
  BaseResponseListUseCasesLogReadAllByDateResponse;

/** Optional parameters. */
export interface LogReadByAppOptionalParams
  extends coreClient.OperationOptions {
  skip?: number;
  take?: number;
  appId?: string;
  startDate?: Date;
  endDate?: Date;
}

/** Contains response data for the logReadByApp operation. */
export type LogReadByAppResponse = BaseResponseListUseCasesLogReadByAppResponse;

/** Optional parameters. */
export interface LogReadByIdOptionalParams extends coreClient.OperationOptions {
  id?: string;
}

/** Contains response data for the logReadById operation. */
export type LogReadByIdResponse = BaseResponseUseCasesLogReadByIdResponse;

/** Optional parameters. */
export interface UserLoginOptionalParams extends coreClient.OperationOptions {
  body?: UseCasesUserLoginRequest;
}

/** Contains response data for the userLogin operation. */
export type UserLoginResponse = BaseResponseUseCasesUserLoginResponse;

/** Optional parameters. */
export interface UserRefreshTokenOptionalParams
  extends coreClient.OperationOptions {
  body?: UseCasesUserRefreshTokenRequest;
}

/** Contains response data for the userRefreshToken operation. */
export type UserRefreshTokenResponse =
  BaseResponseUseCasesUserRefreshTokenResponse;

/** Optional parameters. */
export interface UserLogoutOptionalParams extends coreClient.OperationOptions {}

/** Contains response data for the userLogout operation. */
export type UserLogoutResponse = BaseResponseUseCasesUserLogoutResponse;

/** Optional parameters. */
export interface UserRegisterOptionalParams
  extends coreClient.OperationOptions {
  body?: UseCasesUserRegisterRequest;
}

/** Contains response data for the userRegister operation. */
export type UserRegisterResponse = BaseResponseUseCasesUserRegisterResponse;

/** Optional parameters. */
export interface UserGetAllOptionalParams extends coreClient.OperationOptions {
  page?: number;
  pageSize?: number;
}

/** Contains response data for the userGetAll operation. */
export type UserGetAllResponse = BaseResponseListDomainRecordsDtosUserDto;

/** Optional parameters. */
export interface UserDeleteOptionalParams extends coreClient.OperationOptions {
  id?: string;
}

/** Contains response data for the userDelete operation. */
export type UserDeleteResponse = BaseResponseSystemObject;

/** Optional parameters. */
export interface UserCompleteRegistrationOptionalParams
  extends coreClient.OperationOptions {
  body?: UseCasesUserCompleteRegistrationRequest;
}

/** Contains response data for the userCompleteRegistration operation. */
export type UserCompleteRegistrationResponse = BaseResponseSystemObject;

/** Optional parameters. */
export interface UserRequestForgotPasswordOptionalParams
  extends coreClient.OperationOptions {
  email?: string;
}

/** Contains response data for the userRequestForgotPassword operation. */
export type UserRequestForgotPasswordResponse = BaseResponseSystemObject;

/** Optional parameters. */
export interface UserConfirmForgotPasswordOptionalParams
  extends coreClient.OperationOptions {
  id?: string;
  token?: string;
  password?: string;
}

/** Contains response data for the userConfirmForgotPassword operation. */
export type UserConfirmForgotPasswordResponse = BaseResponseSystemObject;

/** Optional parameters. */
export interface PresentationOptionalParams
  extends coreClient.ServiceClientOptions {
  /** Overrides client endpoint. */
  endpoint?: string;
}
