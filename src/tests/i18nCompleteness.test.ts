// PATH: src/tests/i18nCompleteness.test.ts | VERSION: 2.9.0 | REQ-ID: TEST-I18N-01
import { pl } from '../i18n/locales/pl';
import { en } from '../i18n/locales/en';
import { de } from '../i18n/locales/de';
import { es } from '../i18n/locales/es';

function assertDeepKeysMatch(source: Record<string, any>, target: Record<string, any>, lang: string, prefix = '') {
  for (const key of Object.keys(source)) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    if (target[key] === undefined) {
      throw new Error(`Błąd i18n: Brakuje klucza "${fullKey}" w języku "${lang}"! Polski plik wymusza jego obecność.`);
    }
    if (typeof source[key] === 'object' && source[key] !== null) {
      assertDeepKeysMatch(source[key], target[key], lang, fullKey);
    }
  }
}

console.log('🧪 Sprawdzanie kompletności słowników i18n względem polskiego wzorca...');
assertDeepKeysMatch(pl, en, 'en');
assertDeepKeysMatch(pl, de, 'de');
assertDeepKeysMatch(pl, es, 'es');
console.log('✅ Wszystkie języki (EN, DE, ES) pokrywają w 100% polski słownik wzorcowy (PL)!');
