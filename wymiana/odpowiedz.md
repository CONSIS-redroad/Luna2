# Odpowiedź dla użytkownika — Sedno aplikacji: Wykres porównawczy (Algorytm vs Notatki usera) oraz oceny w kalendarzu
Wersja: **v3.3.0**
Plik szczegółowy: `/wymiana/raport.md`

Wdrożyłem kluczowe sedno aplikacji:

1. **Wykres dwuseriowy: Wyliczenia Algorytmu vs Rzeczywiste Notatki Użytkownika**:
   - Wykres pokazuje teraz równolegle dwie linie:
     * **Prognoza algorytmu LUNA**: linia predykcji na podstawie fazy Księżyca i pogody (np. `72%`).
     * **Twój zapisany sen**: seria punktów i linii odzwierciedlająca Twój rzeczywisty wpis (np. `65%`).
   - Użytkownik widzi od razu rozbieżność i korelację pomiędzy wyliczeniami natury a własnym samopoczuciem.

2. **Precyzyjny suwak oceny snu (0–100%)**:
   - W oknie zapisu snu dodano dokładną skalę procentową (suwak od 10% do 100%), gdzie można ustawić dokładną wartość, np. `65%`.
   - Formularz podpowiada jednocześnie, ile dla danej nocy przewidział algorytm LUNA.

3. **Wyraźne oznaczenie ocen i notatek w Kalendarzu**:
   - W komórkach kalendarza pojawia się plakietka z Twoją oceną: np. `★ 65%` oraz podświetlenie krawędzi.
   - Gdy wpis zawiera tekstową notatkę o snach, wyświetla się dyskretna ikona notatnika.
   - Kliknięcie dnia otwiera ocenę z podglądem wyliczeń algorytmu dla danej daty.
