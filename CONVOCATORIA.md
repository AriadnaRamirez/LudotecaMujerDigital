# Lista de entrega — Ludoteca Mujer Digital

Esta guía adapta el sitio a la convocatoria **Ludoteca Mujer Digital: Un Legado Colectivo**. No sustituye la lectura del PDF oficial.

Para las participantes:

1. [`COMO-ENVIAR-TU-JSON.md`](./COMO-ENVIAR-TU-JSON.md) — paso a paso para armar y enviar la aportación.
2. [`GUIA-ESQUEMA-JSON.md`](./GUIA-ESQUEMA-JSON.md) — contrato completo de restricciones (como un backend).

## Una aportación por participante

Cada objeto de `src/data/resources.json` representa una aportación. Usa `src/data/resource-template.json` y verifica que:

1. Cada participante registrada tenga exactamente un objeto.
2. `contributorName` contenga su nombre completo y visible.
3. No haya dos objetos con el mismo `contributorName`.
4. El número de objetos coincida con el número de integrantes activas.
5. Cada entrada cumpla el esquema de `src/data/resource-schema.json`.

Puedes comprobar el conteo esperado así:

```bash
EXPECTED_PARTICIPANTS=25 npm run validate:data
```

Sustituye `25` por el total real de participantes del equipo.

## Campos obligatorios

Cada participante debe completar personalmente:

- `title`: nombre oficial del recurso.
- `url`: enlace web HTTPS directo y funcional.
- `image`: URL HTTPS pública de la imagen (no base64 ni archivo local).
- `contributorName`: nombre completo de quien lo comparte.
- `discoveryContext`: cómo descubrió el recurso.
- `impactReflection`: cómo contribuyó —o habría contribuido— a su desarrollo personal o profesional.
- `recommendationReason`: por qué lo recomienda a otra participante de Mujer Digital.

Los demás campos ayudan a organizar, buscar y filtrar la ludoteca.

La convocatoria pide textos auténticos escritos por cada participante, sin usar IA generativa para buscar recursos, redactar descripciones o simular recomendaciones.

## Formatos y áreas sugeridos por la convocatoria

Formatos:

- Libros
- Podcasts
- Canales de YouTube
- Cursos, de preferencia gratuitos
- Comunidades de práctica
- Blogs especializados
- Herramientas digitales
- Aplicaciones
- Plantillas de trabajo

Áreas de impacto:

- Organización y técnicas de estudio
- Bienestar emocional
- Finanzas personales
- Aprendizaje de idiomas
- Creatividad y diseño gráfico
- Productividad
- Habilidades de comunicación
- Tecnología avanzada
- Desarrollo de hábitos
- Otros recursos con impacto real

## Matriz de evaluación

| Criterio | Peso | Revisión antes de entregar |
| --- | ---: | --- |
| Participación del grupo | 35% | Una aportación por integrante y nombre completo visible |
| Calidad y utilidad | 30% | Valor práctico, relevancia y aplicabilidad real |
| Diversidad de la ludoteca | 15% | Variedad de formatos y temáticas |
| Organización y presentación | 10% | Navegación, orden visual y accesibilidad |
| Reflexión y justificación | 10% | Respuestas profundas, honestas y claras |

## Revisión final (equipo de revisión)

- Ejecutar `npm run validate:data` hasta que termine correctamente.
- Abrir **cada enlace** e **imagen** en una ventana privada y confirmar que funcionan.
- Confirmar con cada autora que sus respuestas son auténticas y propias.
- Revisar nombres, ortografía y datos sensibles.
- Probar búsqueda, filtros, tarjetas y detalles en computadora y celular.
- Publicar el sitio en una URL estable con acceso público.
- Probar enlaces directos a `/recurso/:id` después del despliegue.
- Entregar el enlace por medio del **equipo de revisión** antes del **lunes 10 de agosto a las 12:00 p. m.**
