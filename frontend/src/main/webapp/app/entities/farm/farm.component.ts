import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { filter, map } from 'rxjs/operators';
import { JhiEventManager } from 'ng-jhipster';

import { IFarm } from 'app/shared/model/farm.model';
import { AccountService } from 'app/core/auth/account.service';
import { FarmService } from './farm.service';

@Component({
  selector: 'jhi-farm',
  templateUrl: './farm.component.html'
})
export class FarmComponent implements OnInit, OnDestroy {
  farms: IFarm[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(protected farmService: FarmService, protected eventManager: JhiEventManager, protected accountService: AccountService) {}

  loadAll() {
    this.farmService
      .query()
      .pipe(
        filter((res: HttpResponse<IFarm[]>) => res.ok),
        map((res: HttpResponse<IFarm[]>) => res.body)
      )
      .subscribe((res: IFarm[]) => {
        this.farms = res;
      });
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().subscribe(account => {
      this.currentAccount = account;
    });
    this.registerChangeInFarms();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IFarm) {
    return item.id;
  }

  registerChangeInFarms() {
    this.eventSubscriber = this.eventManager.subscribe('farmListModification', response => this.loadAll());
  }
}
