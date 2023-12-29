import { Injectable } from "@angular/core";
import { MatPaginatorIntl } from "@angular/material/paginator";
import { Subject } from "rxjs";
import { I18nService } from "../../../shared/services/i18n.service";

@Injectable()
export class MyCustomPaginatorIntl implements MatPaginatorIntl {
  changes = new Subject<void>();

  firstPageLabel = this.i18nService.translate('data.table.label.first.page');
  itemsPerPageLabel = this.i18nService.translate('data.table.label.items.page');
  lastPageLabel = this.i18nService.translate('data.table.label.last.page');

  nextPageLabel = this.i18nService.translate('data.table.label.next.page');
  previousPageLabel = this.i18nService.translate('data.table.label.previous.page');

  constructor(
    private i18nService: I18nService
  ){}

  getRangeLabel(page: number, pageSize: number, length: number): string {
    if (length === 0) {
      return this.i18nService.translate('data.table.label.init.page');
    }
    const amountPages = Math.ceil(length / pageSize);
    return this.i18nService.translate('common.page') + (page + 1) + this.i18nService.translate('common.of') + amountPages;
  }
}