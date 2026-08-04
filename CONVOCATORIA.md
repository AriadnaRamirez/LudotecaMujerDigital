# Lista de entrega — Ludoteca Mujer Digital

Esta guía adapta el sitio a la convocatoria **Ludoteca Mujer Digital: Un Legado Colectivo**. No sustituye la lectura del PDF oficial.

## Bloqueo actual

`src/data/resources.json` contiene datos de demostración. Sus 79 enlaces apuntan a `example.com` y no incluye las respuestas personales ni el nombre de la participante que comparte cada recurso. **No debe entregarse así.**

La convocatoria prohíbe usar IA generativa para buscar recursos, redactar descripciones, simular recomendaciones o generar material audiovisual. Por esta razón, esos campos se dejaron pendientes y deben completarlos las participantes con sus propias palabras.

## Una aportación por participante

Cada objeto de `src/data/resources.json` representa una aportación. Usa `src/data/resource-template.json` como estructura y verifica que:

1. Cada participante registrada tenga exactamente un objeto.
2. `contributorName` contenga su nombre completo y visible.
3. No haya dos objetos con el mismo `contributorName`.
4. El número de objetos coincida con el número de integrantes activas.

Puedes comprobar el conteo esperado así:

```bash
EXPECTED_PARTICIPANTS=25 npm run validate:data
```

Sustituye `25` por el total real de participantes del equipo.

## Campos obligatorios

Cada participante debe completar personalmente:

- `title`: nombre oficial del recurso.
- `url`: enlace web directo y funcional.
- `contributorName`: nombre completo de quien lo comparte.
- `discoveryContext`: cómo descubrió el recurso.
- `impactReflection`: cómo contribuyó —o habría contribuido— a su desarrollo personal o profesional.
- `recommendationReason`: por qué lo recomienda a otra participante de Mujer Digital.

Los demás campos ayudan a organizar, buscar y filtrar la ludoteca.

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

## Revisión final manual

- Ejecutar `npm run validate:data` hasta que termine correctamente.
- Abrir **cada enlace** en una ventana privada y confirmar que funciona sin permisos especiales.
- Leer cada respuesta y confirmar con su autora que es auténtica, propia y no fue generada por IA.
- Confirmar que los nombres completos estén escritos de forma consistente.
- Revisar ortografía y datos sensibles antes de publicar.
- Probar búsqueda, filtros, tarjetas y detalles en computadora y celular.
- Publicar el sitio en una URL estable con acceso público.
- Probar enlaces directos a `/recurso/:id` después del despliegue.
- Entregar el enlace por medio de la líder antes del **lunes 10 de agosto a las 12:00 p. m.**
- No realizar cambios después del cierre si la organización así lo indica.
