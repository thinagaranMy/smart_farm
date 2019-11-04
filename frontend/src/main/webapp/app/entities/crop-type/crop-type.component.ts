import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { filter, map } from 'rxjs/operators';
import { JhiEventManager } from 'ng-jhipster';

import { ICropType } from 'app/shared/model/crop-type.model';
import { AccountService } from 'app/core/auth/account.service';
import { CropTypeService } from './crop-type.service';

@Component({
  selector: 'jhi-crop-type',
  templateUrl: './crop-type.component.html'
})
export class CropTypeComponent implements OnInit, OnDestroy {
  cropTypes: ICropType[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected cropTypeService: CropTypeService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.cropTypeService
      .query()
      .pipe(
        filter((res: HttpResponse<ICropType[]>) => res.ok),
        map((res: HttpResponse<ICropType[]>) => res.body)
      )
      .subscribe((res: ICropType[]) => {
        this.cropTypes = res;
      });
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().subscribe(account => {
      this.currentAccount = account;
    });
    this.registerChangeInCropTypes();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: ICropType) {
    return item.id;
  }

  registerChangeInCropTypes() {
    this.eventSubscriber = this.eventManager.subscribe('cropTypeListModification', response => this.loadAll());
  }
}
