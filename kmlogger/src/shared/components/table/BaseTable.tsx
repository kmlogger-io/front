
import * as React from 'react'
import { cn } from '../../lib/utils'
import { Separator } from '../separator/Separator'

function BaseTable({
  ref,
  className,
  ...props
}: React.HTMLAttributes<HTMLTableElement> & {
  ref?: React.RefObject<HTMLTableElement | null>
}) {
  return (
    <div className="relative w-full h-full">
      <table
        ref={ref}
        className={cn(
          'w-full caption-bottom text-sm border-collapse',
          className
        )}
        {...props}
      />
    </div>
  )
}
BaseTable.displayName = 'Table'

function BaseTableHeader({
  ref,
  className,
  ...props
}: React.HTMLAttributes<HTMLTableSectionElement> & {
  ref?: React.RefObject<HTMLTableSectionElement | null>
}) {
  return (
    <thead
      ref={ref}
      className={cn('[&_tr]:border-b font-bold', className)}
      {...props}
    >
      {props.children}
      <tr>
        <td colSpan={1000}>
          <Separator orientation="vertical"></Separator>
        </td>
      </tr>
    </thead>
  )
}
BaseTableHeader.displayName = 'TableHeader'

function BaseTableBody({
  ref,
  className,
  ...props
}: React.HTMLAttributes<HTMLTableSectionElement> & {
  ref?: React.RefObject<HTMLTableSectionElement | null>
}) {
  return (
    <tbody
      ref={ref}
      className={cn('[&_tr:last-child]:border-0', className)}
      {...props}
    />
  )
}
BaseTableBody.displayName = 'BaseTableBody'

function BaseTableFooter({
  ref,
  className,
  ...props
}: React.HTMLAttributes<HTMLTableSectionElement> & {
  ref?: React.RefObject<HTMLTableSectionElement | null>
}) {
  return (
    <tfoot
      ref={ref}
      className={cn(
        'border-t bg-muted/50 font-medium [&>tr]:last:border-b-0',
        className
      )}
      {...props}
    />
  )
}
BaseTableFooter.displayName = 'TableFooter'

function BaseTableRow({
  ref,
  className,
  ...props
}: React.HTMLAttributes<HTMLTableRowElement> & {
  ref?: React.RefObject<HTMLTableRowElement | null>
}) {
  return (
    <tr
      ref={ref}
      className={cn(
        'border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted',
        className
      )}
      {...props}
    />
  )
}
BaseTableRow.displayName = 'TableRow'

function BaseTableHead({
  ref,
  className,
  ...props
}: React.ThHTMLAttributes<HTMLTableCellElement> & {
  ref?: React.RefObject<HTMLTableCellElement | null>
}) {
  return (
    <th
      ref={ref}
      className={cn(
        'h-14 px-2 flex-1 align-middle font-medium text [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]',
        className
      )}
      {...props}
    />
  )
}
BaseTableHead.displayName = 'TableHead'

function BaseTableCell({
  ref,
  className,
  ...props
}: React.TdHTMLAttributes<HTMLTableCellElement> & {
  ref?: React.RefObject<HTMLTableCellElement | null>
}) {
  return (
    <td
      ref={ref}
      className={cn(
        'h-14 p-2 flex-1 text-center align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]',
        className
      )}
      {...props}
    />
  )
}
BaseTableCell.displayName = 'TableCell'

function BaseTableCaption({
  ref,
  className,
  ...props
}: React.HTMLAttributes<HTMLTableCaptionElement> & {
  ref?: React.RefObject<HTMLTableCaptionElement | null>
}) {
  return (
    <caption
      ref={ref}
      className={cn('mt-4 text-sm text-muted-foreground', className)}
      {...props}
    />
  )
}
BaseTableCaption.displayName = 'TableCaption'

export {
  BaseTable,
  BaseTableBody,
  BaseTableCaption,
  BaseTableCell,
  BaseTableFooter,
  BaseTableHead,
  BaseTableHeader,
  BaseTableRow,
}
