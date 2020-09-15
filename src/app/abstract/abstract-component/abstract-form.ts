import { Directive, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';

import { SpinnerComponent } from 'src/app/component/spinner/spinner.component';
import { alertDialog, toast } from 'src/app/constant/constant-message';
import { AbstractAlertService } from '../abstract-alert-service/abstract-alert.service';
import { AbstractDialogComponent } from '../abstract-dialog/abstract-dialog.component';
import { AbstractService } from '../abstract-service/abstract.service';
import { AbstractModel } from './abstract-model';

@Directive()
export abstract class AbstractFormDirective<TModel extends AbstractModel, TService extends AbstractService<TModel>> implements OnInit {

    public obj: TModel;
    public edit: boolean;
    public loading: any;

    public durationInSeconds = 5;

    constructor(
        public service: TService,
        public modelType: new () => TModel,
        public router: Router,
        public activatedRoute: ActivatedRoute,
        public dialog?: MatDialog,

        public alertService?: AbstractAlertService
    ) { }

    ngOnInit(): void {
        this.obj = this.getNew();
        this.getOne();
    }

    // inicializa o modelo recebido por parâmetro
    getNew(): TModel {
        return new this.modelType();
    }

    getOne(): void {
        if (this.activatedRoute.snapshot.paramMap.get('id') !== null) {
            this.loading = this.alertService.spinner();
            const id = this.activatedRoute.snapshot.paramMap.get('id');
            this.service.getOne(id).subscribe(
                success => {
                    setTimeout(() => {
                        this.loading.close();
                    }, 500);
                    this.obj = success;
                    this.edit = true;

                    this.afterLoad();

                }, error => {
                    this.alertService.alertToast(toast.error_getone, toast.action);
                }
            );
        } else if (this.activatedRoute.snapshot.queryParams.copy !== null && this.activatedRoute.snapshot.queryParams.copy !== undefined) {
            this.loading = this.alertService.spinner();
            const id = this.activatedRoute.snapshot.queryParams.copy;
            this.service.getOne(id).subscribe(
                success => {
                    setTimeout(() => {
                        this.loading.close();
                    }, 500);
                    this.obj = success;
                    this.edit = false;
                    this.obj.id = undefined;

                    this.afterLoad();

                }, error => {
                    this.alertService.alertToast(toast.error_copy, toast.action);
                }
            );
        }
    }

    saveOrUpdate(): void {
        if (this.edit) {
            const dialogRef = this.dialog.open(AbstractDialogComponent, {
                width: '500px',
                data: { settings: alertDialog.confirm_update }
            });

            dialogRef.afterClosed().subscribe(result => {
                if (result) {
                    this.service.update(this.obj).subscribe(
                        success => {
                            this.obj = success;
                            this.back();
                            this.alertService.alertToast(toast.success_update, toast.action);
                        }, error => {
                            this.back();
                            this.alertService.alertToast(toast.error_update, toast.action);
                        }
                    );
                }
            });

        } else {
            this.service.save(this.obj).subscribe(
                success => {
                    this.back();
                    this.alertService.alertToast(toast.success_save, toast.action);
                }, error => {
                    this.alertService.alertToast(toast.error_save, toast.action);
                }
            );
        }
    }

    afterLoad(): void { }

    getLocation(): string {
        const tree = this.router.parseUrl(this.router.url);
        return tree.root.children.primary.segments.map(it => it.path).join('/');
    }

    getParentPath(path?: any): string {
        if (path) {
            return path.slice(0, Math.max(path.lastIndexOf('/'), 0));
        }
        return this.getLocation().slice(0, Math.max(this.getLocation().lastIndexOf('/'), 1)
        );
    }

    back(): void {
        if (this.edit) {
            this.router.navigate([this.getParentPath(this.getParentPath())]);
        } else {
            this.router.navigate([this.getParentPath()]);
        }
    }

    cancel(): void {
        const dialogRef = this.dialog.open(AbstractDialogComponent, {
            width: '500px',
            data: { settings: alertDialog.confirm_cancel }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.back();
            }
        });
    }

}
