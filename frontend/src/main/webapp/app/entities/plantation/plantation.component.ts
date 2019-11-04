import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { filter, map } from 'rxjs/operators';
import { JhiEventManager } from 'ng-jhipster';

import { IPlantation } from 'app/shared/model/plantation.model';
import { AccountService } from 'app/core/auth/account.service';
import { PlantationService } from './plantation.service';

@Component({
  selector: 'jhi-plantation',
  templateUrl: './plantation.component.html'
})
export class PlantationComponent implements OnInit, OnDestroy {
  plantations: IPlantation[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected plantationService: PlantationService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.plantationService
      .query()
      .pipe(
        filter((res: HttpResponse<IPlantation[]>) => res.ok),
        map((res: HttpResponse<IPlantation[]>) => res.body)
      )
      .subscribe((res: IPlantation[]) => {
        this.plantations = res;
      });
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().subscribe(account => {
      this.currentAccount = account;
    });
    this.registerChangeInPlantations();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IPlantation) {
    return item.id;
  }

  registerChangeInPlantations() {
    this.eventSubscriber = this.eventManager.subscribe('plantationListModification', response => this.loadAll());
  }
}
