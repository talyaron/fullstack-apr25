Thank you for wanting to contribute!

Please follow these simple guidelines so we can review and merge your changes quickly.

1. Fork the repository and create a feature branch:

```bash
git checkout -b feature/short-description
```

2. Follow the project's coding style:
- JavaScript: follow existing patterns (ESModules, React hooks).
- CSS: keep styles in `src/*.css` files.

3. Add tests for new features where appropriate.

4. Commit messages:
- Use clear, short messages. Example: `feat: add login form` or `fix: correct date input behavior`.

5. Open a Pull Request against `main` with a concise description of what you changed and why.

6. CI & Linting:
- The project includes a lightweight CI workflow that builds the client. Ensure `npm run build` succeeds locally before opening a PR.

7. Security & secrets:
- Never commit secrets or `.env` files. Use the `.env.example` as a template.

If you're unsure about where to start, open an issue and tag it with `good-first-issue` and we can help.
