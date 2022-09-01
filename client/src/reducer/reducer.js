import{
    GET_ALL_COUNTRIES,
    SEARCH_COUNTRY,
    FILTER_BY_CONTINENT,
    ALPHABETICAL_SORT,
    POPULATION_SORT,
    GET_DETAIL
} from '../actions/actions.js'

const initialState = {
    countries: [],
    countriesCopy: [],
    Allcontinents: []
}

export default function rootReducer(state = initialState, action){
    switch (action.type) {
      case GET_ALL_COUNTRIES:
        return{
          ...state,
          countries: action.payload,
          countriesCopy: action.payload,
          Allcontinents: action.payload
        }
        case GET_DETAIL:
            return {
                ...state,
                countries: action.payload
            }
        case SEARCH_COUNTRY:
          return{
            ...state,
            countries: action.payload,
            countriesCopy: action.payload
            
          }
          case FILTER_BY_CONTINENT:
            console.log('estos son los paises',state.Allcontinents)
            console.log('payload',action)
            const countriess = state.Allcontinents;
            const continentFilter = action.payload === 'All Continents' ? countriess :
                countriess.filter(i => i.continents === action.payload)
                console.log('Estos son los paises filtrados', continentFilter)
                
            return {
                ...state,
                countries: continentFilter
            }
              case "POST_ACTIVITY":
              return{
                ...state
              }
              case ALPHABETICAL_SORT:
                const array = action.payload === "asc" ? state.countries.sort(function(a, b){
                  if(a.name > b.name){
                    return 1
                  }
                  if(b.name > a.name){

                    return -1
                  }
                  return 0
                }) :
                state.countries.sort(function(a, b){
                  if(a.name.toLowerCase() > b.name.toLowerCase()){
                    return -1
                  }
                  if(b.name.toLowerCase() > a.name.toLowerCase()){

                    return 1
                  }
                  return 0
                })

                return{
                  ...state,
                  countries: array
                }
                case POPULATION_SORT:
                  const sortedArr = action.payload === "down" ? state.countries.sort(function(a, b){
                    if(a.population > b.population){
                      return 1
                    }
                    if(b.population > a.population){
                      return -1
                    }
                    return 0
                  }) :
                  state.countries.sort(function(a, b){
                    if(a.population > b.population){
                      return -1
                    }
                    if(b.population > a.population){
                      return 1
                    }
                    return 0
                  })
                  return{
                    ...state,
                    countries: sortedArr
                  }
      default: return state;
    }
}