export async function GET(context) {
    const url = new URL(context.request.url)
    const query = url.searchParams.get('q') || ''
    const offset = url.searchParams.get('offset') || ''

    const LIMIT = 151
    const pokemonRequest = fetch(`https://pokeapi.co/api/v2/pokemon?limit=${LIMIT}${offset ? `&offset=${offset}` : ''}`)
        .then(res => res.json())
        .then(async (data) => {
            // simulate a slow response
            if (url.searchParams.get('slow')) {
                await new Promise(resolve => setTimeout(resolve, 1000));
            }

            const offset = data.next ? parseInt(new URL(data.next).searchParams.get('offset') || '') : null

            return {
                limit: LIMIT,
                offset,
                results: data.results.filter(pokemon => pokemon.name.toLowerCase().includes(query.toLowerCase()))
            }
        })

    if (context.request.headers.get('accept') === 'application/json') {
        return new Response(JSON.stringify(await pokemonRequest), {
            headers: {
                'Content-Type': 'application/json'
            }
        })
    } else {
        context.pokemonRequest = pokemonRequest
    }
}