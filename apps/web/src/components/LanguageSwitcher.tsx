import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronDown, Check } from 'lucide-react';

type LocaleOption = {
  code: 'pt' | 'en';
  labelKey: string;
  flag: string;
};

const options: LocaleOption[] = [
  { code: 'pt', labelKey: 'language.portuguese', flag: '🇧🇷' },
  { code: 'en', labelKey: 'language.english', flag: '🇺🇸' },
];

export const LanguageSwitcher: React.FC = () => {
  const { i18n, t } = useTranslation('common');
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  const currentCode = (i18n.language?.slice(0, 2) as 'pt' | 'en') || 'pt';
  const current = options.find((o) => o.code === currentCode) ?? options[0];

  const handleChange = (locale: 'pt' | 'en') => {
    if (currentCode === locale) {
      setOpen(false);
      return;
    }
    void i18n.changeLanguage(locale);
    setOpen(false);
  };

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (!ref.current) return;
      if (e.target instanceof Node && ref.current.contains(e.target)) return;
      setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-2 rounded-full border border-border bg-gaming-light/60 px-3 py-1.5 text-xs font-medium text-foreground shadow-sm hover:bg-gaming-light/80 transition-colors"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className="text-base leading-none">{current.flag}</span>
        <span>{t(current.labelKey)}</span>
        <ChevronDown className="w-3 h-3 text-foreground/70" />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-44 rounded-xl border border-border bg-gaming-light/95 backdrop-blur-md shadow-xl z-50">
          <ul role="listbox" className="py-1">
            {options.map((opt) => {
              const selected = opt.code === currentCode;
              return (
                <li key={opt.code}>
                  <button
                    type="button"
                    onClick={() => handleChange(opt.code)}
                    className={`w-full flex items-center gap-2 px-3 py-1.5 text-xs text-left transition-colors ${
                      selected
                        ? 'bg-primary/10 text-primary'
                        : 'text-foreground hover:bg-gaming-light/70'
                    }`}
                    role="option"
                    aria-selected={selected}
                  >
                    <span className="text-base leading-none">{opt.flag}</span>
                    <span className="flex-1">{t(opt.labelKey)}</span>
                    {selected && <Check className="w-3 h-3 text-primary" />}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
