"use client";

import {
  KBarAnimator,
  KBarPortal,
  KBarPositioner,
  KBarProvider,
  KBarSearch,
} from "kbar";

export default function KBar({ children }: { children: React.ReactNode }) {
  return (
    <KBarProvider>
      <ActualComponent>{children}</ActualComponent>
    </KBarProvider>
  );
}

const ActualComponent = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <KBarPortal>
        <KBarPositioner className="insert-0 scrollbar-hide fixed z-999 bg-black/40 p-0! backdrop-blur-sm dark:bg-black/80">
          <KBarAnimator className="text-foreground relative mt-64! w-full max-w-150 -translate-y-12! overflow-hidden rounded-lg border bg-white shadow-lg dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200">
            <div className="bg-white dark:bg-gray-800">
              <KBarSearch />
            </div>
          </KBarAnimator>
        </KBarPositioner>
      </KBarPortal>
      {children}
    </>
  );
};
