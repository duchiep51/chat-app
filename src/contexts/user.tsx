import { createContext, ReactElement, useState } from "react";

const RecipientsContext = createContext<any[]>([]);

export const RecipientsProvider = ({
  children,
}: {
  children: ReactElement;
}) => {
  const [recipients, setRecipients] = useState();

  return (
    <RecipientsContext.Provider value={[recipients, setRecipients]}>
      {children}
    </RecipientsContext.Provider>
  );
};

export default RecipientsContext;
