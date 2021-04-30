# merge-package-json

Intelligently merge `package.json` files.
This is pretty much built for yeoman. It attempts to combine two separate `package.json` files into one, respecting as much existing content as possible including already existing dependencies and `package.json` formatting.

[![NPM](https://nodei.co/npm/@isaac.frontend/merge-package-json.png)](https://nodei.co/npm/@isaac.frontend/merge-package-json/)

[![npm version](https://badge.fury.io/js/%40isaac.frontend%2Fmerge-package-json.svg)](https://badge.fury.io/js/%40isaac.frontend%2Fmerge-package-json)
[![Open Source Love](https://badges.frapsoft.com/os/mit/mit.svg?v=102)](https://github.com/ellerbrock/open-source-badge/)

## Installation

Install this module through npm or clone it:

```javascript
npm install --save @isaac.frontend/merge-package-json
```

## Usage

```javascript
var merge = require("merge-package-json");
var dst = fs.readFileSync("package.a.json");
var src = fs.readFileSync("package.b.json");

// Create a new `package.json`
console.log(merge(dst, src));
```

```javascript
var merge = require("merge-package-json");
var dst = require("package.a.json");
var src = require("package.b.json");

// Create a new `package.json`
console.log(merge(dst, src));
```

```javascript
var merge = require("merge-package-json");
var src = require("package.b.json");
var dst = require("package.a.json");
var dst2 = require("package.b.json");

dst = merge(dst, src);
// Create a new `package.json`
console.log(dst);
console.log(merge(dst2, dst));
```

It allows you to do things like define scripts or dependencies that you would like to include as part of a larger project.

Merging:

```json
{
 "name": "my-package",
 "dependencies": {
  "babel": "^5.2.2",
  "lodash": "^3.2.5"
 }
}
```

```json
{
 "dependencies": {
  "babel": "^5.4.1",
  "eslint": "^0.22.1"
 }
}
```

OR

```json
{
 "dependencies": {
  "text-to-mp3": "^1.0.0"
 }
}
```

results in:

```json
{
 "name": "my-package",
 "dependencies": {
  "babel": "^5.4.1",
  "lodash": "^3.2.5",
  "eslint": "^0.22.1",
  "text-to-mp3": "^1.0.0"
 }
}
```

## TODO

- Add MODE of merge like :
- Get Lates
- Get Oldest
- Get Surest ( the less divergent from common used) [ need design ]

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## Credits

Author - Izaak Schroeder (@izaakschroeder)
Lead Developer - Enrico Aleandri (@enricoaleandri)
Contributor - Lucien Immink (@lucienimmink)

## License

The MIT License (MIT)

Copyright (c) 2017 Enrico Aleandri

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
