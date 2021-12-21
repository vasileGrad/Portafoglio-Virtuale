import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Transaction } from 'src/app/models/Transaction';
import { ShareDataService } from 'src/app/services/share-data.service';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css'],
})
export class TransactionComponent {
  displayedColumns: string[] = [
    'id',
    'date',
    'type',
    'symbol',
    'price',
    'amount',
    'totalPrice'
  ];
  dataSource: MatTableDataSource<Transaction>;
  public selectedRow: Transaction = null;
  public isSelectedRow: boolean = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private shareDate: ShareDataService) {
    this.dataSource = new MatTableDataSource(this.shareDate.getTransactions());
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  selectRow(row: Transaction) {
    if (this.selectedRow?.id === row.id) {
      this.isSelectedRow = false;
      this.selectedRow = null;
    } else {
      this.isSelectedRow = true;
      this.selectedRow = row;
    }
  }

  deleteSelectedRow() {
    if (this.selectRow) {
      this.dataSource.data = this.dataSource.data.filter(
        (data) => data.id !== this.selectedRow.id
      );
      this.shareDate.deleteTransaction(this.dataSource.data);
      this.isSelectedRow = false;
      this.selectedRow = null;
    }
  }

  deleteAll() {
    this.dataSource.data = [];
    this.shareDate.deleteAllTransactions();
  }
}
