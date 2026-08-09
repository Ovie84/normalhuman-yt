import { useTheme } from "next-themes";
// import React from "react";
import { useRegisterActions, type Action } from "kbar";

const useThemeSwitching = () => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  // const themeActions: Action[] = []
  const themeAction = [
    {
      id: "toggleTheme",
      name: "Toggle Theme",
      shortcut: ["t", "t"],
      section: "Theme",
      perform: toggleTheme,
    },
    {
      id: "setLightTheme",
      name: "Set Light Theme",
      section: "Theme",
      perform: () => setTheme("light"),
    },
    {
      id: "setDarkTheme",
      name: "Set Dark Theme",
      section: "Theme",
      perform: () => setTheme("dark"),
    },
  ];

  // return <div>useThemeSwitching</div>;
  useRegisterActions(themeAction, [theme]);
};

export default useThemeSwitching;
