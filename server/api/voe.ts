type QueryParams = {
    house: string
}

export default defineEventHandler(async (event) => {
    const { house } = getQuery<QueryParams>(event)

    if (!house) {
        throw new Error('House is required')
    }

    const rawDisconnectedTable = await getDisconnectionTable(house)

    return rawDisconnectedTable
}
// , {
//     getKey(event) {
//         return getQuery<QueryParams>(event).house
//     },
//     base: 'voe',
//     maxAge: 10 * 1000,
//     swr: false
// }
)

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
