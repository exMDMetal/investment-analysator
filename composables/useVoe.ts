import type { DisconnectionTable, TableClass } from "~/types"

export function useVoe() {
    const disconnectionTable = ref<DisconnectionTable>([])

    const loadVoe = async ({ house, turn }: { house: string; turn?: string}) => {
        const raw = await $fetch('/api/voe', { params: { house } })
        disconnectionTable.value = parseDisconnectionTable(raw, turn)
    }

    return {
        loadVoe,
        disconnectionTable
    }
}

function parseDisconnectionTable(item: any, turn?: string): DisconnectionTable {
    const body = item.at(-1).data
    const el = document.createElement('html')
    el.innerHTML = body
    const tables = el.querySelectorAll('.disconnection-detailed-table')
    const currentTable = turn ? Array.from(tables).find((table) => {
        const heading = table.children[0].textContent
        
        return heading?.includes(turn)
    }) : tables[0]

    const tableContainer = currentTable?.querySelector('.disconnection-detailed-table-container')

    if (!tableContainer) {
        throw new Error('Table not found')
    }

    const rows = Array.from(tableContainer.children)

    return rows.map((row) => {
        return {
            text: row.textContent,
            classList: [].slice.call(row.classList) as TableClass[]
        }
    })
}
