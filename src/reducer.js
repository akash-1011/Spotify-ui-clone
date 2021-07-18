export const initialState = {
    user: null,
    playlists: [],
    playing: false,
    item: null,
    discover_weekly: null,
    top_artists: null,
    // token: "BQCcQdwkl2zHvTp7d6nmwerTmw13kPV5WtrZuvLwMtH3NQYo9_HdEAKKHEtLbBxEWaN3doTx7GHYpV0WeYReLzmUhbqywM1iGyOFCzSUzG6wRPpdKRNJsv_rkSBLBDoqqv-0Pfbhj14mNpa8ulJwCUSJzf2PJ4jAoII574wFg4IKxTgKk_9U"
}

const reducer = (state, action) => {
console.log(action);

    switch (action.type) {
        case 'SET_USER':
            return {
                ...state,
                user: action.user
            }
        
        case 'SET_TOKEN':
            return {
                ...state,
                token: action.token
            }
        
        case 'SET_PLAYLISTS':
            return {
                ...state,
                playlists: action.playlists
            }
        
        case 'SET_DISCOVER_WEEKLY': 
            return {
                ...state,
                discover_weekly: action.discover_weekly
            }

        case "SET_PLAYING":
            return {
                ...state,
                playing: action.playing,
            }

        case "SET_ITEM":
            return {
                ...state,
                item: action.item,
            }

        case "SET_TOP_ARTISTS":
            return {
                ...state,
                top_artists: action.top_artists,
            }
    
        default:
            return state;
    }

}

export default reducer;