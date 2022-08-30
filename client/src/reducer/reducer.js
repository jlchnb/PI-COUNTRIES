import{
    GET_ALL_COUNTRIES,
    SEARCH_COUNTRY,
    FILTER_BY_CONTINENT
} from '../actions/actions.js'

const initialState = {
    countries: [],
    countriesCopy: [],
    searchCountry: [],
}

export default function rootReducer(state = initialState, action){
    switch (action.type) {
      case GET_ALL_COUNTRIES:
        return{
          ...state,
          countries: action.payload,
          countriesCopy: action.payload
        }
        case SEARCH_COUNTRY:
          return{
            ...state,
            countries: action.payload,
            countriesCopy: action.payload
          }
          case FILTER_BY_CONTINENT:
            const allCountries = state.countries
            const statusFiltered = action.payload === 'All' ? allCountries : allCountries.filter(el => el.status === action.payload)
            return{
              ...state,
              countries: statusFiltered,
              countriesCopy: statusFiltered
            }
      default: return state;
    }
}