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