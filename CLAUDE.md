# CLAUDE.md · Demo de Kahwa Café

Web demo de Kahwa Café (Montréal), creada con el comando `/cafe` a partir de la plantilla de cafeterías. Repositorio: https://github.com/alesstron/demo-cafe

- **Datos**: `src/data/cafe.config.ts`. Fuentes y pendientes en `docs/INFO-EXTRAIDA.md`.
- **Piel**: `src/estilo/`, propia de Kahwa ("La devanture"). Ficha de estilo en `docs/DISEÑO.md`: cualquier cambio visual la sigue.
- **Motor**: `src/motor/`, `src/app/` y `next.config.js` vienen de la plantilla. Si hace falta cambiar el motor, se cambia en la plantilla y se copia a las demos.
- Gama actual: premium, con `reserva: false` (local con pocas mesas). Para enseñar otra gama basta con cambiar `gama`.
- Es una maqueta: `demo: true` (aviso visible y `noindex`). WhatsApp y algunos precios están por confirmar con el dueño.

## Convenciones
- **Comentarios bilingües**: todo comentario va en español (`ES:`) y en inglés (`EN:`). Cada archivo empieza con su nivel: `[EDITABLE]`, `[CON CUIDADO · EDIT WITH CARE]` o `[NO TOCAR · DO NOT EDIT]` (leyenda en el README).
- Identificadores en español. Mobile-first, cero scroll horizontal a 360 px.
- README en español (`README.md`) e inglés (`README.en.md`): mantener los dos iguales.
- `npx tsc --noEmit` antes de dar algo por terminado.

```bash
npm run dev    # http://localhost:3000
npm run build
```
