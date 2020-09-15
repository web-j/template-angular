import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Directive, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

import { alertDialog, toast } from 'src/app/constant/constant-message';
import { AbstractAlertService } from '../abstract-alert-service/abstract-alert.service';
import { AbstractDialogComponent } from '../abstract-dialog/abstract-dialog.component';
import { AbstractService } from '../abstract-service/abstract.service';
import { AbstractModel } from './abstract-model';

@Directive()
export abstract class
    AbstractListDirective<TModel extends
    AbstractModel, TService extends
    AbstractService<TModel>> implements
    OnInit, AfterViewInit {

    @ViewChild('table', { static: false }) table: any;
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: true }) sort: MatSort;

    public durationInSeconds = 5;
    public loading: boolean;
    public list: TModel[] = [];

    public search = false;
    public viewDelete = true;

    public dataSource = new MatTableDataSource<TModel>();
    public displayedColumns: TModel[] = [];
    public selection = new SelectionModel<TModel>(true, []);

    constructor(
        public service: TService,
        public router: Router,
        public dialog?: MatDialog,

        public alertService?: AbstractAlertService
    ) { }

    ngOnInit(): void {
        this.getAll(this.search);
    }

    ngAfterViewInit(): void {
        setTimeout(() => {
            this.updateTable();
        }, 0);
    }

    getAll(search?: boolean): void {
        this.loading = true;
        this.service.getAll(search).subscribe(
            success => {
                setTimeout(() => {
                    this.loading = false;
                }, 500);
                this.list = success;
                this.dataSource = new MatTableDataSource(this.list);
                this.updateTable();
            }, error => {
                this.alertService.alertToast(toast.error_getall, toast.action);
                setTimeout(() => {
                    this.loading = false;
                }, 500);
            }
        );
    }

    updateTable(): void {
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.displayedColumns = this.table._contentColumnDefs._results.map((o: { _name: string; }) => o._name);
    }

    // Table settings
    applyFilter(event: Event): void {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }

    isAllSelected(): boolean {
        const numSelected = this.selection.selected.length;
        const numRows = this.dataSource.data.length;
        return numSelected === numRows;
    }

    masterToggle(): void {
        this.isAllSelected() ? this.selection.clear() : this.dataSource.data.forEach(row => this.selection.select(row));
    }

    checkboxLabel(row?: TModel | any): string {
        if (!row) {
            return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
        }
        return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
    }
    // Table settings

    // Navigation settings
    getLocation(): string {
        const tree = this.router.parseUrl(this.router.url);
        return tree.root.children.primary.segments.map(it => it.path).join('/');
    }

    create(): void {
        this.router.navigate([this.getLocation() + '/form']);
    }

    edit(obj: TModel): void {
        this.router.navigate([this.getLocation() + '/form', obj.toString()]);
    }

    copy(obj: TModel): void {
        this.router.navigate([this.getLocation() + '/form'], {
            queryParams: { copy: obj.toString() }
        });
    }
    // Navigation settings

    // delete permanente
    delete(obj?: TModel): void {
        const dialogRef = this.dialog.open(AbstractDialogComponent, {
            width: '400px',
            data: { settings: alertDialog.confirm_delete }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                if (obj) {
                    this.service.delete(obj).subscribe(
                        success => {
                            this.getAll(this.search);

                            this.alertService.alertToast(toast.success_delete, toast.action);

                        }, error => {
                            this.alertService.alertToast(toast.error_delete, toast.action);
                        }
                    );
                } else {
                    const data = this.selection.selected;
                    this.service.deleteList(data).subscribe(
                        success => {
                            this.getAll(this.search);
                            this.selection.clear();

                            this.alertService.alertToast(toast.success_delete_list, toast.action);

                        }, error => {
                            this.alertService.alertToast(toast.error_delete_list, toast.action);
                        }
                    );
                }
            }
        });
    }

    // delete lógico
    erased(obj?: TModel): void {
        const dialogRef = this.dialog.open(AbstractDialogComponent, {
            width: '400px',
            data: { settings: alertDialog.confirm_erase }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                if (obj) {
                    this.service.erase(obj).subscribe(
                        success => {
                            this.getAll(this.search);
                            this.selection.clear();
                            this.alertService.alertToast(toast.success_erase, toast.action);

                            this.viewDelete = true;

                        }, error => {
                            this.alertService.alertToast(toast.error_erase, toast.action);
                        }
                    );
                } else {
                    const data = this.selection.selected;
                    this.service.eraseList(data).subscribe(
                        success => {
                            this.getAll(this.search);
                            this.selection.clear();
                            this.alertService.alertToast(toast.success_erase_list, toast.action);

                            this.viewDelete = true;

                        }, error => {
                            this.alertService.alertToast(toast.error_erase_list, toast.action);
                        }
                    );
                }
            }
        });
    }
}
