import React from 'react';
import { useHistory } from 'react-router-dom';

const CardPage: React.FC = () => {
  const history = useHistory();

  const handleClick = (accordionName: string) => {
    // Navigiert zur AccordionPage mit dem entsprechenden Query-Parameter
    history.push(`/accordion?accordion=${accordionName}`);
  };

  return (
    <div>
      <h1>Card Page</h1>
      {['Accordion1', 'Accordion2', 'Accordion3'].map((name) => (
        <div 
          key={name} 
          onClick={() => handleClick(name)} 
          style={{ cursor: 'pointer', marginBottom: '1rem', padding: '1rem', border: '1px solid #ddd' }}
        >
          {name}
        </div>
      ))}
    </div>
  );
};

export default CardPage;