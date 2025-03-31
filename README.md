# Example App

This is an example project made with [NubeSDK](https://dev.tiendanube.com/docs/applications/nube-sdk/overview).

This app prevents the user to proced in the checkout until they check "I am over 18 years old".

Include unit tests for all features.

## Features used

- Custom checkout validation
- Store language detection
- User Interface in JSX

## Available Scripts

### Development

- `npm run dev` - Starts local development server
- `npm run build` - Builds the project using tsup
- `npm test` - Runs unit tests
- `npm run test:watch` - Runs tests in watch mode (automatically re-runs when changes are detected)
- `npm run test:coverage` - Runs tests and generates a coverage report

### Code Quality

- `npm run format` - Formats all project files using Biome
- `npm run lint` - Runs linting on all project files using Biome

## Technologies Used

- [TypeScript](https://www.typescriptlang.org/)
- [Vitest](https://vitest.dev/) for testing
- [Biome](https://biomejs.dev/) for formatting and linting
- [tsup](https://tsup.egoist.dev/) for building