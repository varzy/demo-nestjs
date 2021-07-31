import { Global, Module } from '@nestjs/common';
import { FieldExistValidator } from './field-exist.validator';
import { FieldInValidator } from './field-in.validator';
import { FieldUniqueValidator } from './field-unique.validator';
import { Provider } from '@nestjs/common/interfaces/modules/provider.interface';

const allValidators: Provider[] = [FieldExistValidator, FieldInValidator, FieldUniqueValidator];

@Global()
@Module({
  providers: allValidators,
  exports: allValidators,
})
export class ValidatorsModule {}
