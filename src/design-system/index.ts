// @ailys/design-system , public API
//
// This is the single import surface for design system consumers.
// External code should import from "@/design-system" not from sub-paths
// directly. This makes the eventual extraction to a real package a
// mechanical refactor (just point the bundler at the new location).

export * from "./tokens";
export * from "./moods";

// Primitives are still in src/components/ui/. Phase B will move them
// here. For now we re-export the most commonly used ones so that new
// code can use the cleaner import path.
export { Button } from "@/components/ui/button";
export { Input } from "@/components/ui/input";
export { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
export { Badge } from "@/components/ui/badge";
export { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
export { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
export { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
