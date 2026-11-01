# Orbit Dashboard (React + plain CSS)

```bash
npm install
npm run dev     # http://localhost:5173
npm run build
```

Stack: Vite, React 19, plain CSS.

All styling lives in `src/index.css` (design tokens, a small reset, then one
section per component). Components only reference class names such as
`.panel`, `.btn--sm` or `.task-item--selected`.
