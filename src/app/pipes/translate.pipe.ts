import { Pipe, PipeTransform, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { TranslationService } from '../services/translation.service';
import { Subscription } from 'rxjs';

@Pipe({ name: 'translate', standalone: true })
export class TranslatePipe implements PipeTransform, OnDestroy {
  private sub: Subscription;

  constructor(private ts: TranslationService, private cd: ChangeDetectorRef) {
    this.sub = this.ts.lang$.subscribe(() => {
      // language changed -> mark for check
      try { this.cd.markForCheck(); } catch (e) { /* ignore */ }
    });
  }

  transform(key: string): string {
    if (!key) return '';
    return this.ts.t(key);
  }

  ngOnDestroy(): void {
    if (this.sub) this.sub.unsubscribe();
  }
}
