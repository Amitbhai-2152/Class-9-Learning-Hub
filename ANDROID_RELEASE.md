# Android release (Phase 3)

The repository now has a separate signed-release workflow at `.github/workflows/android-release.yml`.

## What is automated

1. Builds the existing Vite app.
2. Creates the Capacitor Android project.
3. Syncs the web assets.
4. Restores the private upload keystore from a GitHub Actions secret.
5. Configures the Android release signing settings.
6. Applies the requested `versionName` and `versionCode`.
7. Produces a signed release `.aab`.
8. Uploads the AAB as a GitHub Actions artifact.
9. Removes the temporary keystore from the runner.

The keystore itself is **not committed to Git**.

## One-time setup required

An adult who owns/manages the release credentials should create or obtain the Android upload keystore and add these repository Actions secrets:

- `ANDROID_KEYSTORE_BASE64` — base64-encoded `.jks` upload keystore
- `ANDROID_KEYSTORE_PASSWORD` — keystore password
- `ANDROID_KEY_ALIAS` — upload key alias
- `ANDROID_KEY_PASSWORD` — upload key password

The existing Supabase build secrets remain:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_PUBLISHABLE_KEY`

Never commit the `.jks` file or its passwords to the repository.

## Release workflow

GitHub → Actions → **Release Learning Hub Android App** → Run workflow.

Enter a new `version_name` and an incremented `version_code` for each release.

Example:

- version name: `1.0.0`
- version code: `1`

Later release:

- version name: `1.0.1`
- version code: `2`

The workflow artifact is the signed Play-compatible AAB. Play Console submission, store listing, testing tracks, and policy declarations remain account-owner actions.

## Important account requirement

Google currently requires a person to be at least 18 to register as a Google Play developer. If the developer account owner is under 18, an eligible adult must handle the Play Console account and verification rather than bypassing the age requirement.
