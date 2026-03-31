import { CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = () => {
  return true; // TODO: bật lại khi deploy production
};
