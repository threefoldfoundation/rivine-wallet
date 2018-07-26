import { createSelector } from '@ngrx/store';
import { CreateKeyPairResult, CryptoAddress, KeyPair, QrCodeScannedContent, RogerthatError } from 'rogerthat-plugin';
import { getProviderFromKeyPair } from '../configuration';
import { apiRequestInitial, ApiRequestStatus, ServiceData, UserData } from '../interfaces';
import { IAppState } from './app.state';

export interface IRogerthatState<UserDataType = any, ServiceDataType = any> {
  userData: UserDataType;
  serviceData: ServiceDataType;
  address: CryptoAddress | null;
  addressStatus: ApiRequestStatus<RogerthatError>;
  qrCodeContent: QrCodeScannedContent | null;
  qrCodeError: RogerthatError | null;
  securityKeys: KeyPair[];
  keyPair: CreateKeyPairResult | null;
  createKeyPairStatus: ApiRequestStatus<RogerthatError>;
}

export const getRogerthatState = (state: IAppState) => state.rogerthat;

export const initialRogerthatState: IRogerthatState<UserData, ServiceData> = {
  userData: {},
  serviceData: {},
  address: null,
  addressStatus: apiRequestInitial,
  qrCodeContent: null,
  qrCodeError: null,
  securityKeys: [],
  keyPair: null,
  createKeyPairStatus: apiRequestInitial,
};

export const getQrCodeContent = createSelector(getRogerthatState, s => s.qrCodeContent);
export const getQrCodeError = createSelector(getRogerthatState, s => s.qrCodeError);

export const getAddress = createSelector(getRogerthatState, s => s.address);
export const getAddressStatus = createSelector(getRogerthatState, s => s.addressStatus);

export const getUserData = createSelector(getRogerthatState, s => s.userData);
export const getServiceData = createSelector(getRogerthatState, s => s.serviceData);

export const getKeyPairs = createSelector(getRogerthatState, s => s.securityKeys);
export const getKeyPairMapping = createSelector(getKeyPairs, keyPairs => keyPairs.map(keyPair => ({
  keyPair,
  provider: getProviderFromKeyPair(keyPair)
})));
export const createKeyPairStatus = createSelector(getRogerthatState, s => s.createKeyPairStatus);
