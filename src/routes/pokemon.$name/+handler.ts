export async function GET(context) {
    const url = new URL(context.request.url)
    const name = context.params.name

    const pokemonRequest = fetch(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`)
        .then(res => {
            if (!res.ok) {
                return null;
            }
            return res.json();
        })
        .then(async (data) => {
            if (!data) return null;
            
            // simulate a slow response            
            if (url.searchParams.get('slow')) {
                await new Promise(resolve => setTimeout(resolve, 1000));
            }
            
            return {
                id: data.id,
                name: data.name,
                sprite: data.sprites.other["official-artwork"].front_default,
                types: data.types.map((t: any) => t.type.name),
                stats: data.stats.map((s: any) => ({
                    name: s.stat.name,
                    value: s.base_stat
                })),
                abilities: data.abilities.map((a: any) => a.ability.name)
            };
        })

    context.pokemonRequest = pokemonRequest
} 