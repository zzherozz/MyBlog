import React from 'react';
type FormPanelProps = {
  name: String;
};
const Father: React.FC<FormPanelProps> = ({ name }) => {
  return <div>{name}</div>;
};

export default Father;
