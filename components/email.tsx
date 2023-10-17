import * as React from "react";
import Image from "next/image";

interface EmailTemplateProps {
  message: string;
  image: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  message,
  image,
}) => (
  <div>
    <Image src={image} width={100} height={100} alt="Postcard image." />
    <p>{message}</p>
  </div>
);
