import type { AuthenticatorDevice } from "@simplewebauthn/typescript-types";
import {
  createCredentials,
  getCredentialByCredentialId,
  updateCredentialCounter,
} from "../file";
import { base64ToUint8Array } from "../utils/utils";

export const credentialService = {
  async saveNewCredential(
    userId: string,
    credentialId: string,
    publicKey: string,
    counter: number,
    transports: string,
  ) {
    return await createCredentials({
      id: 1,
      user_id: userId,
      credential_id: credentialId,
      public_key: publicKey,
      counter: counter,
      transports: [transports],
    });
  },

  async getCredentialByCredentialId(
    credentialId: string,
  ): Promise<AuthenticatorDevice | null> {
    const creds = await getCredentialByCredentialId(credentialId);

    if (!creds) return null;
    else {
      return {
        userID: creds.user_id,
        credentialID: base64ToUint8Array(creds.credential_id),
        credentialPublicKey: base64ToUint8Array(creds.public_key),
        counter: creds.counter,
        transports: creds.transports,
      } as AuthenticatorDevice;
    }
  },

  async updateCredentialCounter(credentialId: string, newCounter: number) {
    const _updated = await updateCredentialCounter(credentialId, newCounter);
  },
};
