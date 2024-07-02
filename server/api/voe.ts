
import { JSDOM } from 'jsdom'
import { DisconnectionTable, TableClass } from '~/types'

type HouseParams = {
    house: string
    turn?: string
}

function houseParamsToId(params: HouseParams) {
    return `${params.house}-${params.turn}`
}

export default defineCachedEventHandler(async (event) => {
    const houseParams = getQuery<HouseParams>(event)

    if (!houseParams.house) {
        throw new Error('House is required')
    }

    const rawDisconnectedTable = await getDisconnectionTable(houseParams.house)
    const parsedDisconnectedTable = parseDisconnectionTable(rawDisconnectedTable, houseParams.turn)

    return parsedDisconnectedTable
}, {
    getKey(event) {
        return houseParamsToId(getQuery<HouseParams>(event))
    },
    base: 'voe',
    maxAge: 10 * 1000,
    swr: false
})

async function getDisconnectionTable(house: string) {
    const body = new FormData()

    body.append('form_id', 'disconnection_detailed_search_form')
    body.append('house_id', house)
    
    return await $fetch('https://www.voe.com.ua/disconnection/detailed?ajax_form=1&_wrapper_format=drupal_ajax', {
        method: 'POST',
        body,
        mode: 'cors'
    }) as any
}

function parseDisconnectionTable(item: any, turn?: string): DisconnectionTable {
    const body = item.at(-1).data
    const dom = new JSDOM(body)
    const document = dom.window.document
    const tables = document.querySelectorAll('.disconnection-detailed-table')
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
