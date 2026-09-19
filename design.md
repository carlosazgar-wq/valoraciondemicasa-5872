# Design System — valoraciondemicasa.es

## Brand
- **Domain:** valoraciondemicasa.es
- **Propósito:** Captación de leads inmobiliarios en España. Estimación orientativa de valor de vivienda.
- **Audiencia:** Propietarios que quieren saber cuánto vale su casa y/o venderla.

## Color Palette
```css
--color-bg:        #0a0f1e   /* Fondo principal marino muy oscuro */
--color-surface:   #111827   /* Tarjetas, formularios */
--color-border:    #1f2937   /* Bordes sutiles */
--color-accent:    #10b981   /* Esmeralda — CTAs, acentos, progreso */
--color-accent-2:  #059669   /* Esmeralda oscuro hover */
--color-text:      #ffffff   /* Texto principal */
--color-muted:     #9ca3af   /* Texto secundario */
--color-gradient:  linear-gradient(135deg, #0a0f1e 0%, #0d2a1f 50%, #0a1628 100%)
```

## Typography
- **Display/Hero:** Poppins 800 (ExtraBold) — titulares, CTAs
- **Body:** Poppins 400/500 — texto normal
- **Numbers/Stats:** Poppins 700 — estimaciones, rangos
- **Size scale:** 64px hero → 40px h1 → 28px h2 → 18px body → 14px small

## Logo
- Icono geométrico: casa simplificada + línea de tendencia al alza
- Color: blanco sobre gradiente esmeralda→marino
- Texto: "valoraciondemicasa.es" — Poppins ExtraBold, blanco

## Layout
- **Max width:** 1200px centrado
- **Hero:** Pantalla completa, foto vivienda moderna blur+overlay oscuro, texto centrado
- **Formulario:** Tarjeta flotante oscura, sombra esmeralda sutil, 5 pasos con barra progreso
- **Resultado:** Tarjeta grande con estimación en esmeralda, gráfico, calculadora
- Secciones separadas por gradientes suaves

## Components
### Barra de Progreso (Formulario)
- 5 pasos numerados, paso activo en esmeralda
- Transición suave entre pasos

### Tarjetas
- Background: `#111827` con borde `#1f2937`
- Sombra: `0 20px 60px rgba(16,185,129,0.1)`
- Bordes redondeados: 16px

### Botones CTA
- Background: `#10b981` → hover `#059669`
- Texto blanco ExtraBold
- Border-radius: 12px
- Padding: 16px 32px

## Animaciones
- Hero: fade+slide-up en carga (CSS)
- Pasos formulario: slide lateral suave
- Resultado: contador animado del precio
- Scroll reveal suave en secciones

## Páginas
1. `/` — Landing con hero + form multi-paso
2. `/resultado` — Estimación, gráfico, hipoteca, CTA final
3. `/admin` — Panel leads (tabla, filtros, exportar CSV)
