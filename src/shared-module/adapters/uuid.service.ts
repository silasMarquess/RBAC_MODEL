import { Injectable } from '@nestjs/common';
import IIdgenerator from '../id-generator.interface';
import { v4 as uuid } from 'uuid';

@Injectable()
export class UuidGeneratorService implements IIdgenerator {
  generate(): string {
    return uuid();
  }
}
