import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AnimatedBackground } from "./components/AnimatedBackground";
import { ScrollGradient } from "./components/ScrollGradient";
import { AnimatePresence } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import HomePage from "@/pages/HomePage";
import AboutPage from "@/pages/AboutPage";
import RulesPage from "@/pages/RulesPage";
import FinancePage from "@/pages/FinancePage";
import ContactPage from "@/pages/ContactPage";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1 overflow-hidden">
        <AnimatePresence mode="wait">
          <Switch>
            <Route path="/" component={() => (
              <PageTransition>
                <HomePage />
              </PageTransition>
            )} />
            <Route path="/about" component={() => (
              <PageTransition>
                <AboutPage />
              </PageTransition>
            )} />
            <Route path="/rules" component={() => (
              <PageTransition>
                <RulesPage />
              </PageTransition>
            )} />
            <Route path="/finance" component={() => (
              <PageTransition>
                <FinancePage />
              </PageTransition>
            )} />
            <Route path="/contact" component={() => (
              <PageTransition>
                <ContactPage />
              </PageTransition>
            )} />
            <Route component={() => (
              <PageTransition>
                <NotFound />
              </PageTransition>
            )} />
          </Switch>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
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
