### Hexlet tests and linter status:
[![Actions Status](https://github.com/selfexpression/frontend-project-46/workflows/hexlet-check/badge.svg)](https://github.com/selfexpression/frontend-project-46/actions) 
[![Maintainability](https://api.codeclimate.com/v1/badges/d0c97277dc304948a7bf/maintainability)](https://codeclimate.com/github/selfexpression/frontend-project-46/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/d0c97277dc304948a7bf/test_coverage)](https://codeclimate.com/github/selfexpression/frontend-project-46/test_coverage)
[![CI Status](https://github.com/selfexpression/frontend-project-46/actions/workflows/gendiff.yml/badge.svg)](https://github.com/selfexpression/frontend-project-46/actions/workflows/gendiff.yml)

## GenDiff

**GenDiff - cli-app that compares two configuration files and shows a difference in one of three formats (stylish, plain, json).**

### Install

```bash
git clone https://github.com/SuperSnowSnail/frontend-project-46.git
cd frontend-project-46
make install
npm link # (You may need sudo)
```

### Help

Run GenDiff with option **-h** or **--help** to see help information:

```bash
gendiff -h
```

##### Demo:

[![asciicast](https://asciinema.org/a/562947.svg)](https://asciinema.org/a/562947)

### Supported files

GenDiff supports JSON (**.json**) and YAML (both **.yml** and **.yaml**) files.

##### Demo:

[![asciicast](https://asciinema.org/a/562948.svg)](https://asciinema.org/a/562948)

### Formats

You can choose one of three output formats with option **-f** or **--format**, e.g.:

```bash
gendiff -f plain <filepath1> <filepath2>
```

#### Stylish (Default)

(By default GenDiff generates differences in stylish format)

```bash
gendiff path/to/file1.json path/to/file2.json
```

```bash
gendiff -f stylish path/to/file1.yaml path/to/file2.yml
```

##### Output example:

```
{
    common: {
      + follow: false
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: null
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
        setting6: {
            doge: {
              - wow:
              + wow: so much
            }
            key: value
          + ops: vops
        }
    }
    group1: {
      - baz: bas
      + baz: bars
        foo: bar
      - nest: {
            key: value
        }
      + nest: str
    }
  - group2: {
        abc: 12345
        deep: {
            id: 45
        }
    }
  + group3: {
        deep: {
            id: {
                number: 45
            }
        }
        fee: 100500
    }
}
```

##### Demo:

[![asciicast](https://asciinema.org/a/562951.svg)](https://asciinema.org/a/562951)

#### Plain

```bash
gendiff -f plain path/to/file1.json path/to/file2.yml
```

##### Output example:

```
Property 'common.follow' was added with value: false
Property 'common.setting2' was removed
Property 'common.setting3' was updated. From true to null
Property 'common.setting4' was added with value: 'blah blah'
Property 'common.setting5' was added with value: [complex value]
Property 'common.setting6.doge.wow' was updated. From '' to 'so much'
Property 'common.setting6.ops' was added with value: 'vops'
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group1.nest' was updated. From [complex value] to 'str'
Property 'group2' was removed
Property 'group3' was added with value: [complex value]
```

##### Demo:

[![asciicast](https://asciinema.org/a/562953.svg)](https://asciinema.org/a/562953)


#### JSON

```bash
gendiff -f json path/to/file1.yml path/to/file2.yml
```

##### Output example:

```
[{"key":"common","type":"nested","children":[{"key":"follow","type":"added","value":false},{"key":"setting1","type":"unchanged","value":"Value 1"},{"key":"setting2","type":"removed","value":200},{"key":"setting3","type":"updated","from":true,"to":null},{"key":"setting4","type":"added","value":"blah blah"},{"key":"setting5","type":"added","value":{"key5":"value5"}},{"key":"setting6","type":"nested","children":[{"key":"doge","type":"nested","children":[{"key":"wow","type":"updated","from":"","to":"so much"}]},{"key":"key","type":"unchanged","value":"value"},{"key":"ops","type":"added","value":"vops"}]}]},{"key":"group1","type":"nested","children":[{"key":"baz","type":"updated","from":"bas","to":"bars"},{"key":"foo","type":"unchanged","value":"bar"},{"key":"nest","type":"updated","from":{"key":"value"},"to":"str"}]},{"key":"group2","type":"removed","value":{"abc":12345,"deep":{"id":45}}},{"key":"group3","type":"added","value":{"deep":{"id":{"number":45}},"fee":100500}}]
```

##### Demo:

[![asciicast](https://asciinema.org/a/562954.svg)](https://asciinema.org/a/562954)