// See: https://yandex.ru/dev/maps/geocoder/doc/desc/reference/response_structure.html

export interface IYandexGeolocation {
  response: {
    GeoObjectCollection: {
      metaDataProperty: {
        GeocoderResponseMetaData: {
          request: string,
          found: number,
          results: number
        }
      },
      featureMember: {
        GeoObject: {
          metaDataProperty: {
            GeocoderMetaData: {
              kind: string,
              text: string,
              precision: string,
              Address: {
                country_code: string,
                postal_code: string,
                formatted: string,
                Components: {
                  kind: string,
                  name: string
                }[]
              },
              AddressDetails: {
                Country: {
                  AddressLine: string,
                  CountryNameCode: string,
                  CountryName: string,
                  AdministrativeArea: {
                    AdministrativeAreaName: string,
                    Locality: {
                      LocalityName: string,
                      Thoroughfare: {
                        ThoroughfareName: string,
                        Premise: {
                          PremiseNumber: number,
                          PostalCode: {
                            PostalCodeNumber: number
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          description: string,
          name: string,
          boundedBy: {
            Envelope: {
              lowerCorner: string,
              upperCorner: string
            }
          },
          Point: {
            pos: string
          }
        }
      }[]
    }
  }
}