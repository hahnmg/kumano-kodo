Übertrage die Kumano-Kodo-Startseite (v3) aus diesem Ordner per Paper MCP in die aktuell in Paper geöffnete, leere Datei.

Material in diesem Ordner:
- sections/*.html: statisches HTML, alle Styles inline, eine Datei pro Abschnitt (01–11, in dieser Reihenfolge)
- img/: die Bilder, auf die die Abschnitte mit img/… verweisen
- referenz-v3.jpg: Screenshot des Originals als Sollbild (1440 px breit, halbe Größe)
- original/: der Claude-Design-Export (nur als Referenz, nicht direkt importieren)

Vorgehen:
1. Mit get_basic_info prüfen, dass die richtige (leere) Datei offen ist, und get_guide lesen.
2. Ein Artboard „Startseite – Desktop“ mit 1440 px Breite anlegen.
3. Die Abschnitte nacheinander mit write_html einfügen, jeweils als eigene, sinnvoll benannte Ebene (Header, Hero, Intro, Zitat, Kennzahlen & Tagesverlauf, Etappen, Karte, Bildstrecke, FAQ, Newsletter, Footer).
4. Bilder aus img/ so einbinden, wie Paper es verlangt (laut get_guide, z. B. als data-URI oder lokale URL).
5. Nach jedem Abschnitt get_screenshot machen und mit referenz-v3.jpg vergleichen; Abweichungen mit update_styles korrigieren. Bekannte Stellen: Die Kennzahlen unten im Hero (68 km, 4 days …) werden abgeschnitten, und im Tagesverlauf sitzen die Routennamen etwas zu tief.
6. Schriften: Fraunces (Headlines) und Inter (Fließtext).
7. Am Ende finish_working_on_nodes aufrufen und kurz melden, was übertragen wurde und was noch abweicht.
