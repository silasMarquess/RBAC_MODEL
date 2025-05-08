import { Module } from '@nestjs/common';
import { UuidGeneratorService } from './adapters/uuid.service';
import BcryptService from './adapters/bcrypt.service';

@Module({
  providers: [
    {
      provide: 'ID_GENERATOR',
      useClass: UuidGeneratorService,
    },
    {
      provide: 'HASH_SERVICE',
      useClass: BcryptService,
    },
  ],
  exports: ['ID_GENERATOR', 'HASH_SERVICE'],
})
export default class SharedModule {}
