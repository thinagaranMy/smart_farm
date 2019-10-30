import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { filter, map } from 'rxjs/operators';
import { JhiEventManager } from 'ng-jhipster';

import { IPhReading } from 'app/shared/model/ph-reading.model';
import { AccountService } from 'app/core/auth/account.service';
import { PhReadingService } from './ph-reading.service';

@Component({
  selector: 'jhi-ph-reading',
  templateUrl: './ph-reading.component.html'
})
export class PhReadingComponent implements OnInit, OnDestroy {
  phReadings: IPhReading[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected phReadingService: PhReadingService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.phReadingService
      .query()
      .pipe(
        filter((res: HttpResponse<IPhReading[]>) => res.ok),
        map((res: HttpResponse<IPhReading[]>) => res.body)
      )
      .subscribe((res: IPhReading[]) => {
        this.phReadings = res;
      });
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().subscribe(account => {
      this.currentAccount = account;
    });
    this.registerChangeInPhReadings();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IPhReading) {
    return item.id;
  }

  registerChangeInPhReadings() {
    this.eventSubscriber = this.eventManager.subscribe('phReadingListModification', response => this.loadAll());
  }
}
