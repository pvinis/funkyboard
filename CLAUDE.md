# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React Native & Expo app built with modern tooling and the New Architecture. The project is based on the nkzw-tech/expo-app-template with Expo 54, React Native 0.81, and React 19.

## Development Commands

### Package Management & Development

```bash
# Install dependencies and setup
pnpm install && pnpm dev:setup

# Start development server
pnpm dev

# Start with dev client
pnpm start

# Build for platforms
pnpm prebuild
pnpm ios
pnpm android
pnpm web
```

### Code Quality & Testing

```bash
# Type checking
pnpm tsc:check

# Linting
pnpm lint
pnpm lint:format

# Testing
pnpm test                # Runs all tests, type checking, and linting
pnpm vitest:run         # Run tests only

# Formatting
pnpm format
```

### Internationalization

```bash
# Setup i18n (run after changes to fbt strings)
pnpm dev:setup
```

## Architecture & Code Organization

### Directory Structure

- `src/app/` - Expo Router file-based routing with app directory
  - `(app)/(tabs)/` - Tab-based navigation screens
  - `_layout.tsx` - Root layout with providers
  - `login.tsx` - Authentication screen
- `src/ui/` - Custom UI components (Text, BottomSheetModal, colors)
- `src/user/` - User context and authentication logic
- `src/lib/` - Utility functions (cx for classnames)
- `src/translations/` - i18n translation files
- `src/tests/` - Test files

### Key Technologies & Patterns

1. **Routing**: Expo Router with file-based routing and typed routes
2. **Styling**: NativeWind (Tailwind CSS for React Native) with custom color system
3. **State Management**: React Context with custom hooks (useViewerContext)
4. **Storage**: MMKV for local storage and user settings
5. **UI Components**: Custom UI components in `src/ui/` that wrap native components
6. **Navigation**: Tab-based navigation with nested stack navigation

### Important Code Patterns

1. **Custom UI Components**: Use components from `src/ui/` instead of React Native primitives
   - Use `src/ui/Text.tsx` instead of `react-native/Text`
   - Use custom BottomSheetModal wrapper

2. **Color System**: Colors are defined in `src/ui/colors.ts` and used via Tailwind CSS variables

3. **Context Pattern**: ViewerContext provides user authentication and local settings management

4. **i18n Pattern**: Use `fbt` for all user-facing strings, with `fbs` for simple strings

5. **Styling**: Use NativeWind classes with platform-specific modifiers (`android:`, `ios:`)

## Configuration

- **TypeScript**: Strict mode with nodenext module resolution
- **Expo**: New Architecture enabled with React Canary and React Compiler experiments
- **Testing**: Vitest with React Native support

## Development Notes

- Uses pnpm as package manager
- ESM-only project (`"type": "module"`)
- React Compiler enabled for optimization
- New Architecture (Fabric/TurboModules) enabled
- Custom git hooks configured in `git-hooks/`
