export interface ButtonsData {
    name:                           string;
    url_symbol:                     string;
    base_decimals:                  number;
    counter_decimals:               number;
    instant_order_counter_decimals: number;
    minimum_order:                  string;
    trading:                        InstantAndMarketOrders;
    instant_and_market_orders:      InstantAndMarketOrders;
    description:                    string;
  }
  
  export enum InstantAndMarketOrders {
    Disabled = "Disabled",
    Enabled = "Enabled",
  }

  export interface NamedColorsType {[index: number]:{
    Keyword: string
    RGBHexValue: string
    '': string
  }}

  export interface worldPopulationData {
    '#': string
    'Country (or dependency)': string
    'Population(2020)': number
    YearlyChange: string
    NetChange: string
    'Density(P/Km²)': string
    'Land Area(Km²)': string
    'Migrants(net)': string
    'Fert.Rate': string
    'Med.Age': string
    'UrbanPop %': string
    WorldShare: string
  }