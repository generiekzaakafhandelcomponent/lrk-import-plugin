/*
 * Copyright 2026 Ritense BV, the Netherlands.
 *
 * Licensed under EUPL, Version 1.2 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * https://joinup.ec.europa.eu/collection/eupl/eupl-text-eupl-12
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" basis,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from "@angular/core";
import {FunctionConfigurationComponent} from "@valtimo/plugin";
import {BehaviorSubject, combineLatest, map, Observable, Subscription, take} from "rxjs";
import {DownloadLrkDataActionConfig} from "../../models";

@Component({
  standalone: false,
  selector: "valtimo-download-lrk-data-action-configuration",
  templateUrl: "./download-lrk-data-action-configuration.component.html",
})
export class DownloadLrkDataActionConfigurationComponent implements FunctionConfigurationComponent, OnInit, OnDestroy {
  @Input() save$!: Observable<void>;
  @Input() disabled$!: Observable<boolean>;
  @Input() pluginId!: string;
  @Input() prefillConfiguration$!: Observable<DownloadLrkDataActionConfig>;
  @Output() valid: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() configuration: EventEmitter<DownloadLrkDataActionConfig> = new EventEmitter<DownloadLrkDataActionConfig>();

  defaultCbsCodes$!: Observable<Array<{key: string; value: string}> | undefined>;

  private readonly formValue$ = new BehaviorSubject<DownloadLrkDataActionConfig | null>(null);
  private readonly valid$ = new BehaviorSubject<boolean>(false);
  private saveSubscription!: Subscription;

  ngOnInit(): void {
    this.defaultCbsCodes$ = this.prefillConfiguration$.pipe(
      map(config => config?.cbsCodes?.map(value => ({key: value, value: value})))
    );
    this.openSaveSubscription();
  }

  ngOnDestroy(): void {
    this.saveSubscription?.unsubscribe();
  }

  formValueChange(formValue: any): void {
    const parsed: DownloadLrkDataActionConfig = {
      ...formValue,
      batchSize: formValue?.batchSize ? parseInt(formValue.batchSize, 10) : 0,
    };
    this.formValue$.next(parsed);
    this.handleValid(parsed);
  }

  private handleValid(formValue: DownloadLrkDataActionConfig): void {
    const valid = !!(
      formValue?.csvUrl?.trim() &&
      formValue?.cbsCodes?.length &&
      formValue?.batchSize > 0 &&
      formValue?.houdersCollectionVariable?.trim() &&
      formValue?.voorzieningenCollectionVariable?.trim()
    );
    this.valid$.next(valid);
    this.valid.emit(valid);
  }

  private openSaveSubscription(): void {
    this.saveSubscription = this.save$?.subscribe(() => {
      combineLatest([this.formValue$, this.valid$])
        .pipe(take(1))
        .subscribe(([formValue, valid]) => {
          if (valid) {
            this.configuration.emit(formValue!);
          }
        });
    });
  }
}
