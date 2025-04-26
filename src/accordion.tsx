import React, { useState, useEffect } from 'react';
import { useQueryParams, StringParam } from 'use-query-params';

const AccordionPage: React.FC = () => {
  // Den Query-Parameter 'accordion' auslesen
  const [query, setQuery] = useQueryParams({ accordion: StringParam });
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);

  // Beim Laden oder wenn sich der Query-Parameter ändert, wird das entsprechende Accordion geöffnet
  useEffect(() => {
    if (query.accordion) {
      setOpenAccordion(query.accordion);
    }
  }, [query]);

  const toggleAccordion = (name: string) => {
    // Falls das Accordion bereits offen ist, wird es wieder geschlossen und der Parameter gelöscht.
    if (openAccordion === name) {
      setOpenAccordion(null);
      setQuery({ accordion: undefined });
    } else {
      setOpenAccordion(name);
      setQuery({ accordion: name });
    }
  };

  return (
    <div>
      <h1>Accordion Page</h1>
      {['Accordion1', 'Accordion2', 'Accordion3'].map((name) => (
        <div key={name} style={{ marginBottom: '1rem' }}>
          <button onClick={() => toggleAccordion(name)}>{name}</button>
          {openAccordion === name && (
            <div style={{ border: '1px solid #ccc', padding: '1rem' }}>
              Inhalt für {name}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default AccordionPage;