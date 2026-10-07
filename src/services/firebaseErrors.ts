// PATH: src/services/firebaseErrors.ts | VERSION: 1.2.0 | REQ-ID: FB-ERR-01
import { auth } from './firebase';

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export function handleFirestoreError(error: unknown, op: OperationType, path: string | null): never {
  const user = auth.currentUser;
  const errInfo = {
    error: error instanceof Error ? error.message : String(error),
    operationType: op,
    path,
    authInfo: {
      userId: user?.uid ?? null,
      email: user?.email ?? null,
      emailVerified: user?.emailVerified ?? null,
      isAnonymous: user?.isAnonymous ?? null,
    },
  };
  console.error('Firestore Error:', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}
