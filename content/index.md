# Swot 🍎
### 🚨 If you would like to add your school/educational institution, please create a pull request in [this repository](https://github.com/magicmarvman/swot-data). 🚨

If you have a product or service and offer **academic discounts**, there's a good chance there's some manual component to the approval process. Perhaps `.edu` email addresses are automatically approved because, for the most part at least, they're associated with American post-secondary educational institutions. Perhaps `.ac.uk` email addresses are automatically approved because they're guaranteed to belong to British universities and colleges. Unfortunately, not every country has an education-specific TLD (Top Level Domain) and plenty of schools use `.com` or `.net`.

Swot is a community-driven or crowdsourced library for verifying that domain names and email addresses are tied to a legitimate university of college - more specifically, an academic institution providing higher education in tertiary, quaternary or any other kind of post-secondary education in any country in the world.

If you would like to add your school/educational institution, please create a pull request in [this repository](https://github.com/magicmarvman/swot-data).

### Installation

Add `swot-node` like other NPM packages, simply run:

`yarn add swot-node`

or

`npm install swot-node`

### Usage

#### Verify Email Addresses

```javascript
const swot = require("swot-node")

swot.isAcademic('lreilly@stanford.edu')           // true
swot.isAcademic('lreilly@strath.ac.uk')           // true
swot.isAcademic('lreilly@soft-eng.strath.ac.uk')  // true
swot.isAcademic('pedro@ugr.es')                   // true
swot.isAcademic('lee@uottawa.ca')                 // true
swot.isAcademic('lee@leerilly.net')               // false
```

#### Verify Domain Names

```javascript
const swot = require("swot-node")

swot.isAcademic('harvard.edu')              // true
swot.isAcademic('www.harvard.edu')          // true
swot.isAcademic('http://www.harvard.edu')   // true
swot.isAcademic('http://www.github.com')    // false
swot.isAcademic('http://www.rangers.co.uk') // false
```

#### Find School Names

```javascript
const swot = require("swot-node")

swot.getSchoolName('lreilly@cs.strath.ac.uk')
// => "University of Strathclyde"

swot.getSchoolName('http://www.stanford.edu')
// => "Stanford University"

swot.getSchoolName('https://www.github.com')
// => false

swot.getSchoolName('QaPk59GZ9Zv8.edu')
// => true
```

### License
**The MIT License (MIT)**

Copyright (c) 2021 Marvin Schopf <br>
Copyright (c) 2013 Lee Reilly

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

### See Also

* [swot](https://github.com/leereilly/swot) - original ruby version of swot
* [gman](https://github.com/benbalter/gman) - like swot, but for government emails
* [swotphp](https://github.com/mdwheele/swotphp) - PHP port of Swot
* [swot-simple](https://github.com/mapbox/swot-simple) - JS port of Swot
* [swot-clj](https://github.com/ipavl/swot-clj) - Clojure port of Swot
* [swot](https://github.com/abadojack/swot) - Go port of Swot

