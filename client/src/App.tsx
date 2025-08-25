import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AnimatedBackground } from "./components/AnimatedBackground";
import { ScrollGradient } from "./components/ScrollGradient";
import { AnimatePresence } from "framer-motion";
import { NavigationProvider } from "@/contexts/NavigationContext";
import Navigation from "@/components/Navigation";
import PageTransition from "@/components/PageTransition";
import HomePage from "@/pages/HomePage";
import AboutPage from "@/pages/AboutPage";
import RulesPage from "@/pages/RulesPage";
import FinancePage from "@/pages/FinancePage";
import ContactPage from "@/pages/ContactPage";
import BoardPage from "@/pages/BoardPage";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <NavigationProvider>
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-1 relative overflow-hidden">
          <AnimatePresence mode="sync" initial={false}>
            <Switch>
              <Route path="/" component={() => (
                <PageTransition key="/">
                  <HomePage />
                </PageTransition>
              )} />
              <Route path="/about" component={() => (
                <PageTransition key="/about">
                  <AboutPage />
                </PageTransition>
              )} />
              <Route path="/rules" component={() => (
                <PageTransition key="/rules">
                  <RulesPage />
                </PageTransition>
              )} />
              <Route path="/finance" component={() => (
                <PageTransition key="/finance">
                  <FinancePage />
                </PageTransition>
              )} />
              <Route path="/contact" component={() => (
                <PageTransition key="/contact">
                  <ContactPage />
                </PageTransition>
              )} />
              <Route path="/board" component={() => (
                <PageTransition key="/board">
                  <BoardPage />
                </PageTransition>
              )} />
              <Route component={() => (
                <PageTransition key="404">
                  <NotFound />
                </PageTransition>
              )} />
            </Switch>
          </AnimatePresence>
        </main>
      </div>
    </NavigationProvider>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AnimatedBackground />
        <ScrollGradient />
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
