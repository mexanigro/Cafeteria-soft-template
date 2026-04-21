import { useEffect, useMemo } from 'react';
import { siteConfig } from '@/src/config/site';
import { getLegalDocument, type LegalDocKind } from '@/src/config/legalContent';

const TITLES: Record<LegalDocKind, string> = {
  privacy: 'Privacy Policy',
  terms: 'Terms & Conditions',
  cancellation: 'Cancellation Policy',
  cookies: 'Cookie Policy',
};

export function LegalPage({
  kind,
  onBack,
}: {
  kind: LegalDocKind;
  onBack: () => void;
}) {
  const sections = useMemo(() => getLegalDocument(kind, siteConfig), [kind]);

  useEffect(() => {
    document.title = `${TITLES[kind]} · ${siteConfig.brand.displayName}`;
  }, [kind]);

  return (
    <article className="relative z-10 bg-cream pt-28 pb-24 md:pt-36 md:pb-32 px-6 md:px-10">
      <div className="max-w-3xl mx-auto">
        <button
          type="button"
          onClick={onBack}
          className="mb-10 text-xs tracking-[4px] uppercase text-stone hover:text-espresso transition-colors"
        >
          ← Back to site
        </button>

        <header className="mb-12 border-b border-espresso/10 pb-10">
          <p className="text-xs tracking-[6px] uppercase text-stone mb-4">Legal · {siteConfig.legal.legalName}</p>
          <h1 className="font-serif text-4xl md:text-5xl text-espresso leading-[1.15]">{TITLES[kind]}</h1>
          <p className="mt-4 text-sm text-stone/85 leading-relaxed">
            Document tailored to this deployment ({siteConfig.id}). Review with counsel before relying on it in
            regulated contexts.
          </p>
        </header>

        <div className="space-y-10">
          {sections.map((block, idx) => (
            <section key={idx} className="space-y-4">
              {block.title ? (
                <h2 className="text-lg font-semibold tracking-wide text-espresso">{block.title}</h2>
              ) : null}
              <div className="space-y-4 text-sm leading-relaxed text-stone/90">
                {block.paragraphs.map((p, j) => (
                  <p key={j}>{p}</p>
                ))}
              </div>
            </section>
          ))}
        </div>

        <div className="mt-16 rounded-2xl border border-espresso/10 bg-mocha/5 p-6 md:p-8">
          <p className="text-xs tracking-[4px] uppercase text-stone mb-3">Responsible party</p>
          <p className="text-sm text-espresso font-medium">{siteConfig.legal.legalName}</p>
          <p className="mt-2 text-sm text-stone/85">{siteConfig.legal.registeredAddress}</p>
          <p className="mt-4 text-sm text-stone/85">
            <span className="text-espresso">Email:</span>{' '}
            <a
              href={`mailto:${siteConfig.legal.contactEmail}`}
              className="underline decoration-caramel/40 underline-offset-4 hover:text-caramel"
            >
              {siteConfig.legal.contactEmail}
            </a>
            {' · '}
            <span className="text-espresso">Phone:</span>{' '}
            <a
              href={`tel:${siteConfig.location.phone.replace(/\s/g, '')}`}
              className="underline decoration-caramel/40 underline-offset-4 hover:text-caramel"
            >
              {siteConfig.location.phone}
            </a>
          </p>
        </div>
      </div>
    </article>
  );
}
