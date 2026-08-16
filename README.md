# Indian Motorcycle (GitHub Pages)

This project is deployed with GitHub Pages from the Vite production build output.

## Why the blank white screen happened

The Pages site was publishing repository source files (via default Jekyll Pages build) instead of the Vite `dist/` output, and the app assets were emitted with root-relative paths. On a project Pages URL (`/Indian-Motorcycle/`), that caused app script loading failures.

## Deployment setup

- Vite build base path is set to `/Indian-Motorcycle/` for production builds.
- GitHub Actions workflow builds the app with `npm ci && npm run build`.
- Workflow deploys `dist/` as the Pages artifact.

## Verify after merge

1. Push to `main` (or run the workflow manually).
2. Confirm `Deploy to GitHub Pages` workflow succeeds.
3. Open:
   - `https://hour-meng.github.io/Indian-Motorcycle/`
4. In browser DevTools Network tab, confirm JS/CSS files load from `/Indian-Motorcycle/assets/...`.
