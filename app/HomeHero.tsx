/**
 * Hero component - combines static server-rendered content with interactive search.
 * The static content renders instantly (improving LCP), while search loads interactively.
 */
import { HomeHeroStatic } from "./HomeHeroStatic";
import { HomeHeroSearch } from "./HomeHeroSearch";

export function HomeHero() {
  return (
    <>
      <HomeHeroStatic />
      <HomeHeroSearch />
    </>
  );
}
