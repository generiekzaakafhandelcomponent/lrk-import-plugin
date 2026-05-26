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
import {FunctionConfigurationComponent, FunctionConfigurationData} from "@valtimo/plugin";
import {BehaviorSubject, combineLatest, Observable, Subscription, take} from "rxjs";

interface TrackTablesConfig extends FunctionConfigurationData {
  tables: string[];
}

@Component({
  standalone: false,
  selector: "valtimo-track-tables-action-configuration",
  templateUrl: "./track-tables-action-configuration.component.html",
})
export class TrackTablesActionConfigurationComponent implements FunctionConfigurationComponent, OnInit, OnDestroy {
  @Input() save$!: Observable<void>;
  @Input() disabled$!: Observable<boolean>;
  @Input() pluginId!: string;
  @Input() prefillConfiguration$!: Observable<TrackTablesConfig>;
  @Output() valid: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() configuration: EventEmitter<FunctionConfigurationData> = new EventEmitter<FunctionConfigurationData>();

  public tables: string[] = [""];

  private readonly valid$ = new BehaviorSubject<boolean>(false);
  private saveSubscription!: Subscription;
  private prefillSubscription!: Subscription;

  public ngOnInit(): void {
    this.prefillSubscription = this.prefillConfiguration$?.pipe(take(1)).subscribe(config => {
      if (config?.tables?.length) {
        this.tables = [...config.tables];
      }
      this.emitValid();
    });

    this.saveSubscription = this.save$?.subscribe(() => {
      combineLatest([this.valid$])
        .pipe(take(1))
        .subscribe(([valid]) => {
          if (valid) {
            this.configuration.emit({tables: this.nonEmptyTables()});
          }
        });
    });
  }

  public ngOnDestroy(): void {
    this.saveSubscription?.unsubscribe();
    this.prefillSubscription?.unsubscribe();
  }

  public addTable(): void {
    this.tables = [...this.tables, ""];
    this.emitValid();
  }

  public removeTable(index: number): void {
    this.tables = this.tables.filter((_, i) => i !== index);
    this.emitValid();
  }

  public trackByIndex(index: number): number {
    return index;
  }

  public onTableChange(index: number, value: string): void {
    this.tables = this.tables.map((t, i) => (i === index ? value : t));
    this.emitValid();
  }

  private nonEmptyTables(): string[] {
    return this.tables.map(t => t.trim()).filter(t => t.length > 0);
  }

  private emitValid(): void {
    const valid = this.nonEmptyTables().length > 0;
    this.valid$.next(valid);
    this.valid.emit(valid);
  }
}
