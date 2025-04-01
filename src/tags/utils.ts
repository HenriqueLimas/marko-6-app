export function fetchPokemon({ signal, searchQuery, offset }) {
    const params = new URLSearchParams(location.search);
    params.set("q", searchQuery);
    if (offset) {
        params.set("offset", offset);
    }

    return fetch(`/?${params.toString()}`, {
        method: "GET",
        headers: {
            accept: "application/json",
        },
        signal,
    })
        .then((res) => res.json())
        .catch((err) => {
            if (err.name !== "AbortError") {
                console.error(err);
            }
        });
}