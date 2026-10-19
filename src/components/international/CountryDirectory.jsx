'use client';

import { useState, useId } from 'react';
import Link from 'next/link';

export function CountryDirectory({ countries }) {
  const [query, setQuery] = useState('');
  const inputId = useId();
  const search = query.trim().toLocaleLowerCase('en');
  const visible = countries.filter((country) => `${country.name} ${country.code}`.toLocaleLowerCase('en').includes(search));
  return (
    <div className="section-content sec-international__directory">
      <label htmlFor={inputId} className="alg-text sec-international__search-label">Find your country or region</label>
      <input id={inputId} type="search" placeholder="Search a country, e.g. Pakistan or PK" value={query} onChange={(event) => setQuery(event.target.value)} className="sec-international__search" />
      <p className="alg-text sec-international__result-count" role="status">{visible.length} countries and territories</p>
      <ul className="section-content sec-international__country-list">
        {visible.map((country) => (
          <li key={country.code}>
            <Link href={country.market ? `/international/${country.market}` : `/contact?country=${encodeURIComponent(country.name)}`} prefetch={false}>
              <span className="sec-international__country-code" aria-hidden="true">{country.code}</span>
              <span>{country.name}</span>
              <span aria-hidden="true">↗</span>
            </Link>
          </li>
        ))}
      </ul>
      {visible.length === 0 && <p className="alg-text">No matching country. <Link href="/contact">Tell us about your project.</Link></p>}
      <p className="alg-text sec-international__note">Country guides open where available. Other locations take you to our global enquiry form. Project availability, scope and any regional requirements are confirmed before work begins.</p>
    </div>
  );
}
