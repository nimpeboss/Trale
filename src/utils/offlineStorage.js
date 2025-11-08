// Local storage keys
const STORAGE_KEYS= {
    POKEMON_CACHE: 'pokemon_cache',
        GAME_STATE: 'pokemon_game_state',
        HIGH_SCORE: 'pokemonHighScore',
        BEST_STREAK: 'pokemonBestStreak',
        DARK_MODE: 'pokemon_dark_mode',
        LAST_CACHE_UPDATE: 'pokemon_cache_timestamp'
}

;

// Cache duration (7 days)
const CACHE_DURATION=7 * 24 * 60 * 60 * 1000;

class OfflineStorage {

    // Check if we're online
    static isOnline() {
        return navigator.onLine;
    }

    // Save Pokemon data to local storage
    static savePokemonToCache(pokemon) {
        try {
            const cache=this.getPokemonCache();

            cache[pokemon.id]= {
                ...pokemon,
                cachedAt: Date.now()
            }

            ;

            localStorage.setItem(STORAGE_KEYS.POKEMON_CACHE, JSON.stringify(cache));
            localStorage.setItem(STORAGE_KEYS.LAST_CACHE_UPDATE, Date.now().toString());

            console.log(`Cached Pokemon: $ {
                    pokemon.name
                }

                (ID: $ {
                        pokemon.id
                    }

                )`);
            return true;
        }

        catch (error) {
            console.error('Failed to cache Pokemon:', error);
            return false;
        }
    }

    // Get Pokemon cache from local storage
    static getPokemonCache() {
        try {
            const cache=localStorage.getItem(STORAGE_KEYS.POKEMON_CACHE);

            return cache ? JSON.parse(cache) : {}

            ;
        }

        catch (error) {
            console.error('Failed to read Pokemon cache:', error);

            return {}

            ;
        }
    }

    // Get cached Pokemon by ID
    static getCachedPokemon(id) {
        const cache=this.getPokemonCache();
        const pokemon=cache[id];

        if ( !pokemon) return null;

        // Check if cache is still valid
        const isExpired=Date.now() - pokemon.cachedAt>CACHE_DURATION;

        if (isExpired) {
            this.removePokemonFromCache(id);
            return null;
        }

        return pokemon;
    }

    // Remove Pokemon from cache
    static removePokemonFromCache(id) {
        try {
            const cache=this.getPokemonCache();
            delete cache[id];
            localStorage.setItem(STORAGE_KEYS.POKEMON_CACHE, JSON.stringify(cache));
            return true;
        }

        catch (error) {
            console.error('Failed to remove Pokemon from cache:', error);
            return false;
        }
    }

    // Clear expired cache entries
    static clearExpiredCache() {
        try {
            const cache=this.getPokemonCache();
            const now=Date.now();
            let cleanedCount=0;

            Object.keys(cache).forEach(id=> {
                    const pokemon=cache[id];

                    if (now - pokemon.cachedAt > CACHE_DURATION) {
                        delete cache[id];
                        cleanedCount++;
                    }
                }

            );

            if (cleanedCount > 0) {
                localStorage.setItem(STORAGE_KEYS.POKEMON_CACHE, JSON.stringify(cache));

                console.log(`Cleaned $ {
                        cleanedCount
                    }

                    expired Pokemon from cache`);
            }

            return cleanedCount;
        }

        catch (error) {
            console.error('Failed to clean expired cache:', error);
            return 0;
        }
    }

    // Get cache statistics
    static getCacheStats() {
        const cache=this.getPokemonCache();
        const cacheKeys=Object.keys(cache);
        const now=Date.now();

        const validEntries=cacheKeys.filter(id=> now - cache[id].cachedAt <=CACHE_DURATION);

        const lastUpdate=localStorage.getItem(STORAGE_KEYS.LAST_CACHE_UPDATE);

        return {
            totalEntries: cacheKeys.length,
                validEntries: validEntries.length,
                expiredEntries: cacheKeys.length - validEntries.length,
                lastUpdate: lastUpdate ? new Date(parseInt(lastUpdate)): null,
                cacheSize: this.getCacheSize()
        }

        ;
    }

    // Get approximate cache size in KB
    static getCacheSize() {
        try {
            const cache=localStorage.getItem(STORAGE_KEYS.POKEMON_CACHE);
            return cache ? Math.round(cache.length / 1024): 0;
        }

        catch (error) {
            console.error('Failed to get cache size:', error);
            return 0;
        }
    }

    // Save game state
    static saveGameState(gameState) {
        try {
            localStorage.setItem(STORAGE_KEYS.GAME_STATE, JSON.stringify( {
                        ...gameState,
                        savedAt: Date.now()
                    }

                ));
            return true;
        }

        catch (error) {
            console.error('Failed to save game state:', error);
            return false;
        }
    }

    // Load game state
    static loadGameState() {
        try {
            const state=localStorage.getItem(STORAGE_KEYS.GAME_STATE);
            return state ? JSON.parse(state): null;
        }

        catch (error) {
            console.error('Failed to load game state:', error);
            return null;
        }
    }

    // Clear all offline data
    static clearAllData() {
        try {
            Object.values(STORAGE_KEYS).forEach(key=> {
                    localStorage.removeItem(key);
                }

            );
            console.log('All offline data cleared');
            return true;
        }

        catch (error) {
            console.error('Failed to clear offline data:', error);
            return false;
        }
    }

    // Get random cached Pokemon IDs for offline mode
    static getRandomCachedPokemonIds(count=2) {
        const cache=this.getPokemonCache();

        const validIds=Object.keys(cache).filter(id=> {
                const pokemon=cache[id];
                return Date.now() - pokemon.cachedAt <=CACHE_DURATION;
            }

        );

        if (validIds.length < count) {
            return validIds;
        }

        // Shuffle and return requested count
        const shuffled=validIds.sort(()=> 0.5 - Math.random());
        return shuffled.slice(0, count);
    }

    // Pre-populate cache with common Pokemon
    static async prePopulateCache(pokemonIds=[]) {
        if ( !this.isOnline()) {
            console.log('Cannot pre-populate cache while offline');
            return false;
        }

        // Default set of popular Pokemon to cache
        const defaultIds=pokemonIds.length>0 ? pokemonIds : [ 1,
        4,
        7,
        25,
        39,
        52,
        104,
        113,
        144,
        145,
        146,
        150,
        151,
        155,
        158,
        161,
        172,
        179,
        185,
        196,
        197,
        248,
        249,
        250,
        252,
        255,
        258,
        280,
        302,
        384,
        385,
        386,
        390,
        393,
        396,
        440,
        448,
        483,
        484,
        487,
        491,
        492,
        493,
        494,
        570,
        571];

        let cached=0;
        const batch_size=5;

        for (let i=0; i < defaultIds.length; i +=batch_size) {
            const batch=defaultIds.slice(i, i + batch_size);

            try {
                const promises=batch.map(async (id)=> {

                        // Check if already cached and valid
                        if (this.getCachedPokemon(id)) {
                            return null;
                        }

                        const response=await fetch(`https: //pokeapi.co/api/v2/pokemon/${id}`);

                            if ( !response.ok) throw new Error(`HTTP $ {
                                    response.status
                                }

                                `);

                            const data=await response.json();
                            const pokemon=this.processPokemonData(data);

                            if (this.savePokemonToCache(pokemon)) {
                                cached++;
                                return pokemon;
                            }

                            return null;
                        }

                    );

                    await Promise.all(promises);

                    // Small delay between batches to avoid overwhelming the API
                    if (i + batch_size < defaultIds.length) {
                        await new Promise(resolve=> setTimeout(resolve, 100));
                    }

                }

                catch (error) {
                    console.error(`Failed to cache batch starting at $ {
                            i
                        }

                        :`, error);
                }
            }

            console.log(`Pre-populated cache with $ {
                    cached
                }

                Pokemon`);
            return cached;
        }

        // Process Pokemon API data for caching
        static processPokemonData(data) {
            return {
                id: data.id,
                name: data.name,
                sprite: data.sprites?.other?.['official-artwork']?.front_default || data.sprites?.front_default || null,
                types: data.types?.map(t=> t.type.name) || [],
                totalStats: data.stats?.reduce((sum, stat)=> sum + stat.base_stat, 0) || 0,
                height: data.height || 0,
                weight: data.weight || 0,
                hp: data.stats?.find(s=> s.stat.name==='hp')?.base_stat || 0,
                attack: data.stats?.find(s=> s.stat.name==='attack')?.base_stat || 0,
                defense: data.stats?.find(s=> s.stat.name==='defense')?.base_stat || 0,
                speed: data.stats?.find(s=> s.stat.name==='speed')?.base_stat || 0
            }

            ;
        }
    }

    // Fallback Pokemon data for extreme offline scenarios
    export const FALLBACK_POKEMON=[ {
        id: 25,
        name: 'pikachu',
        sprite: null,
        types: ['electric'],
        totalStats: 320,
        height: 4,
        weight: 60,
        hp: 35,
        attack: 55,
        defense: 40,
        speed: 90
    }

    ,
        {
        id: 1,
        name: 'bulbasaur',
        sprite: null,
        types: ['grass', 'poison'],
        totalStats: 318,
        height: 7,
        weight: 69,
        hp: 45,
        attack: 49,
        defense: 49,
        speed: 45
    }

    ,
        {
        id: 4,
        name: 'charmander',
        sprite: null,
        types: ['fire'],
        totalStats: 309,
        height: 6,
        weight: 85,
        hp: 39,
        attack: 52,
        defense: 43,
        speed: 65
    }

    ,
        {
        id: 7,
        name: 'squirtle',
        sprite: null,
        types: ['water'],
        totalStats: 314,
        height: 5,
        weight: 90,
        hp: 44,
        attack: 48,
        defense: 65,
        speed: 43
    }

    ];

    export default OfflineStorage;