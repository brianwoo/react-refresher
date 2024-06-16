import { createContext, useCallback, useContext, useState } from "react";

type SessionInfoType = {
  clientId: string | undefined;
  setClientId: (clientId: string) => void;
  userId: string | undefined;
  setUserId: (userId: string) => void;
  userName: string | undefined;
  setUserName: (userName: string) => void;
  languageRegion: string | undefined;
  setLanguageRegion: (languageRegion: string) => void;
  connectionToken: string | undefined;
  setConnectionToken: (connectionToken: string) => void;
  sessionToken: string | undefined;
  setSessionToken: (sessionToken: string) => void;
  isModuleRunning: boolean | undefined;
  setIsModuleRunning: (isModuleRunning: boolean) => void;
  conversations: string | undefined;
  addDialogToConversations: (dialog: string | undefined) => void;
};

const SessionInfoContext = createContext<SessionInfoType | undefined>(undefined);

export const SessionInfoContextProvider = ({ children }: {
  children: React.ReactNode;
}) => {
  const [clientId, setClientId] = useState<string | undefined>();
  const [userId, setUserId] = useState<string | undefined>();
  const [userName, setUserName] = useState<string | undefined>();
  const [languageRegion, setLanguageRegion] = useState<string | undefined>("en-CA");
  const [connectionToken, setConnectionToken] = useState<string | undefined>();
  const [sessionToken, setSessionToken] = useState<string | undefined>();
  const [isModuleRunning, setIsModuleRunning] = useState<boolean | undefined>();
  const [conversations, setConversations] = useState<string | undefined>();

  const addDialogToConversations = useCallback((dialog: string | undefined) => {

    setConversations((prevConversations) =>
      prevConversations === undefined ?
        dialog ?? "" :
        prevConversations + '\n\n' + (dialog ?? "")
    );

  }, [setConversations]);


  const sessionInfo: SessionInfoType = {
    clientId, setClientId,
    userId, setUserId,
    userName, setUserName,
    languageRegion, setLanguageRegion,
    connectionToken, setConnectionToken,
    sessionToken, setSessionToken,
    isModuleRunning, setIsModuleRunning,
    conversations,
    addDialogToConversations,
  };

  return (
    <SessionInfoContext.Provider value={sessionInfo}>
      {children}
    </SessionInfoContext.Provider>
  );
};


export const useSessionInfoContext = () => {
  const context = useContext(SessionInfoContext);
  if (context === undefined) {
    throw new Error("useSessionInfoContext must be used within a SessionInfoContextProvider");
  }
  return context;
}
