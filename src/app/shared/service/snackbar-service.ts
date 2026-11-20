import { inject, Service } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Service()
export class SnackbarService {
  snackbar = inject(MatSnackBar);

  openSnackbar(msg: string) {
    this.snackbar.open(msg, 'Close', {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: 3000,
    });
  }
}
