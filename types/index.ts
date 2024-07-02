type DayClass = 
    | 'other_day'
    | 'current_day'

type ConnectionClass =
    | 'no_disconnection'
    | 'has_disconnection'
    | 'confirm_1'
    | 'confirm_0'

type TableCellClass = 
    | 'disconnection-detailed-table-cell'
    | 'legend'
    | 'head'
    | 'grey'
    | 'day_col'
    | 'cell'

export type TableClass = TableCellClass | DayClass | ConnectionClass

export type TableItem = {
    text: string | null
    classList: TableClass[]
}

export type DisconnectionTable = TableItem[]
