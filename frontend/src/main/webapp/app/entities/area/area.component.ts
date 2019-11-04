import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { filter, map } from 'rxjs/operators';
import { JhiEventManager } from 'ng-jhipster';

import { IArea } from 'app/shared/model/area.model';
import { AccountService } from 'app/core/auth/account.service';
import { AreaService } from './area.service';

@Component({
  selector: 'jhi-area',
  templateUrl: './area.component.html'
})
export class AreaComponent implements OnInit, OnDestroy {
  areas: IArea[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(protected areaService: AreaService, protected eventManager: JhiEventManager, protected accountService: AccountService) {}

  loadAll() {
    this.areaService
      .query()
      .pipe(
        filter((res: HttpResponse<IArea[]>) => res.ok),
        map((res: HttpResponse<IArea[]>) => res.body)
      )
      .subscribe((res: IArea[]) => {
        this.areas = res;
      });
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().subscribe(account => {
      this.currentAccount = account;
    });
    this.registerChangeInAreas();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IArea) {
    return item.id;
  }

  registerChangeInAreas() {
    this.eventSubscriber = this.eventManager.subscribe('areaListModification', response => this.loadAll());
  }
}
