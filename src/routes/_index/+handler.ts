export async function GET(context) {
    const url = new URL(context.request.url)
    const query = url.searchParams.get('q') || ''

    const pokemonRequest = fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
        .then(res => res.json())
        .then(data => data.results)
        .then(async (pokemons) => {
            // simulate a slow response            
            if (url.searchParams.get('slow')) {
                await new Promise(resolve => setTimeout(resolve, 1000));
            }

            return pokemons.filter(pokemon => pokemon.name.toLowerCase().includes(query.toLowerCase()));
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