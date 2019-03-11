.DEFAULT: help
.PHONY: dist test

export PATH := ./node_modules/.bin:$(PATH)

help:
	@echo Available targets:
	@echo
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

install:
	npm ci

clean:
	@echo "Removing dependencies"
	-@rm -Rf node_modules || true
	@echo "Removing built library"
	-@rm -Rf lib || true

build:
	@npm run build

publish: clean install build
	@npm run semantic-release
