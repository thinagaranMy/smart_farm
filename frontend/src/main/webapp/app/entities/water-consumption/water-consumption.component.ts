import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { filter, map } from 'rxjs/operators';
import { JhiEventManager } from 'ng-jhipster';

import { IWaterConsumption } from 'app/shared/model/water-consumption.model';
import { AccountService } from 'app/core/auth/account.service';
import { WaterConsumptionService } from './water-consumption.service';

@Component({
  selector: 'jhi-water-consumption',
  templateUrl: './water-consumption.component.html'
})
export class WaterConsumptionComponent implements OnInit, OnDestroy {
  waterConsumptions: IWaterConsumption[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected waterConsumptionService: WaterConsumptionService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.waterConsumptionService
      .query()
      .pipe(
        filter((res: HttpResponse<IWaterConsumption[]>) => res.ok),
        map((res: HttpResponse<IWaterConsumption[]>) => res.body)
      )
      .subscribe((res: IWaterConsumption[]) => {
        this.waterConsumptions = res;
      });
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().subscribe(account => {
      this.currentAccount = account;
    });
    this.registerChangeInWaterConsumptions();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IWaterConsumption) {
    return item.id;
  }

  registerChangeInWaterConsumptions() {
    this.eventSubscriber = this.eventManager.subscribe('waterConsumptionListModification', response => this.loadAll());
  }
}
