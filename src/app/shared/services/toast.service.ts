import { Injectable } from "@angular/core";
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from "@angular/material/snack-bar";
import { I18nService } from "./i18n.service";

@Injectable({
    providedIn: 'root',
})
export class ToastService {

    horizontalPosition: MatSnackBarHorizontalPosition = 'end';
    verticalPosition: MatSnackBarVerticalPosition = 'top';

    constructor(
        private _snackBar: MatSnackBar,
        private i18nService: I18nService
    ){}

    private criticity(criticity: string) {
        return `toast-${criticity}`;
    }

    showToast(label: string, criticity: string) {
        const translatedLabel = this.i18nService.translate(label);
        const toastCriticity = this.criticity(criticity);
        this._snackBar.open(translatedLabel, "", {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            duration: 3000,
            panelClass: [toastCriticity]
        });
    }

}