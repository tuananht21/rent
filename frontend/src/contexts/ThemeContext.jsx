// ThemeContext.js
import { createContext, useState, useEffect } from 'react';

// Tạo context cho theme
const ThemeContext = createContext();


// ThemeProvider component để quản lý và cung cấp theme cho toàn bộ app
const ThemeProvider = ({ children }) => {
  // Lấy giá trị theme từ localStorage nếu có, nếu không thì mặc định là light
  const storedTheme = localStorage.getItem('theme') || 'light';
  const [theme, setTheme] = useState(storedTheme);

  // Khi theme thay đổi, cập nhật vào localStorage và thay đổi className trên body
  useEffect(() => {
    document.querySelector('html').setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Hàm chuyển đổi theme
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeContext, ThemeProvider };