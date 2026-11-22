import DestroyController from 'amber-ui/controllers/application/destroy';
import { inject as service } from '@ember/service';

export default class DeclarationDestroyController extends DestroyController {
  @service session;

  successMessage = 'Declaratie verwijderd!';
  successTransitionTarget = 'declarations';
  cancelTransitionTarget = 'declarations.declaration';
}
