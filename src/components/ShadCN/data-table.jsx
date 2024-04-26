"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input"

import {
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
} from "@tanstack/react-table"
   
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";


export function DataTable({ columns, data }) {
	const [sorting, setSorting] = useState([])
	const [columnFilters, setColumnFilters] = useState([])

	const [columnVisibility, setColumnVisibility] =	useState({})
	const [rowSelection, setRowSelection] = useState({})

	const [pagination, setPagination] = useState({
		pageIndex: 0, //initial page index
		pageSize: 5, //default page size
		rowCount: 5, //default row count
	});

	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		onSortingChange: setSorting,
		onGlobalFilterChange: (value) => {
			table.setGlobalFilter(value)
		},
		onColumnFiltersChange: setColumnFilters,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		onColumnVisibilityChange: setColumnVisibility,
		onRowSelectionChange: setRowSelection,
		onPaginationChange: setPagination,
		resetFilters: () => {
			table.resetFilters()
		},

		state: {
			sorting,
			columnFilters,
			columnVisibility,
			rowSelection,
			pagination,
		},
	})

	return (
		<div className="w-full">
			<div className="flex items-center justify-between py-4">
				<Input placeholder="Filter by sectors..."
					value={
						(table.getColumn("sector")?.getFilterValue() ?? "" )}
					onChange={(event) =>
						(table.getColumn("sector"))?.setFilterValue(event.target.value)
					}
					className="max-w-sm"
				/>
				<div className="space-x-4">
					<Button className='bg-black text-white' variant="outline" onClick={() => setColumnFilters()}>
						All
					</Button>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="outline" className="ml-auto">
								Sectors 
							</Button>
						</DropdownMenuTrigger>

						<DropdownMenuContent align="end">
							{
								data.map((row) => row.sector).filter((value, index, self) => self.indexOf(value) === index).map((value) => {
									return (
										<DropdownMenuItem
											key={value}
											onClick={() =>
												table.getColumn("sector")?.setFilterValue(value)
											}
										>
											{value}
										</DropdownMenuItem>
									)
								})
							}
						</DropdownMenuContent>
					</DropdownMenu>

					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="outline" className="ml-auto">
								Location 
							</Button>
						</DropdownMenuTrigger>

						<DropdownMenuContent align="end">
							{
								data.map((row) => row.location).filter((value, index, self) => self.indexOf(value) === index).map((value) => {
									return (
										<DropdownMenuItem
											key={value}
											onClick={() =>
												table.getColumn("location")?.setFilterValue(value)
											}
										>
											{value}
										</DropdownMenuItem>
									)
								})
							}
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</div>

			<div className="rounded-md border">
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									return (
										<TableHead key={header.id}>
											{header.isPlaceholder
												? null
												: flexRender(
													header.column.columnDef.header,
													header.getContext(),
												)}
										</TableHead>
									);
								})}
							</TableRow>
						))}
					</TableHeader>

					<TableBody>
						{table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map((row) => (
								<TableRow
									key={row.id}>
									{row.getVisibleCells().map((cell) => (
										<TableCell key={cell.id}>
											{flexRender(cell.column.columnDef.cell, cell.getContext())}
										</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell colSpan={columns.length} className="h-24 text-center">
									No results.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>

			<div className="flex items-center justify-end space-x-2 py-4">
				<div className="space-x-2">
					<Button variant="outline" size="sm" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
						Previous
					</Button>
					
					<Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
						Next
					</Button>
				</div>
			</div>
		</div>
	);
}
