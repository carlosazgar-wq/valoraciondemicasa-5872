# Task: valoraciondemicasa.es

## Status
- [x] app_init
- [x] design.md
- [x] hero-bg.png generated
- [x] schema.ts (leads table)
- [x] api/index.ts (CRUD leads)
- [x] styles.css (dark theme, Poppins)
- [x] Logo.tsx
- [x] valoracion.ts (price calculator)
- [x] FormularioMultiPaso.tsx (5 steps, OSM map)
- [x] app.tsx (routes: /, /resultado, /admin)

## TODO
- [ ] pages/index.tsx (hero + form)
- [ ] pages/resultado.tsx (estimation + chart + mortgage)
- [ ] pages/admin.tsx (leads panel)
- [ ] install leaflet
- [ ] install recharts
- [ ] db:push
- [ ] bun run dev
- [ ] bun run build

## Key decisions
- OSM Nominatim for address autocomplete (free, no API key)
- Leaflet for map
- Recharts for price chart
- Price calculator: precios/m2 by CP, multipliers for type/state/floor/extras
- RGPD: checkbox pre-checked, cesión a inmobiliaria mejor valorada
