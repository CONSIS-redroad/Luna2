# Luna — notatki i sen (v3.3.0)

Aplikacja wspomagająca obserwację nocnego nieba i analizę jakości snu w korelacji z fazami Księżyca oraz pogodą. Zbudowana w architekturze **Local-First** (100% prywatności), z monumentalną astrofotografią w bliskiej odległości (145vmin), rotacją 3D przestrzeni, **wykresem porównawczym (Algorytm LUNA vs Rzeczywisty sen użytkownika)** oraz **wyraźnym oznaczeniem ocen i notatek w kalendarzu**.

---

## ✨ Kluczowe udoskonalenia (Wersja 3.3.0) — Sedno aplikacji

### 1. Wykres dwuseriowy: Prognoza Algorytmu vs Rzeczywisty Zapis Użytkownika
- **Dwie skorelowane serie na jednym wykresie**:
  - **Linia ciągła platynowa**: Prognoza algorytmu LUNA (np. `72%`) wyliczona na podstawie fazy Księżyca, temperatury i zachmurzenia nocnego z Open-Meteo.
  - **Linia punktowa szmaragdowa**: Rzeczywisty sen zanotowany przez użytkownika (np. `65%`).
- **Analiza korelacji**: użytkownik widzi czarno na białym, jak prognozy astronomiczno-meteorologiczne pokrywają się z jego subiektywnym wypoczynkiem.

### 2. Precyzyjna skala oceny snu (0–100%) w modalu zapisu
- Oprócz tradycyjnych 5 gwiazdek użytkownik ma do dyspozycji płynny suwak procentowy (`10% - 100%`), pozwalający precyzyjnie wpisać np. `65%` lub `84%`.
- Modal wyświetla bezpośrednią podpowiedź: *"Algorytm wyliczył dla tej nocy: X%"*.

### 3. Wyraźne oznaczenie ocen i notatek w Kalendarzu
- Komórka kalendarza wyświetla plakietkę z oceną użytkownika: np. `★ 65%` w wyróżnionej ramce.
- Jeśli wpis zawiera notatkę tekstową, komórka oznacza to ikoną notatnika.
- Kliknięcie w dowolny dzień kalendarza natychmiast otwiera panel oceny/edycji tego dnia.

### 4. Dyskretne kontrolki paneli na hover & Przeciąganie osi czasu palcem
- Strzałki kolejności i kontrolki zwijania paneli pojawiają się dopiero po najechaniu kursorem (`hover`).
- Wykres obsługuje gest Touch Drag (przeciąganie palcem na telefonie) obejmujący 7 dni wstecz i 14 dni w przód.

---

## 🔒 Prywatność i dane (Local-First)
- 100% lokalnego zapisu w pamięci przeglądarki (`localStorage`).
- Zero telemetrii i analityki.
- Eksport kopii zapasowej do formatu JSON.

---

## 🚀 Uruchomienie i testy
- `npm install` — instalacja zależności
- `npm run dev` — start serwera deweloperskiego na porcie 3000
- `npm run build` — kompilacja produkcyjna Vite
- `npm run lint` — weryfikacja typów TypeScript (`tsc --noEmit`)
- `npm run test` — automatyczne testy dat, migracji oraz 100% pokrycia słowników i18n
