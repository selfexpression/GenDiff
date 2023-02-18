# Makefile
install:
	npm ci
test:
	npm test
gendiff:
		node bin/gendiff.js
publish:
	npm publish --dry-run
lint:
	npx eslint .
test-coverage:
	npm test -- --coverage --coverageProvider=v8
