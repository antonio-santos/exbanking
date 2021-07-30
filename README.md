# exbanking
A simple NPM package banking application in Typescript language.

## Commands

To run, use:

```bash
npm start # or yarn start
```

This builds to `/dist` and runs the project in watch mode so any edits you save inside `src` causes a rebuild to `/dist`.

To do a one-off build, use:

```bash
npm run build # or yarn build
```

To run tests, use:

```bash
npm test # or yarn test
```

## Configuration

Code quality is set up with `prettier`, `husky`, and `lint-staged`. Adjust the respective fields in `package.json` accordingly.

### Jest

Jest tests are set up to run with `npm test` or `yarn test`.

### Bundle Analysis

[`size-limit`](https://github.com/ai/size-limit) is set up to calculate the real cost of the library with `npm run size` and visualize the bundle with `npm run analyze`.

## Continuous Integration

### GitHub Actions

Two actions are added by default:

- `main` which installs deps w/ cache, lints, tests, and builds on all pushes against a Node and OS matrix
- `size` which comments cost comparison of your library on every pull request using [`size-limit`](https://github.com/ai/size-limit)

## Publishing to NPM

We recommend using [np](https://github.com/sindresorhus/np).
