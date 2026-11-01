# Ficha de estilo: Kahwa Café

## Concepto
**"La devanture"**: la web es la fachada de Kahwa en la avenida Mont-Royal. Al entrar, cualquiera que haya pasado por delante tiene que reconocerla: madera pintada de azul ultramar, vitral con rombos ámbar, guirnalda de bombillas, dos rinocerontes dorados, la puerta llena de pegatinas y la pizarra azul con los sándwiches y sus precios.

Tono: sandwichería de barrio con orgullo ("légendaire"), callejera y cálida. Nada de lujo ni minimalismo frío.

## Lo que se vio en las fotos
| Elemento real | Cómo pasa a la web |
|---|---|
| Fachada de madera azul ultramar (`#233F8C`, sombra `#0F1A3D`) | Fondo principal con vetas verticales de tablones pintados |
| Vitral superior: paneles esmerilados y fila de rombos ámbar | Franja `Vitral` en lo alto de la portada y en el pie |
| Guirnalda de bombillas cálidas | `Guirnalda` que cuelga sobre la portada, la pizarra y la historia; las bombillas parpadean |
| Dos cabezas de rinoceronte doradas | Medallones con aro dorado (recortes reales de la foto de la fachada) |
| Letrero de vitrina "KAHWA CAFÉ" naranja con sombra blanca desplazada | Logotipo en Jost 900, naranja `#F0A445` y sombra blanca |
| "sandwicherie urbaine légendaire" escrito a mano | Patrick Hand en blanco |
| "Depuis 2010" en caligrafía blanca sobre el montante | Yellowtail |
| Puerta cubierta de pegatinas | Pegatinas troqueladas (borde blanco, giro, sombra) con frases del local |
| Pizarra azul con marco blanco: nombres en mayúsculas, precios, "* Prix avant taxes" | La carta entera es esa pizarra |
| Papel de cuadros azul y blanco, bandeja roja | Fondo de "Le pain" y el panel del pedido (bandeja roja con papel de cuadros) |
| Azulejo blanco tipo metro, lámparas de jaula | Fondo de la historia |
| Caballete "Découvrez nos sandwichs sur pain maison" + sello "Uniques et faits minute!" | Cinta en movimiento y sello redondo |

## Paleta (medida en las fotos con paleta.mjs, contraste comprobado)
| Nombre | Hex | Uso |
|---|---|---|
| bleu façade | `#233F8C` | Fondos principales |
| bleu nuit | `#0F1A3D` | Texto sobre claro, fondos profundos |
| bleu ardoise | `#2546B5` | Pizarra de la carta |
| bleu carreau | `#0B3FC4` | Papel de cuadros |
| or rhino | `#E9B85C` (claro `#FAD883`, oscuro `#8A5216`) | Detalles, aros, estrellas |
| orange enseigne | `#F0A445` | Logotipo, botón principal, cinta |
| rouge plateau | `#CF2027` | Solo el pedido (bandeja, contador) |
| crème | `#F6F0E2` | Papel, servilleta, texto sobre azul |

Contrastes: crème sobre bleu façade 8,6:1 · orange sobre bleu façade 4,7:1 · or sobre bleu nuit 9,3:1 · blanco sobre ardoise 8,0:1.

## Tipografía
- **Jost** 800–900 en mayúsculas: rótulos, logotipo, nombres de la carta (geometría tipo Futura como el letrero de la vitrina).
- **Jost** 400–500: texto corrido.
- **Yellowtail**: "Depuis 2010" y acentos caligráficos.
- **Patrick Hand**: notas escritas a mano y pegatinas.

## Composición por sección
1. **Fachada (portada)**: vitral arriba, medallones de rinoceronte en las esquinas, tres paneles como la fachada real: vitrina (logotipo, lema y botones), puerta (foto real) y pizarra (4 sándwiches con precio).
2. **Cinta**: "Pain maison · Cuit à la commande · Sauce KAHWA · Agneau du Québec · Depuis 2010", naranja sobre azul noche.
3. **Le pain**: papel de cuadros a sangre, servilleta crema con el Panuzzo y sus tres ingredientes, foto en bandeja roja y vapor.
4. **Le menu**: la pizarra grande con marco blanco y bombillas; pestañas y botón "Ajouter" en premium.
5. **Depuis 2010 (historia)**: pared de azulejo metro; la guirnalda une los tres momentos.
6. **Au comptoir (galería)**: fotos con cinta adhesiva sobre azul noche, crédito escrito a mano.
7. **Avis**: 4,6 grande, temas como pegatinas de tamaño proporcional a las menciones, resúmenes.
8. **Nous trouver**: vinilo de horario sobre cristal oscuro, neón OUVERT/FERMÉ, mapa enmarcado, "cherchez les rhinocéros dorés".
9. **Pie**: vitral fino, créditos de fotos y aviso de demo.

## Movimiento
Energía de mostrador: las pegatinas se pegan de golpe (muelle rápido), las bombillas parpadean, el neón se enciende con un parpadeo, el vapor sube del pan y la cinta avanza. Todo respeta "reducir movimiento". Básica: estático. Estándar: apariciones al hacer scroll. Premium: todo lo anterior.

## Lo que no se repite en otras cafeterías
Fachada en tres paneles, vitral, medallones, pizarra como carta, bandeja roja como panel de pedido. Ver `~/.claude/skills/cafe/estilos/registro.md`.
