import { Injectable } from '@nestjs/common';
import { roles } from 'src/utils/roles';
import { AuthorizationGuard } from './authorization.guard';

@Injectable()
export class QualityAssuranceGuard extends AuthorizationGuard {
  constructor() {
    super(roles.qualityAssurance);
  }
}
