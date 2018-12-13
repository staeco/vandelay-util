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

#### util.date(value, timezone)

Wrapper around moment.js `moment.tz(date, timezone)` that handles null and invalid values. Search timezones [here](https://momentjs.com/timezone/).

```js
util.date('abc', 'America/New_York') // undefined
util.date(null, 'America/Los_Angeles') // undefined
util.date('12/27/1993', 'America/New_York') // 1993-12-27T05:00:00.000Z
```

### util.number(value)

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

#### util.geo.wk2JSON(value)

Converts Well-Known-Text to GeoJSON - supports WKT/WKB/EWKT/EWKB/TWKB.

```js
util.geo.wk2JSON('POINT(1 2)') // { type: 'Point', coordinates: [1, 2] }
```

#### util.geo.locate({ address, city, region, country })
#### util.geo.search({ text })
#### util.geo.snap({ type, path, optional })
#### util.geo.navigate({ type, start, end, optional })

#### util.geo.turf

Exposes [turf](http://turfjs.org/) with no modifications.

#### util._

Exposes [lodash](https://lodash.com/) with no modifications.

#### util.validator

Exposes [validator](https://github.com/chriso/validator.js#validators) with no modifications.

#### util.request

Exposes [superagent](https://visionmedia.github.io/superagent/) with no modifications.

[downloads-image]: http://img.shields.io/npm/dm/vandelay-util.svg
[npm-url]: https://npmjs.org/package/vandelay-util
[npm-image]: http://img.shields.io/npm/v/vandelay-util.svg

[travis-url]: https://travis-ci.org/contra/vandelay-util
[travis-image]: https://travis-ci.org/contra/vandelay-util.png?branch=master
