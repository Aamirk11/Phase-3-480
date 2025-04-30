import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface AuthContextType {
  loggedIn: boolean;
  role: string | null;
  userData: any;
  isAuthenticated: boolean;
  login: (role: string, userData: any) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [role, setRole] = useState<string | null>(null);
  const [userData, setUserData] = useState<any>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!role);


  useEffect(() => {
    const storedLoggedIn = localStorage.getItem("loggedIn") === "true";
    const storedRole = localStorage.getItem("role");
    const storedUserData = localStorage.getItem("userData");

    setLoggedIn(storedLoggedIn);
    setRole(storedRole);
    setUserData(storedUserData ? JSON.parse(storedUserData) : null);
  }, []);

  const login = (newRole: string, newUserData: any) => {
    localStorage.setItem("loggedIn", "true");
    localStorage.setItem("role", newRole);
    localStorage.setItem("userData", JSON.stringify(newUserData));
    setLoggedIn(true);
    setRole(newRole);
    setUserData(newUserData);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("role");
    localStorage.removeItem("userData");
    setLoggedIn(false);
    setRole(null);
    setUserData(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ loggedIn, role, isAuthenticated, userData, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
