import { v4 as uuidV4 } from 'uuid';

export class UuidAdapter {
  constructor() {}
  public static v4(): string {
    return uuidV4();
  }
}
