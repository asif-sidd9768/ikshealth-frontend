export interface Country {
  name:      string;
  isoCode:   string;
  flag:      string;
  phonecode: string;
  currency:  string;
  latitude:  string;
  longitude: string;
  timezones: Timezone[];
}

export interface Timezone {
  zoneName:      string;
  gmtOffset:     number;
  gmtOffsetName: string;
  abbreviation:  string;
  tzName:        string;
}

export interface State {
  name:        string;
  isoCode:     string;
  countryCode: string;
  latitude:    string;
  longitude:   string;
}

export interface City {
  name:        string;
  countryCode: string;
  stateCode:   string;
  latitude:    string;
  longitude:   string;
}
