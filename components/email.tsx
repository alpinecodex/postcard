import * as React from "react";

interface EmailTemplateProps {
  message: string;
  image: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  message,
  image,
}) => (
  <div>
    <img src={image} width={100} height={100} alt="Postcard image." />
    <p>{message}</p>
  </div>
);
