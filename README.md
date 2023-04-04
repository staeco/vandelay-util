<p align='center'>
  <img src='https://user-images.githubusercontent.com/425716/40067683-bddc82ee-5834-11e8-8dc9-8b6ad5d149f5.png' width='400'/>
  <p align='center'>Grab bag of utilities for vandelay transform functions.</p>
</p>

# vandelay-util [![NPM version][npm-image]][npm-url] [![Downloads][downloads-image]][npm-url] [![Build Status][travis-image]][travis-url]


## Install

```
npm install vandelay-util --save
```

## Utilities

Utility functions will return undefined when given null or invalid values when appropriate.

For example:

```js
const row = {
  name: 'pear'
}

util.capitalize(row.notes) // undefined
util.convert(row.speed).from('m/h').to('km/h') // undefined
```

#### util.guid(...values)

Stringifies all provided values and turns them into a deterministic GUID. Null values are ignored.

```js
util.guid('Michael Scott', 'Birthday', null, 1993) // f8e61be1-0b1c-4e4f-81b6-050ae9b8a049
```

#### util.slug(...values)

Stringifies all provided values and turns them into a lowercase slug. Null values are ignored.

**Note:** This function will remove many characters, including non-english characters. Use with caution if you are using this for a unique ID.

```js
util.slug('Michael Scott', 'Birthday', null, 1993) // michael-scott-birthday-1993
```

#### util.normalize(value)

Trims, lowercases, and removes redundant whitespace from the given value.

```js
util.normalize('\t  HEY  \n THANKS') // hey thanks
```

#### util.capitalize(value)

Capitalizes the first word in the given value.

#### util.capitalize.words(value)

Capitalizes every word in the given value.

#### util.camelize(value)

Camelcases the given value.

#### util.decamelize(value)

Converts camelcase to non-camelcase - separated by spaces.

#### util.phone(value[, country])

Normalizes any phone number in the world. Country is any three letter country code, defaulting to `'USA'`. If the number includes a country code, you do not need to provide a `country` argument.

```js
util.phone(' 123 ') // undefined
util.phone(123) // undefined

// USA numbers
util.phone('4805335949') // +14805335949
util.phone('(480) 533-5949') // +14805335949
util.phone('480-533-5949') // +14805335949
util.phone(4805335949) // +14805335949

// Hong Kong numbers
util.phone('6123-6123') // undefined
util.phone('6123-6123', 'HKG') // +85261236123
util.phone('+852 6123-6123') // +85261236123
})
```

#### util.convert(value)

Exposes convert-units, with additional handling of null and invalid values. For a full list of convertible units, see [this page](https://github.com/ben-ng/convert-units#supported-units).

```js
util.convert(null).from('m/h').to('km/h') // undefined
util.convert('1').from('F').to('C') // -17.22222222222222
util.convert(1).from('mi').to('km') // 1.6093439485009937
```

#### util.moment(value)

Exposes moment + moment-timezone, with additional handling of null and invalid values. For a full list of time zones, see [this page](https://momentjs.com/timezone/).

```js
util.moment(null) // undefined
util.moment('12/27/1993') // moment object
util.moment.tz('12/27/1993', 'America/New_York') // moment object
```

#### util.memo(function)

Exposes memoization helpers, with additional handling of null and invalid values. For a full usage guide, see [this page](https://github.com/planttheidea/moize#usage).

```js
// Fetch a request only once
const getLocationData = util.memo.promise(async () =>
  util.request.get('http://google.com/fetch-only-once.json')
)

// Cache synchronous computation
const getTotal = util.memo((data) => {
  return data
    .map((i) => i.count)
    .reduce((prev, curr) =>
      prev + curr
    , 0)
})
```

#### util.date(value, timezone)

Wrapper around moment.js `moment.tz(date, timezone)` that handles null and invalid values. Search timezones [here](https://momentjs.com/timezone/).

```js
util.date('abc', 'America/New_York') // undefined
util.date(null, 'America/Los_Angeles') // undefined
util.date('12/27/1993', 'America/New_York') // 1993-12-27T05:00:00.000Z
```

#### util.number(value)

Wrapper around number parsing that handles null and invalid values.

```js
util.number('$100.56') // 100.56
util.number(100.56) // 100.56
util.number('costs $100.56') // 100.56
util.number('it is -100.56') // -100.56
```

#### util.geo.isSea(value)

Returns true if the coordinate is in the sea. Value can be either `[ lon, lat ]` or a GeoJSON Point.

```js
util.geo.isSea([ 0, 0 ]) // true
```

#### util.geo.tz(point)

Returns the timezone for a given point. Value returned can be used as the timezone for `util.date`. Value can be either `[ lon, lat ]` or a GeoJSON Point.

```js
util.geo.tz([ -118.250587 , 34.031179 ]) // America/Los_Angeles

util.geo.tz({
  type: 'Point',
  coordinates: [ 121.456424, 31.224417 ]
}) // Asia/Shanghai
```

#### util.geo.reproject(geojson[, sourceProjection])

Parses GeoJSON and reprojects it into WGS84. If the GeoJSON has a `crs` attribute it will auto-detect it, otherwise you can specify it as the second argument.

```js
// Auto-detection based on the input data
util.geo.reproject({
  type: 'Point',
  crs: {
    type: 'name',
    properties: {
      name: 'EPSG:3006'
    }
  },
  coordinates: [
    319180,
    6399862
  ]
}) // { type: 'Point', coordinates: [ 11.965261850066433, 57.704505637111694 ] }


// Manually specifying it, any EPSG code or URN is acceptable
util.geo.reproject({
  type: 'Point',
  coordinates: [
    319180,
    6399862
  ]
}, 'EPSG:3006') // { type: 'Point', coordinates: [ 11.965261850066433, 57.704505637111694 ] }
```

#### util.geo.multi(value)

Converts any given GeoJSON geometry to a `Multi` version. Values that are already a `Multi` geometry will be returned with no modifications.

```js
util.geo.multi({
  type: 'Polygon',
  coordinates: [
    [ [ 100.0, 0.0 ], [ 101.0, 0.0 ], [ 101.0, 1.0 ], [ 100.0, 1.0 ], [ 100.0, 0.0 ] ],
    [ [ 100.2, 0.2 ], [ 100.8, 0.2 ], [ 100.8, 0.8 ], [ 100.2, 0.8 ], [ 100.2, 0.2 ] ]
  ]
})
```

#### util.geo.simplify(value)

Simplifies any given GeoJSON geometry to the precision of a meter. Values that do not need simplification will be returned with no modifications.

```js
util.geo.simplify({
  type: 'Polygon',
  coordinates: [
    [ [ 100.0, 0.0 ], [ 101.0, 0.0 ], [ 101.0, 1.0 ], [ 100.0, 1.0 ], [ 100.0, 0.0 ] ],
    [ [ 100.2, 0.2 ], [ 100.8, 0.2 ], [ 100.8, 0.8 ], [ 100.2, 0.8 ], [ 100.2, 0.2 ] ]
  ]
})
```

#### util.geo.wk2JSON(value)

Converts Well-Known-Text to GeoJSON - supports WKT/WKB/EWKT/EWKB/TWKB.

```js
util.geo.wk2JSON('POINT(1 2)') // { type: 'Point', coordinates: [1, 2] }
```

#### util.geo.intersection({ intersection, city, region, country, sources })

Returns a geopoint for an intersection. For example:

```js
util.geo.intersection({
  intersection: '12th Ave./Hammond St.',
  city: 'Lost Wages',
  region: 'NV',
  country: 'USA'
})

util.geo.intersection({
  intersection: '24th Ave., Avery St.',
  city: 'Lost Wages',
  region: 'NV',
  country: 'USA'
})
```

#### util.geo.locate({ address, city, region, postalCode, country, minConfidence, filter, sources, layers })
#### util.geo.search({ text, minConfidence, filter, sources, layers })
#### util.geo.snap({ type, path, optional, sources })
#### util.geo.navigate({ type, start, end, optional, sources })

#### util.geo.turf

Exposes [turf](http://turfjs.org/) with no modifications.

#### util._

Exposes [lodash](https://lodash.com/) with no modifications.

#### util.validator

Exposes [validator](https://github.com/chriso/validator.js#validators) with no modifications.

#### util.request

Exposes [superagent](https://visionmedia.github.io/superagent/) with no modifications.

#### util.sdk

Exposes [stae js-sdk](https://github.com/staeco-js-sdk) with no modifications.

[downloads-image]: http://img.shields.io/npm/dm/vandelay-util.svg
[npm-url]: https://npmjs.org/package/vandelay-util
[npm-image]: http://img.shields.io/npm/v/vandelay-util.svg

[travis-url]: https://travis-ci.org/staeco/vandelay-util
[travis-image]: https://travis-ci.org/staeco/vandelay-util.png?branch=master
